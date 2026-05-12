/**
 * @module
 * Window style constants (Window Style, `WS_*`).
 *
 * Used in the `dwStyle` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-createwindowexw | CreateWindowEx}
 * function, controlling the appearance and behavior of the window.
 *
 * These flags can be combined using bitwise OR (`|`). Predefined combinations like
 * {@link WindowStyle.WS_OVERLAPPEDWINDOW} and {@link WindowStyle.WS_POPUPWINDOW}
 * cover most common scenarios.
 *
 * ## Usage Example
 * ```ts
 * import { WindowStyle } from "./WindowStyle.ts";
 *
 * // Create a standard overlapped window
 * const style = WindowStyle.WS_OVERLAPPEDWINDOW;
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/window-styles
 * @see https://learn.microsoft.com/windows/win32/winmsg/about-window-classes
 */
export enum WindowStyle {
    /** Overlapped window (default value 0). The window has a title bar and border. */
    WS_OVERLAPPED = 0x00000000,

    /** Popup window style. Cannot be used with `WS_CHILD`. */
    WS_POPUP = 0x80000000,

    /** Child window style. A parent window handle must be specified. Cannot be used with `WS_POPUP`. */
    WS_CHILD = 0x40000000,

    /** Window is initially minimized. Same as `WS_ICONIC`. */
    WS_MINIMIZE = 0x20000000,

    /** Window is initially visible. If not set, the window is hidden by default after creation. */
    WS_VISIBLE = 0x10000000,

    /** Window is initially disabled and does not receive user input. */
    WS_DISABLED = 0x08000000,

    /** Clips sibling window regions. Ensures child windows do not draw over sibling windows. */
    WS_CLIPSIBLINGS = 0x04000000,

    /** Clips the area of the parent window occupied by child windows. The parent window skips child window areas when drawing. */
    WS_CLIPCHILDREN = 0x02000000,

    /** Window is initially maximized. */
    WS_MAXIMIZE = 0x01000000,

    /** Window has a title bar (includes `WS_BORDER | WS_DLGFRAME`). */
    WS_CAPTION = 0x00C00000,

    /** Window has a thin-line border. */
    WS_BORDER = 0x00800000,

    /** Window has a dialog border (double border, no system menu). */
    WS_DLGFRAME = 0x00400000,

    /** Window has a vertical scroll bar. */
    WS_VSCROLL = 0x00200000,

    /** Window has a horizontal scroll bar. */
    WS_HSCROLL = 0x00100000,

    /** Window has a system menu (title bar left icon menu). Requires `WS_CAPTION`. */
    WS_SYSMENU = 0x00080000,

    /** Window has a resizable thick border. Same as `WS_SIZEBOX`. */
    WS_THICKFRAME = 0x00040000,

    /** Control group style. Arrow keys can navigate between controls in the same group. */
    WS_GROUP = 0x00020000,

    /** Tab stop style. The user can press Tab to switch focus to this control. */
    WS_TABSTOP = 0x00010000,

    /** Window has a minimize button. Requires `WS_SYSMENU`. Same value as `WS_GROUP` (different context). */
    WS_MINIMIZEBOX = 0x00020000,

    /** Window has a maximize button. Requires `WS_SYSMENU`. Same value as `WS_TABSTOP` (different context). */
    WS_MAXIMIZEBOX = 0x00010000,

    // ==================== Predefined Combined Styles ====================

    /**
     * Standard overlapped window.
     * Includes: `WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX`
     */
    WS_OVERLAPPEDWINDOW = (WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX),

    /**
     * Popup window (commonly used for dialogs).
     * Includes: `WS_POPUP | WS_BORDER | WS_SYSMENU`
     */
    WS_POPUPWINDOW = (WS_POPUP | WS_BORDER | WS_SYSMENU),

    /** Child window style, same as `WS_CHILD`. */
    WS_CHILDWINDOW = WS_CHILD,

    /** Tiled window style, same as `WS_OVERLAPPED`. */
    WS_TILED = WS_OVERLAPPED,

    /** Tiled window style, same as `WS_OVERLAPPEDWINDOW`. */
    WS_TILEDWINDOW = WS_OVERLAPPEDWINDOW,
}
