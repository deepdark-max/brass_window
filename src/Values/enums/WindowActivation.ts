/**
 * @module
 * Window activation state constants (Window Activation, `WA_*`).
 *
 * Used in the `wParam` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/winmsg/wm-activate | WM_ACTIVATE}
 * message, indicating the activation state change of the window.
 *
 * ## Usage Example
 * ```ts
 * import { WindowActivation } from "./WindowActivation.ts";
 *
 * // Handle WM_ACTIVATE in the window procedure
 * if (msg === WindowMessage.WM_ACTIVATE) {
 *   switch (wParam) {
 *     case WindowActivation.WA_ACTIVE:
 *       // Window was activated
 *       break;
 *     case WindowActivation.WA_INACTIVE:
 *       // Window was deactivated
 *       break;
 *   }
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/wm-activate
 */
export enum WindowActivation {
    /** Window is deactivated (lost focus). */
    WA_INACTIVE = 0,

    /** Window is activated (by means other than mouse click, such as Alt+Tab). */
    WA_ACTIVE = 1,

    /** Window is activated by a mouse click. */
    WA_CLICKACTIVE = 2,
}
