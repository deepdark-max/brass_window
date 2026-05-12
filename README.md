<div align="center">

# 🪟 @brass/window

**Native Windows Window Creation, Configuration, and Event Listening**  
**原生 Windows 窗口创建、配置与事件监听**

[![JSR](https://jsr.io/badges/@brass/window)](https://jsr.io/@brass/window)
[![JSR Score](https://jsr.io/badges/@brass/window/score)](https://jsr.io/@brass/window)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows-blue)
![Deno](https://img.shields.io/badge/Deno-^2.0-black?logo=deno)

A **Win32 window management library** built on **Deno FFI**, providing native window creation, state management, and comprehensive event handling — mouse, keyboard, IME, and more. Ships with a bundled C DLL (no external dependencies).

基于 **Deno FFI** 的 Win32 窗口管理库，提供原生窗口创建、状态管理及完整事件处理（鼠标、键盘、输入法等）。内置 C DLL，无需外部依赖。

</div>

---

## 📦 Installation / 安装

```bash
# JSR
deno add jsr:@brass/window

# or import directly
# 或直接导入
import { Application } from "jsr:@brass/window"
```

> **⚠️ Windows Only / 仅限 Windows** — This library uses Win32 FFI and only works on Windows.
> 本库基于 Win32 FFI，仅支持 Windows 平台。

---

## 🚀 Quick Start / 快速开始

```typescript
import { Application, SystemInfo, Values } from "@brass/window";

// Create application / 创建应用
const app = new Application({
  iconPath: "./icon.ico",
  iconSmPath: "./icon.ico",
});

// Create window / 创建窗口
const win = app.createWindow({
  title: "Hello",
  id: "main",
  width: 800,
  height: 600,
});

// Listen to events / 监听事件
win.addEventListener("resize", ({ width, height }) => {
  console.log(`resized: ${width}x${height}`);
});

win.addEventListener("keydown", ({ code, char, ctrlKey }) => {
  if (ctrlKey && code === Values.VirtualKeys.VK_S) {
    console.log("Ctrl+S pressed");
  }
});

// Chain setters / 链式调用
win.setTitle("My App").setCenter().setAlwaysOnTop(true);
```

---

## ✨ Features / 特性

<details open>
<summary><b>English</b></summary>

- 🪟 **Native Window Creation** — Create multiple windows with custom titles, sizes, positions
- 🎛️ **Full State Control** — Maximize, minimize, fullscreen, borderless, resize, always-on-top, visibility, mouse lock, IME, cursor — all with optional toggle
- 🖱️ **Mouse Events** — move, click (all 4 buttons), double-click, wheel, lock (relative mode for games)
- ⌨️ **Keyboard Events** — keydown, keyup, keypress with translated characters and modifier states (Ctrl/Shift/Alt)
- ✍️ **IME Support** — compositionstart, compositionupdate, compositionend for CJK input
- 📊 **SystemInfo** — Screen, OS, hardware, input, UI metrics queries
- 📦 **Bundled DLL** — No external native dependencies; everything ships in one package
- 🔗 **Method Chaining** — All setters return `this` for fluent API
- 🎯 **TypeScript** — Fully typed with strict generics

</details>

<details>
<summary><b>中文</b></summary>

- 🪟 **原生窗口创建** — 支持多窗口，自定义标题、尺寸、位置
- 🎛️ **完整状态控制** — 最大化、最小化、全屏、无边框、可调大小、置顶、显隐、鼠标锁定、输入法、光标 — 全部支持可选的切换模式
- 🖱️ **鼠标事件** — 移动、点击（全部 4 键）、双击、滚轮、锁定（游戏相对模式）
- ⌨️ **键盘事件** — keydown、keyup、keypress，含翻译字符和修饰键状态（Ctrl/Shift/Alt）
- ✍️ **输入法支持** — compositionstart、compositionupdate、compositionend，支持中日韩输入
- 📊 **SystemInfo** — 屏幕、操作系统、硬件、输入设备、UI 指标查询
- 📦 **内置 DLL** — 无外部原生依赖，一个包全部包含
- 🔗 **链式调用** — 所有 setter 返回 `this`，支持流畅 API
- 🎯 **TypeScript** — 严格泛型全类型支持

</details>

---

## 📖 API Reference / API 参考

### `Application`

| Method | Description / 说明 |
|--------|-------------------|
| `new Application(options?)` | Create app instance with optional icon paths / 创建应用实例 |
| `createWindow(options)` | Create a new window / 创建新窗口 |
| `getWindowById(id)` | Get window by ID / 按 ID 获取窗口 |
| `getAllWindows()` | Get all created windows / 获取所有创建的窗口 |

```typescript
const app = new Application({ iconPath: "./icon.ico", iconSmPath: "./icon.ico" });
const win = app.createWindow({ title: "My Window", id: "main", width: 800, height: 600 });
```

---

### `Window` Methods (all return `this` for chaining)

| Method | Toggle | Description |
|--------|--------|-------------|
| `setTitle(title)` | — | Set window title / 设置标题 |
| `setSize(w, h)` | — | Set window size / 设置大小 |
| `setPosition(x, y)` | — | Set window position / 设置位置 |
| `setVisible(value?)` | ✅ | Show/hide window / 显示/隐藏 |
| `setMaximized(value?)` | ✅ | Maximize/restore / 最大化/恢复 |
| `setMinimized(value?)` | ✅ | Minimize/restore / 最小化/恢复 |
| `setFullscreen(value?)` | ✅ | Toggle fullscreen / 全屏切换 |
| `setBorderless(value?)` | ✅ | Toggle borderless / 无边框切换 |
| `setResizeable(value?)` | ✅ | Toggle resizable / 可调大小切换 |
| `setAlwaysOnTop(value?)` | ✅ | Toggle always-on-top / 置顶切换 |
| `setLocked(value?)` | ✅ | Toggle mouse lock (pointer lock for games) / 鼠标锁定 |
| `setIME(value?)` | ✅ | Toggle IME input / 输入法开关 |
| `setCursor(value?)` | ✅ | Toggle cursor visibility / 光标显隐 |
| `setCenter(value?)` | ✅ | Center window / restore position / 居中/恢复 |

---

### Events / 事件

#### Mouse / 鼠标

```typescript
win.addEventListener("click", ({ x, y, button }) => {
  // button: 0=left, 1=right, 2=middle, 3=X1, 4=X2
  console.log(`click at (${x}, ${y}) button=${button}`);
});

win.addEventListener("mousemove", ({ x, y }) => { /* absolute position */ });
win.addEventListener("mouselock", ({ deltaX, deltaY }) => { /* relative delta */ });
win.addEventListener("mousewheel", ({ delta }) => { /* scroll delta */ });
win.addEventListener("dblclick", ({ x, y, button }) => { /* double click */ });
```

#### Keyboard / 键盘

```typescript
win.addEventListener("keydown", ({ code, char, ctrlKey, shiftKey, altKey }) => {
  // code: Virtual-Key Code (Values.VirtualKeys.VK_*)
  // char: translated character (e.g. "a", "enter", "F1", "space")
  console.log(`key=${code.toString(16)} char='${char}'`);
});

win.addEventListener("keyup", ({ code }) => { /* key released */ });

win.addEventListener("keypress", ({ char }) => {
  // char: actual input character (IME-compatible)
  console.log(`input: ${char}`);
});
```

#### IME (Input Method Editor) / 输入法

```typescript
win.addEventListener("compositionstart", () => {
  console.log("IME composition started");
});

win.addEventListener("compositionupdate", ({ data }) => {
  console.log(`composing: ${data}`);
});

win.addEventListener("compositionend", ({ data }) => {
  console.log(`committed: ${data}`);
});
```

#### Window / 窗口

| Event | Payload | Trigger |
|-------|---------|---------|
| `resize` | `{ width, height }` | Window resized |
| `move` | `{ x, y }` | Window moved |
| `minimize` | `void` | Window minimized |
| `maximize` | `void` | Window maximized |
| `restore` | `void` | Window restored from min/max |
| `close` | `void` | Close button clicked |
| `focus` | `void` | Window gained focus |
| `blur` | `void` | Window lost focus |
| `destroy` | `void` | Window destroyed |

---

### `Values` — Win32 Constants

All Win32 constants are organized under `Values` for easy access:

```typescript
import { Values } from "@brass/window";

// Virtual Key codes / 虚拟键码
Values.VirtualKeys.VK_ESCAPE   // 0x1B
Values.VirtualKeys.VK_A        // 0x41
Values.VirtualKeys.VK_F1       // 0x70
Values.VirtualKeys.VK_RETURN   // 0x0D

// Window styles / 窗口样式
Values.WindowStyle.WS_OVERLAPPEDWINDOW
Values.WindowStyleEx.WS_EX_APPWINDOW

// Window messages / 窗口消息
Values.WindowMessage.WM_CLOSE
Values.WindowMessage.WM_KEYDOWN

// Cursor types / 光标类型
Values.CursorType.IDC_ARROW
Values.CursorType.IDC_HAND
Values.CursorType.IDC_IBEAM

// System metrics / 系统指标
Values.SystemMetrics.SM_CXSCREEN
Values.SystemMetrics.SM_CYSCREEN
```

---

### `SystemInfo` — System Information / 系统信息

```typescript
import { SystemInfo } from "@brass/window";

// Screen / 屏幕
const res = SystemInfo.screen.resolution();
const dpi = SystemInfo.screen.dpi();
const hz = SystemInfo.screen.refreshRate();

// OS / 操作系统  
const name = SystemInfo.os.computerName();
const ver = SystemInfo.os.version(); // { major, minor, build }

// Hardware / 硬件
const cpuCores = SystemInfo.hardware.processorCount();
const totalRAM = SystemInfo.hardware.totalMemory();
const availRAM = SystemInfo.hardware.availableMemory();

// Input / 输入
const dblClick = SystemInfo.input.doubleClickTime();
const caretBlink = SystemInfo.input.caretBlinkTime();

// UI Metrics / UI 指标
const captionH = SystemInfo.ui.captionHeight();
const borderW = SystemInfo.ui.borderWidth();
```

---

## 🎮 Full Example: WebGPU FlyCamera

See `examples/flyCamera.ts`:

```bash
deno task example:flycamera
```

Features: WASD movement, mouse-look, scroll to adjust speed, fullscreen toggle, MSAA 4x, grid + cubes scene.

---

### Project Structure / 项目结构

```
@brass/window/
├── mod.ts                          # Entry point / 入口
├── deno.json                       # Config / 配置
├── build/brassWindow.dll.ts        # Base64-embedded DLL / 内嵌 DLL
├── native/windows/src/             # C source code / C 源码
│   ├── class.c                     # Window class + WndProc / 窗口类 + 窗口过程
│   ├── window.c                    # Window management / 窗口管理
│   ├── cursor.c                    # Cursor control / 光标控制
│   ├── message.c                   # Message loop / 消息循环
│   ├── icon.c                      # Icon loading / 图标加载
│   ├── system.c                    # System info / 系统信息
│   └── timer.c                     # High-res timer / 高精度定时器
├── src/
│   ├── types.ts                    # Core types / 核心类型
│   ├── ffi.ts                      # FFI bindings / FFI 绑定
│   ├── Application/               # App + event dispatch / 应用 + 事件分发
│   └── Window/                     # Window class + emitter / 窗口类 + 事件发射器
│   ├── SystemInfo/                 # System info queries / 系统信息查询
│   └── Values/                     # Win32 constants / Win32 常量
└── examples/
    └── flyCamera.ts                # WebGPU FlyCamera demo
```

---

## 📄 License / 许可

[MIT](LICENSE)

---

<div align="center">
<sub>Built with 🦕 Deno + Win32 FFI</sub>
</div>
