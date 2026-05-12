/**
 * @module
 * SetWindowPos flag constants (`SWP_*`).
 *
 * Used in the `uFlags` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowpos | SetWindowPos}
 * function, controlling changes to window position, size, and Z-order.
 *
 * These flags can be combined using bitwise OR (`|`). For example, to change only the Z-order without changing size and position:
 * `SWP_NOSIZE | SWP_NOMOVE | SWP_FRAMECHANGED`
 *
 * ## Usage Example
 * ```ts
 * import { WindowPosition } from "./WindowPosition.ts";
 *
 * const flags = WindowPosition.SWP_NOSIZE | WindowPosition.SWP_NOMOVE | WindowPosition.SWP_FRAMECHANGED;
 * libSymbols.setWindowPos(hwnd, null, 0, 0, 0, 0, flags);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowpos
 * @see https://learn.microsoft.com/windows/win32/winmsg/wm-windowposchanging
 */
export enum WindowPosition {
    /** Does not change the window size. Ignores the `cx` and `cy` parameters. */
    SWP_NOSIZE = 0x0001,

    /** Does not change the window position. Ignores the `x` and `y` parameters. */
    SWP_NOMOVE = 0x0002,

    /** Does not change the window Z-order position. Ignores the `hwndInsertAfter` parameter. */
    SWP_NOZORDER = 0x0004,

    /** Does not redraw the window. Suitable for batch changes followed by a single redraw. */
    SWP_NOREDRAW = 0x0008,

    /** Does not activate the window. If this flag is not set, the window will be activated. */
    SWP_NOACTIVATE = 0x0010,

    /**
     * Sends a `WM_NCCALCSIZE` message to the window (even if the window size has not changed).
     * This flag must be used after modifying window styles to apply changes.
     */
    SWP_FRAMECHANGED = 0x0020,

    /** Shows the window. */
    SWP_SHOWWINDOW = 0x0040,

    /** Hides the window. */
    SWP_HIDEWINDOW = 0x0080,

    /** Does not copy the obscured client area content. Preserves the original client area content unchanged. */
    SWP_NOCOPYBITS = 0x0100,

    /** Does not change the owner window's Z-order position. */
    SWP_NOOWNERZORDER = 0x0200,

    /** Does not send the `WM_WINDOWPOSCHANGING` message. */
    SWP_NOSENDCHANGING = 0x0400,

    /** Defers erasing the background. Used in conjunction with `SWP_NOREDRAW`. */
    SWP_DEFERERASE = 0x2000,

    /** Sets the window position asynchronously (does not wait for the window thread to respond). */
    SWP_ASYNCWINDOWPOS = 0x4000,
}
