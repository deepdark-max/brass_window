/**
 * SystemInfo — Read-only Windows system information query module.
 *
 * Provides read-only querying of operating system parameters, screen information,
 * hardware specifications, input devices, and UI metrics.
 * All queries are implemented via Deno FFI calling underlying Win32 APIs with no external dependencies.
 *
 * Information is organized into five categories:
 * - {@link ScreenInfo}: screen resolution, work area, DPI, refresh rate, multi-monitor
 * - {@link OsInfo}: computer name, user name, system directories, Windows version
 * - {@link HardwareInfo}: processor, memory, page size, architecture
 * - {@link InputInfo}: mouse buttons, wheel, double-click time, caret blink
 * - {@link UiInfo}: borders, caption bar, scroll bars, menu bar
 *
 * @example
 * ```ts
 * import { SystemInfo } from "@brass/window";
 *
 * const res = SystemInfo.screen.resolution();
 * console.log(res); // { width: 1920, height: 1080 }
 *
 * const ver = SystemInfo.os.version();
 * console.log(ver); // { major: 10, minor: 0, build: 22621 }
 *
 * const cpu = SystemInfo.hardware.processorCount();
 * console.log(cpu); // 8
 * ```
 *
 * @module SystemInfo
 */

/** Screen information: resolution, work area, DPI, refresh rate, virtual screen */
import { ScreenInfo } from "./categories/screen.ts";
/** System information: computer name, user name, directories, version */
import { OsInfo } from "./categories/os.ts";
/** Hardware information: processor, memory, page size */
import { HardwareInfo } from "./categories/hardware.ts";
/** Input device information: mouse, buttons, wheel */
import { InputInfo } from "./categories/input.ts";
/** UI metrics: borders, caption bar, scroll bars, menu */
import { UiInfo } from "./categories/ui.ts";

/**
 * System information query entry point.
 *
 * Access corresponding information through category sub-objects:
 * - `SystemInfo.screen` — screen and display
 * - `SystemInfo.os` — operating system
 * - `SystemInfo.hardware` — hardware
 * - `SystemInfo.input` — input devices
 * - `SystemInfo.ui` — UI metrics
 *
 * @example
 * ```ts
 * const dpi = SystemInfo.screen.dpi();
 * const name = SystemInfo.os.computerName();
 * const mem = SystemInfo.hardware.totalMemory();
 * ```
 *
 * @since 0.0.27
 */
export const SystemInfo = {
    screen: ScreenInfo,
    os: OsInfo,
    hardware: HardwareInfo,
    input: InputInfo,
    ui: UiInfo,
} as const;
