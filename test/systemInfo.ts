import { SystemInfo } from "@brass/window";

function formatBytes(bytes: number): string {
  const kb = bytes / 1024;
  const mb = kb / 1024;
  const gb = mb / 1024;
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${kb.toFixed(2)} KB`;
}

console.log("=".repeat(50));
console.log("  SystemInfo - Windows System Information");
console.log("=".repeat(50));

console.log("\n--- Screen Info ---");
const r = SystemInfo.screen.resolution();
console.log(`  Resolution:      ${r.width} x ${r.height}`);
const wa = SystemInfo.screen.workArea();
console.log(`  Work Area:       x=${wa.x}, y=${wa.y}, ${wa.width} x ${wa.height}`);
console.log(`  DPI:             ${SystemInfo.screen.dpi()}`);
console.log(`  Refresh Rate:    ${SystemInfo.screen.refreshRate()} Hz`);
console.log(`  Monitor Count:   ${SystemInfo.screen.monitorCount()}`);
const vs = SystemInfo.screen.virtualScreen();
console.log(`  Virtual Screen:  x=${vs.x}, y=${vs.y}, ${vs.width} x ${vs.height}`);

console.log("\n--- OS Info ---");
console.log(`  Computer Name:   ${SystemInfo.os.computerName()}`);
console.log(`  User Name:       ${SystemInfo.os.userName()}`);
console.log(`  System Dir:      ${SystemInfo.os.systemDirectory()}`);
console.log(`  Windows Dir:     ${SystemInfo.os.windowsDirectory()}`);
const ver = SystemInfo.os.version();
console.log(`  Version:         ${ver.major}.${ver.minor}.${ver.build}`);

console.log("\n--- Hardware Info ---");
console.log(`  Processor Count: ${SystemInfo.hardware.processorCount()}`);
console.log(`  Architecture:    ${SystemInfo.hardware.processorArchitecture()}`);
console.log(`  Page Size:       ${SystemInfo.hardware.pageSize()} bytes`);
console.log(`  Physical Memory: ${SystemInfo.hardware.physicalMemoryKB()} KB (${formatBytes(SystemInfo.hardware.physicalMemoryKB() * 1024)})`);
console.log(`  Total Memory:    ${formatBytes(SystemInfo.hardware.totalMemory())}`);
console.log(`  Available Mem:   ${formatBytes(SystemInfo.hardware.availableMemory())}`);
console.log(`  Memory Load:     ${SystemInfo.hardware.memoryLoad()}%`);

console.log("\n--- Input Info ---");
console.log(`  Mouse Keys:      ${SystemInfo.input.mouseKeys()}`);
console.log(`  Mouse Present:   ${SystemInfo.input.mousePresent()}`);
console.log(`  Mouse Wheel:     ${SystemInfo.input.mouseWheelPresent()}`);
console.log(`  Mouse Swap:      ${SystemInfo.input.mouseSwap()}`);
console.log(`  Double Click:    ${SystemInfo.input.doubleClickTime()} ms`);
console.log(`  Caret Blink:     ${SystemInfo.input.caretBlinkTime()} ms`);

console.log("\n--- UI Info ---");
console.log(`  Border:          ${SystemInfo.ui.borderWidth()} x ${SystemInfo.ui.borderHeight()}`);
console.log(`  Caption Height:  ${SystemInfo.ui.captionHeight()}`);
console.log(`  Scroll Bar:      ${SystemInfo.ui.scrollBarWidth()} x ${SystemInfo.ui.scrollBarHeight()}`);
console.log(`  Menu Height:     ${SystemInfo.ui.menuHeight()}`);
console.log(`  Frame Size:      ${SystemInfo.ui.frameWidth()} x ${SystemInfo.ui.frameHeight()}`);

console.log("\n" + "=".repeat(50));
console.log("  All SystemInfo output complete");
console.log("=".repeat(50));
