/**
 * @module @brass/window
 *
 * Native Windows window creation, configuration, and event listening.
 *
 * ## Main exports
 * - {@link Application} — Application lifecycle and window management
 * - {@link Window} — Individual window control and event handling
 * - {@link SystemInfo} — System information queries (screen, OS, hardware, input, UI)
 * - {@link Values} — Win32 constants (window styles, virtual keys, messages, etc.)
 *
 * @example
 * ```ts
 * import { Application, SystemInfo, Values } from "@brass/window";
 *
 * const app = new Application();
 * const win = app.createWindow({ title: "Hello", id: "main", width: 800, height: 600 });
 *
 * win.addEventListener("resize", ({ width, height }) => {
 *   console.log(`resized: ${width}x${height}`);
 * });
 * ```
 */

/** Application lifecycle and window management */
export { Application } from "./src/Application/Application.ts";
/** System information queries (screen, OS, hardware, input, UI) */
export { SystemInfo } from "./src/SystemInfo/SystemInfo.ts";
/** Win32 constants (window styles, virtual keys, messages, etc.) */
export { Values } from "./src/Values/Values.ts";
/** Individual window control and event handling */
export type { Window } from "./src/Window/Window.ts";
