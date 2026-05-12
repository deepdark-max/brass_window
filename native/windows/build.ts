const SRC_DIR = "./native/windows/src";
const OUTPUT_FILE = "./native/windows/export.dll";
const EXPORT_FILE = "./build/brassWindow.dll.ts";
const DLL_FILE = "brassWindow.dll";

// Compile Windows platform dynamic library
const command = new Deno.Command("gcc", {
  args: [
    "-D", "UNICODE",
    "-D", "_UNICODE",
    "-shared",
    "-Os",
    "-ffunction-sections",
    "-fdata-sections",
    "-fvisibility=hidden",
    "-o", OUTPUT_FILE,
    `${SRC_DIR}/class.c`,
    `${SRC_DIR}/window.c`,
    `${SRC_DIR}/cursor.c`,
    `${SRC_DIR}/message.c`,
    `${SRC_DIR}/system.c`,
    `${SRC_DIR}/icon.c`,
    `${SRC_DIR}/timer.c`,
    "-lwinmm",   
    "-ldwmapi",
    "-lkernel32",
    "-luser32",
    "-lole32",
    "-lshell32",
    "-lpropsys",
    "-luuid",
    "-lgdi32",
    "-Wl,--gc-sections",
    "-Wl,--strip-all",
    "-Wl,--exclude-libs,ALL"
  ],
  stderr: "piped"  
});

const { code, stderr } = await command.output();

const decoder = new TextDecoder();

if (code === 0) {
  console.log("Windows x64 platform compiled successfully!");
} else {
  console.error("Windows x64 platform compilation failed:");
  console.error(decoder.decode(stderr));
}

// Read the dynamic library, convert to base64 string and hardcode into windows-lib.ts
const dllFile = await Deno.readFile(OUTPUT_FILE); 
const binaryString = Array.from(dllFile, (byte) => String.fromCodePoint(byte)).join("");
const base64String = btoa(binaryString);
const template = `
const DLL_BASE64_STRING = "${base64String}";

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

const TEMP_DLL_PATH = Deno.cwd() + '/${DLL_FILE}';

if (!await fileExists(TEMP_DLL_PATH)) { // If file already saved locally, skip re-writing
  await Deno.writeFile(TEMP_DLL_PATH, base64ToUint8Array(DLL_BASE64_STRING));
  console.log('Loaded: ' + TEMP_DLL_PATH);
}

const WINDOWS_LIB_PATH = TEMP_DLL_PATH;

export default WINDOWS_LIB_PATH;
`;
await Deno.mkdir("./build", { recursive: true });
await Deno.writeTextFile(EXPORT_FILE, template);
console.log("Exported Windows library to " + EXPORT_FILE);

