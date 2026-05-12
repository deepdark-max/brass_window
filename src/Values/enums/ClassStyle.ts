/**
 * @module
 * Window class style constants (Class Style).
 *
 * Used in the {@link https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-wndclassw | WNDCLASS}
 * structure or the `style` parameter of the `initializeWindowClass` function,
 * specifying the behavior characteristics of the window class when calling
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-registerclassw | RegisterClass}.
 *
 * These flags can be combined using bitwise OR (`|`).
 *
 * ## Usage Example
 * ```ts
 * import { ClassStyle } from "./ClassStyle.ts";
 *
 * const style = ClassStyle.CS_HREDRAW | ClassStyle.CS_VREDRAW | ClassStyle.CS_DBLCLKS;
 * libSymbols.initializeWindowClass(hIcon, hIconSm, style);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-wndclassw
 * @see https://learn.microsoft.com/windows/win32/winmsg/about-window-classes
 */
export enum ClassStyle {
    /**
     * Redraws the entire client area when the window's vertical size changes or it is moved vertically.
     * The window procedure receives `WM_SIZE` or `WM_MOVE` messages.
     */
    CS_VREDRAW = 0x0001,

    /**
     * Redraws the entire client area when the window's horizontal size changes or it is moved horizontally.
     * The window procedure receives `WM_SIZE` or `WM_MOVE` messages.
     */
    CS_HREDRAW = 0x0002,

    /**
     * Enables double-click messages for the window. Sends `WM_LBUTTONDBLCLK` to the window procedure on double-click.
     * If this style is not set, the window will not receive double-click messages.
     */
    CS_DBLCLKS = 0x0008,

    /**
     * Allocates a unique device context (DC) for each window of this class.
     * Avoids the overhead of retrieving a DC from the pool on every paint, suitable for windows that paint frequently.
     */
    CS_OWNDC = 0x0020,

    /**
     * All windows of this class share a single window class device context (DC).
     * The window class DC is cached internally by the system; modifications affect all windows of the same class.
     */
    CS_CLASSDC = 0x0040,

    /**
     * Child windows use the parent window's device context (DC).
     * Child windows do not need to prepare a separate DC; they draw directly on the parent's DC.
     */
    CS_PARENTDC = 0x0080,

    /**
     * Disables the Close button on the window's system menu.
     * Note: This style does not affect `WM_CLOSE` message handling.
     */
    CS_NOCLOSE = 0x0200,

    /**
     * Saves the screen area obscured by this window as a bitmap.
     * When the window is moved away, the system can use the bitmap to restore the obscured area, reducing repaints.
     */
    CS_SAVEBITS = 0x0800,

    /**
     * Aligns the window's client area horizontally on byte boundaries.
     * Can slightly improve drawing performance.
     */
    CS_BYTEALIGNCLIENT = 0x1000,

    /**
     * Aligns the window itself horizontally on byte boundaries.
     * Can slightly improve window moving performance.
     */
    CS_BYTEALIGNWINDOW = 0x2000,

    /**
     * Registers as a global class (applicable to classes registered in DLLs).
     * Visible to all processes, requires `CS_GLOBALCLASS`.
     */
    CS_GLOBALCLASS = 0x4000,

    /**
     * Adds a drop shadow effect to the window.
     * Only applies to top-level windows (not child windows), requires XP and above.
     */
    CS_DROPSHADOW = 0x00020000,
}
