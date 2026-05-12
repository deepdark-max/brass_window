/**
 * @module
 * Window show state constants (Show Window, `SW_*`).
 *
 * Used in the `nCmdShow` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-showwindow | ShowWindow}
 * function, controlling window visibility, activation state, and display method.
 *
 * ## Usage Example
 * ```ts
 * import { ShowWindow } from "./ShowWindow.ts";
 *
 * // Minimize the window
 * libSymbols.showWindow(hwnd, ShowWindow.SW_MINIMIZE);
 *
 * // Restore from minimized/maximized
 * libSymbols.showWindow(hwnd, ShowWindow.SW_RESTORE);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-showwindow
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-createwindowexw
 */
export enum ShowWindow {
    /** Hides the window and activates another window. */
    SW_HIDE = 0,

    /** Activates and displays the window. If minimized or maximized, restores to original size and position. */
    SW_SHOWNORMAL = 1,

    /** Activates the window and minimizes it. */
    SW_SHOWMINIMIZED = 2,

    /** Activates the window and maximizes it. */
    SW_SHOWMAXIMIZED = 3,

    /** Displays the window at its most recent size and position (without activating). Similar to `SW_SHOWNORMAL` but without activation. */
    SW_SHOWNOACTIVATE = 4,

    /** Activates the window and displays it at its current size and position. */
    SW_SHOW = 5,

    /** Minimizes the window and activates the next top-level window. */
    SW_MINIMIZE = 6,

    /** Displays as a minimized window (without activating). Similar to `SW_SHOWMINIMIZED` but without activation. */
    SW_SHOWMINNOACTIVE = 7,

    /** Displays the window at its current size and position (without activating). Similar to `SW_SHOW` but without activation. */
    SW_SHOWNA = 8,

    /** Activates and displays the window. If minimized or maximized, restores to original size and position. */
    SW_RESTORE = 9,

    /**
     * Sets the display state according to the `wShowWindow` field of the `STARTUPINFO` structure.
     * Only used on the first call to `ShowWindow` (for applications started by `CreateProcess`).
     */
    SW_SHOWDEFAULT = 10,

    /**
     * Minimizes the window even if the thread owning the window is not responding.
     * Only used when minimizing a window from another process.
     */
    SW_FORCEMINIMIZE = 11,
}
