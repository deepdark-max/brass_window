import { Application, SystemInfo, Values } from "../mod.ts";
import { mat4, vec3, type Vec3 } from "wgpu-matrix";

const SHADER_CODE = `
struct Uniforms { mvp: mat4x4<f32>, };
@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VOut {
  @builtin(position) position: vec4f,
  @location(0) color: vec3f,
};

@vertex
fn vertex_main(
  @location(0) pos: vec3f,
  @location(1) col: vec3f,
) -> VOut {
  var o: VOut;
  o.position = uniforms.mvp * vec4f(pos, 1.0);
  o.color = col;
  return o;
}

@fragment
fn fragment_main(i: VOut) -> @location(0) vec4f {
  return vec4f(i.color, 1.0);
}
`;

class FlyCamera {
  position = vec3.create(0, 2, 5);
  yaw = Math.PI;
  pitch = -0.3;
  speed = 5;
  sensitivity = 0.003;
  fov = Math.PI / 3;
  near = 0.1;
  far = 500;

  moveDamping = 0.92;
  viewDamping = 0.88;
  velocity = vec3.create(0, 0, 0);
  targetYaw = this.yaw;
  targetPitch = this.pitch;

  forward(): Vec3 {
    const cp = Math.cos(this.pitch);
    return vec3.create(
      Math.sin(this.yaw) * cp,
      Math.sin(this.pitch),
      Math.cos(this.yaw) * cp,
    );
  }

  right(): Vec3 {
    return vec3.cross(this.forward(), vec3.create(0, 1, 0));
  }

  viewMatrix() {
    const dir = this.forward();
    return mat4.lookAt(this.position, vec3.add(this.position, dir), vec3.create(0, 1, 0));
  }

  projectionMatrix(aspect: number) {
    return mat4.perspective(this.fov, aspect, this.near, this.far);
  }

  update(dt: number, pressed: Set<number>, dx: number, dy: number) {
    this.targetYaw -= dx * this.sensitivity;
    this.targetPitch = Math.max(
      -Math.PI / 2.1,
      Math.min(Math.PI / 2.1, this.targetPitch - dy * this.sensitivity),
    );

    const viewSmooth = 1 - Math.pow(1 - this.viewDamping, dt * 60);
    this.yaw += (this.targetYaw - this.yaw) * viewSmooth;
    this.pitch += (this.targetPitch - this.pitch) * viewSmooth;

    const fwd = this.forward();
    const rgt = this.right();
    const accel = this.speed * 10;
    const move = vec3.create(0, 0, 0);
    if (pressed.has(Values.VirtualKeys.VK_W)) vec3.add(move, fwd, move);
    if (pressed.has(Values.VirtualKeys.VK_S)) vec3.sub(move, fwd, move);
    if (pressed.has(Values.VirtualKeys.VK_A)) vec3.sub(move, rgt, move);
    if (pressed.has(Values.VirtualKeys.VK_D)) vec3.add(move, rgt, move);
    if (pressed.has(Values.VirtualKeys.VK_SPACE)) vec3.add(move, vec3.create(0, 1, 0), move);
    if (pressed.has(Values.VirtualKeys.VK_SHIFT)) vec3.sub(move, vec3.create(0, 1, 0), move);

    if (vec3.length(move) > 0) {
      vec3.normalize(move, move);
      vec3.scale(move, accel * dt, move);
      vec3.add(this.velocity, move, this.velocity);
    }

    const damping = Math.pow(this.moveDamping, dt * 60);
    vec3.scale(this.velocity, damping, this.velocity);

    const maxSpeed = this.speed;
    const spd = vec3.length(this.velocity);
    if (spd > maxSpeed) {
      vec3.scale(this.velocity, maxSpeed / spd, this.velocity);
    }

    vec3.add(this.position, vec3.scale(this.velocity, dt), this.position);
  }
}

interface Geo {
  buf: GPUBuffer;
  idx?: GPUBuffer;
  count: number;
}

