/**
 * @module
 * Extended window style constants (Extended Window Style, `WS_EX_*`).
 *
 * Used in the `dwExStyle` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-createwindowexw | CreateWindowEx}
 * function, providing additional window behavior characteristics.
 *
 * These flags can be combined using bitwise OR (`|`). Predefined combinations like
 * {@link WindowStyleEx.WS_EX_OVERLAPPEDWINDOW} and {@link WindowStyleEx.WS_EX_PALETTEWINDOW}
 * cover common scenarios.
 *
 * ## Usage Example
 * ```ts
 * import { WindowStyleEx } from "./WindowStyleEx.ts";
 *
 * // Create a topmost tool window
 * const exStyle = WindowStyleEx.WS_EX_TOPMOST | WindowStyleEx.WS_EX_TOOLWINDOW;
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/extended-window-styles
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-createwindowexw
 */
export enum WindowStyleEx {
    /** Window has a double border (dialog style). */
    WS_EX_DLGMODALFRAME = 0x00000001,

    /** Child window does not send `WM_PARENTNOTIFY` messages to its parent window. */
    WS_EX_NOPARENTNOTIFY = 0x00000004,

    /** Window stays above all non-topmost windows (topmost window). */
    WS_EX_TOPMOST = 0x00000008,

    /** Window accepts drag-and-drop files (via `WM_DROPFILES`). */
    WS_EX_ACCEPTFILES = 0x00000010,

    /** The window below is not obscured (transparent drawing). */
    WS_EX_TRANSPARENT = 0x00000020,

    /** Creates a Multiple Document Interface (MDI) child window. */
    WS_EX_MDICHILD = 0x00000040,

    /** Creates a tool window (narrow title bar, not shown in taskbar). */
    WS_EX_TOOLWINDOW = 0x00000080,

    /** Window has a raised edge border. */
    WS_EX_WINDOWEDGE = 0x00000100,

    /** Window has a sunken client area edge (3D effect, commonly used for editable areas). */
    WS_EX_CLIENTEDGE = 0x00000200,

    /** Title bar contains a question mark help button. Requires `WS_CAPTION`. */
    WS_EX_CONTEXTHELP = 0x00000400,

    /** Window has right-aligned text. */
    WS_EX_RIGHT = 0x00001000,

    /** Window text has right-to-left (RTL) reading order. */
    WS_EX_RTLREADING = 0x00002000,

    /** Vertical scroll bar is on the left side of the client area. */
    WS_EX_LEFTSCROLLBAR = 0x00004000,

    /** Allows Tab key navigation between child windows. */
    WS_EX_CONTROLPARENT = 0x00010000,

    /** Window has a static edge (3D border). */
    WS_EX_STATICEDGE = 0x00020000,

    /** Forces a top-level window to display a separate button on the taskbar. */
    WS_EX_APPWINDOW = 0x00040000,

    /** Creates a layered window (supports transparency, transparent color key, etc.). */
    WS_EX_LAYERED = 0x00080000,

    /** Child window does not inherit the parent window's layout mirroring. */
    WS_EX_NOINHERITLAYOUT = 0x00100000,

    /** Window does not use a redirected bitmap (low latency, no DWM buffer). */
    WS_EX_NOREDIRECTIONBITMAP = 0x00200000,

    /** Window uses a right-to-left layout. */
    WS_EX_LAYOUTRTL = 0x00400000,

    /** Clicking the window does not activate it. */
    WS_EX_NOACTIVATE = 0x08000000,

    // ==================== Predefined Combined Styles ====================

    /**
     * Standard overlapped extended window.
     * Includes: `WS_EX_WINDOWEDGE | WS_EX_CLIENTEDGE`
     */
    WS_EX_OVERLAPPEDWINDOW = (WS_EX_WINDOWEDGE | WS_EX_CLIENTEDGE),

    /**
     * Palette window (floating toolbar).
     * Includes: `WS_EX_WINDOWEDGE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST`
     */
    WS_EX_PALETTEWINDOW = (WS_EX_WINDOWEDGE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST),
}
