/**
 * @module
 * Window long value offset constants (Window Long, `GWL_*` / `GWLP_*`).
 *
 * Used in the `nIndex` parameter of
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getwindowlongptrw | GetWindowLongPtr}
 * and {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowlongptrw | SetWindowLongPtr}
 * functions, specifying the window memory offset to read or write.
 *
 * `GWL_*` and `GWLP_*` prefixes have the same numeric values and identical semantics (`GWLP_*` is the 64-bit compatible naming).
 *
 * ## Usage Example
 * ```ts
 * import { WindowLong } from "./WindowLong.ts";
 *
 * // Get window style
 * const style = libSymbols.getWindowLongPtr(hwnd, WindowLong.GWL_STYLE);
 *
 * // Set window extended style
 * libSymbols.setWindowLongPtr(hwnd, WindowLong.GWL_EXSTYLE, newStyle);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getwindowlongptrw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowlongptrw
 */
export enum WindowLong {
    /** Gets or sets the extended window style (`WS_EX_*`). */
    GWL_EXSTYLE = -20,

    /** Gets or sets the base window style (`WS_*`). */
    GWL_STYLE = -16,

    /** Gets or sets the function pointer address of the window procedure (WNDPROC). */
    GWL_WNDPROC = -4,

    /** Gets or sets the instance handle (HINSTANCE) of the window. */
    GWL_HINSTANCE = -6,

    /** Gets or sets the parent window handle. */
    GWL_HWNDPARENT = -8,

    /** Gets or sets the user-defined data associated with the window (64-bit value). */
    GWL_USERDATA = -21,

    /** Gets or sets the child window identifier. */
    GWL_ID = -12,

    /** Gets or sets user data (64-bit compatible naming). Same as `GWL_USERDATA`. */
    GWLP_USERDATA = -21,

    /** Gets or sets the window procedure address (64-bit compatible naming). Same as `GWL_WNDPROC`. */
    GWLP_WNDPROC = -4,

    /** Gets or sets the instance handle (64-bit compatible naming). Same as `GWL_HINSTANCE`. */
    GWLP_HINSTANCE = -6,

    /** Gets or sets the parent window handle (64-bit compatible naming). Same as `GWL_HWNDPARENT`. */
    GWLP_HWNDPARENT = -8,

    /** Gets or sets the child window identifier (64-bit compatible naming). Same as `GWL_ID`. */
    GWLP_ID = -12,
}