function makeCube(device: GPUDevice): Geo {
  const verts = new Float32Array([
    -1, -1, -1,  1, 0, 0,
     1, -1, -1,  0, 1, 0,
     1,  1, -1,  0, 0, 1,
    -1,  1, -1,  1, 1, 0,
    -1, -1,  1,  1, 0, 1,
     1, -1,  1,  0, 1, 1,
     1,  1,  1,  1, 1, 1,
    -1,  1,  1,  0.5, 0, 0.5,
  ]);
  const indices = new Uint16Array([
    0,1,2, 0,2,3, 1,5,6, 1,6,2, 5,4,7, 5,7,6,
    4,0,3, 4,3,7, 3,2,6, 3,6,7, 4,5,1, 4,1,0,
  ]);
  const buf = device.createBuffer({ size: verts.byteLength, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(buf, 0, verts);
  const idx = device.createBuffer({ size: indices.byteLength, usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(idx, 0, indices);
  return { buf, idx, count: indices.length };
}

function makeGrid(device: GPUDevice, size: number, div: number, col: [number, number, number] = [0.3, 0.35, 0.3]): Geo {
  const half = size / 2;
  const step = size / div;
  const v: number[] = [];
  for (let i = 0; i <= div; i++) {
    const p = -half + i * step;
    v.push(p, 0, -half, ...col, p, 0, half, ...col);
    v.push(-half, 0, p, ...col, half, 0, p, ...col);
  }
  const buf = device.createBuffer({ size: v.length * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });
  device.queue.writeBuffer(buf, 0, new Float32Array(v));
  return { buf, count: v.length / 6 };
}

async function main() {
  const app = new Application();
  const win = app.createWindow({
    title: "WebGPU FlyCamera",
    id: "main",
    width: 1280,
    height: 720,
  });

  win.setFullscreen(true).setIME(false);
  const screen = SystemInfo.screen.resolution();
  let width = screen.width;
  let height = screen.height;

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) { console.error("WebGPU not available"); return; }
  const device = await adapter.requestDevice();
  const format = navigator.gpu.getPreferredCanvasFormat();

  const surface = new Deno.UnsafeWindowSurface({
    system: "win32",
    windowHandle: win.windowHandle,
    displayHandle: win.displayHandle,
    width,
    height,
  });
  const context: GPUCanvasContext = (surface as any).context ??
    ((surface as any).getContext?.("webgpu") ?? (() => { throw new Error("cannot get GPUCanvasContext"); })());
  context.configure({ device, format, alphaMode: "opaque" });
  surface.resize(width, height);

  const cube = makeCube(device);
  const grid = makeGrid(device, 40, 40);

  let msaaTex = device.createTexture({
    size: [width, height],
    format,
    sampleCount: 4,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });
  let depthTex = device.createTexture({
    size: [width, height],
    format: "depth24plus",
    sampleCount: 4,
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  const uniBuf = device.createBuffer({
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const bgl = device.createBindGroupLayout({
    entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: "uniform" } }],
  });
  const bg = device.createBindGroup({
    layout: bgl,
    entries: [{ binding: 0, resource: { buffer: uniBuf } }],
  });
  const pl = device.createPipelineLayout({ bindGroupLayouts: [bgl] });
  const shader = device.createShaderModule({ code: SHADER_CODE });

  const vtxLayout: GPUVertexBufferLayout = {
    arrayStride: 24,
    attributes: [
      { shaderLocation: 0, offset: 0, format: "float32x3" },
      { shaderLocation: 1, offset: 12, format: "float32x3" },
    ],
  };

  const SAMPLE_COUNT = 4;

  function mkPipe(topology: GPUPrimitiveTopology, cullMode?: "back" | "front" | "none"): GPURenderPipeline {
    return device.createRenderPipeline({
      layout: pl,
      vertex: { module: shader, entryPoint: "vertex_main", buffers: [vtxLayout] },
      fragment: { module: shader, entryPoint: "fragment_main", targets: [{ format }] },
      primitive: { topology, cullMode },
      depthStencil: { format: "depth24plus", depthWriteEnabled: true, depthCompare: "less" },
      multisample: { count: SAMPLE_COUNT },
    });
  }

  const triPipe = mkPipe("triangle-list", "front");
  const linePipe = mkPipe("line-list");

  const camera = new FlyCamera();

  const pressed = new Set<number>();
  let mouseDX = 0;
  let mouseDY = 0;
  let wheelDelta = 0;

  win.addEventListener("keydown", (e) => {
    pressed.add(e.code);
    if (e.code === Values.VirtualKeys.VK_ESCAPE) {
      Deno.exit();
    }
  });
  win.addEventListener("keyup", (e) => pressed.delete(e.code));

  win.addEventListener("click", (e) => {
    if (e.button === 0 && !win.state.isLocked) {
      win.setLocked(true);
    }
  });

  win.addEventListener("mouselock", (e) => {
    mouseDX += e.deltaX;
    mouseDY += e.deltaY;
  });

  win.addEventListener("mousewheel", (e) => {
    wheelDelta += e.delta;
  });

  win.addEventListener("resize", (e) => {
    width = e.width;
    height = e.height;
    msaaTex.destroy();
    depthTex.destroy();
    msaaTex = device.createTexture({ size: [width, height], format, sampleCount: SAMPLE_COUNT, usage: GPUTextureUsage.RENDER_ATTACHMENT });
    depthTex = device.createTexture({ size: [width, height], format: "depth24plus", sampleCount: SAMPLE_COUNT, usage: GPUTextureUsage.RENDER_ATTACHMENT });
    context.configure({ device, format, alphaMode: "opaque" });
  });


  const model = mat4.create();

  const extras: { pos: Vec3 }[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    extras.push({ pos: vec3.create(Math.cos(a) * 4, 0.5, Math.sin(a) * 4) });
  }

  win.setLocked(true);

  console.log(`
╔══════════════════════════════════════════╗
║  FlyCamera                       ║
║  WASD / Space / Shift  ─  move          ║
║  Mouse  ─  look                         ║
║  Scroll ─  speed                        ║
║  ESC    ─  exit Application             ║
╚══════════════════════════════════════════╝
  `);

  let last = performance.now();
  const tmpVp = mat4.create();
  const mvp = mat4.create();

  function frame() {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;

    if (wheelDelta !== 0) {
      camera.speed = Math.max(1, camera.speed + wheelDelta / 120 * 2);
      wheelDelta = 0;
    }
    camera.update(dt, pressed, mouseDX, mouseDY);
    mouseDX = 0;
    mouseDY = 0;

    const aspect = width / height;
    const view = camera.viewMatrix();
    const proj = camera.projectionMatrix(aspect);
    const tex = context.getCurrentTexture().createView();
    const enc = device.createCommandEncoder();
    const pass = enc.beginRenderPass({
      colorAttachments: [{
        view: msaaTex.createView(),
        resolveTarget: tex,
        loadOp: "clear",
        storeOp: "discard",
        clearValue: { r: 0.08, g: 0.08, b: 0.12, a: 1 },
      }],
      depthStencilAttachment: { view: depthTex.createView(), depthLoadOp: "clear", depthStoreOp: "store", depthClearValue: 1 },
    });

    function draw(g: Geo, pipe: GPURenderPipeline, m: Float32Array) {
      device.queue.writeBuffer(uniBuf, 0, new Float32Array(m));
      pass.setPipeline(pipe);
      pass.setVertexBuffer(0, g.buf);
      pass.setBindGroup(0, bg);
      g.idx ? (pass.setIndexBuffer(g.idx, "uint16"), pass.drawIndexed(g.count)) : pass.draw(g.count);
    }

    mat4.multiply(proj, view, mvp);
    draw(grid, linePipe, mvp);

    mat4.identity(model);
    mat4.multiply(proj, view, tmpVp);
    mat4.multiply(tmpVp, model, mvp);
    draw(cube, triPipe, mvp);

    for (let i = 0; i < extras.length; i++) {
      mat4.identity(model);
      mat4.translate(model, extras[i].pos, model);
      mat4.scale(model, vec3.create(0.4, 0.4, 0.4), model);
      mat4.multiply(proj, view, tmpVp);
      mat4.multiply(tmpVp, model, mvp);
      draw(cube, triPipe, mvp);
    }

    pass.end();
    device.queue.submit([enc.finish()]);
    surface.present();
    setTimeout(frame);
  }

  frame();
}

main();
