/**
 * @module
 * System command constants (System Commands).
 *
 * Used in the `wParam` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/menurc/wm-syscommand | WM_SYSCOMMAND}
 * message, identifying the operation selected by the user from the system menu (title bar context menu).
 *
 * ## Usage Example
 * ```ts
 * import { SystemCommands } from "./SystemCommands.ts";
 *
 * // Handle system commands in the window procedure
 * if (msg === WindowMessage.WM_SYSCOMMAND) {
 *   switch (wParam) {
 *     case SystemCommands.SC_CLOSE:
 *       // Handle close
 *       break;
 *   }
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/menurc/wm-syscommand
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-defwindowprocw
 */
export enum SystemCommands {
    /** Resize the window. */
    SC_SIZE = 0xF000,

    /** Move the window. */
    SC_MOVE = 0xF010,

    /** Minimize the window. */
    SC_MINIMIZE = 0xF020,

    /** Maximize the window. */
    SC_MAXIMIZE = 0xF030,

    /** Switch to the next window. */
    SC_NEXTWINDOW = 0xF040,

    /** Switch to the previous window. */
    SC_PREVWINDOW = 0xF050,

    /** Close the window. */
    SC_CLOSE = 0xF060,

    /** Vertical scroll. */
    SC_VSCROLL = 0xF070,

    /** Horizontal scroll. */
    SC_HSCROLL = 0xF080,

    /** Activate system menu via mouse. */
    SC_MOUSEMENU = 0xF090,

    /** Activate system menu via keyboard. */
    SC_KEYMENU = 0xF100,

    /** Arrange minimized windows. */
    SC_ARRANGE = 0xF110,

    /** Restore the window to its previous size and position. */
    SC_RESTORE = 0xF120,

    /** Activate the task list (Task Manager). */
    SC_TASKLIST = 0xF130,

    /** Launch the screen saver. */
    SC_SCREENSAVE = 0xF140,

    /** Activate the window associated with a hotkey. */
    SC_HOTKEY = 0xF150,

    /** Select the default item. */
    SC_DEFAULT = 0xF160,

    /** Monitor power management. */
    SC_MONITORPOWER = 0xF170,

    /** Context help (show question mark cursor). */
    SC_CONTEXTHELP = 0xF180,

    /** Set or clear the topmost state of the window. */
    SC_TOPMOST = 0xF012,
}
