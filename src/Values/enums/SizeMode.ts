/**
 * @module
 * Window size change mode constants (`SIZE_*`).
 *
 * Used in the `wParam` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/winmsg/wm-size | WM_SIZE}
 * message, identifying the type of window size change (minimized, maximized, restored, hidden/shown).
 *
 * ## Usage Example
 * ```ts
 * import { SizeMode } from "./SizeMode.ts";
 *
 * // Handle WM_SIZE in the window procedure
 * if (msg === WindowMessage.WM_SIZE) {
 *   switch (wParam) {
 *     case SizeMode.SIZE_MINIMIZED:
 *       // Window has been minimized
 *       break;
 *     case SizeMode.SIZE_MAXIMIZED:
 *       // Window has been maximized
 *       break;
 *   }
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/wm-size
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-movewindow
 */
export enum SizeMode {
    /** Window has been restored (from maximized/minimized). */
    SIZE_RESTORED = 0,

    /** Window has been minimized. */
    SIZE_MINIMIZED = 1,

    /** Window has been maximized. */
    SIZE_MAXIMIZED = 2,

    /** Another window has been maximized, and the current window is hidden. */
    SIZE_MAXSHOW = 3,

    /** Another window has been restored, and the current window is hidden. */
    SIZE_MAXHIDE = 4,
}
