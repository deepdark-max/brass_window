/**
 * @module
 * System cursor type constants (IDC_*).
 *
 * Used in {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-loadcursorw | LoadCursor}
 * and {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setcursor | SetCursor}
 * functions to load or set standard system cursors.
 *
 * These constants correspond to system predefined cursor resource IDs (loaded via `LoadCursor(NULL, id)`).
 *
 * ## Usage Example
 * ```ts
 * import { CursorType } from "./CursorType.ts";
 *
 * // Set cursor to wait style
 * const hCursor = libSymbols.loadCursor(CursorType.IDC_WAIT);
 * libSymbols.setCursor(hCursor);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-loadcursorw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setcursor
 * @see https://learn.microsoft.com/windows/win32/menurc/about-cursors
 */
export enum CursorType {
    /** Application-starting cursor (arrow + hourglass). */
    IDC_APPSTARTING = 32650,

    /** Standard arrow cursor. */
    IDC_ARROW = 32512,

    /** Crosshair cursor. */
    IDC_CROSS = 32515,

    /** Hand cursor (clickable link). */
    IDC_HAND = 32649,

    /** Help cursor (arrow + question mark). */
    IDC_HELP = 32651,

    /** I-beam text input cursor. */
    IDC_IBEAM = 32513,

    /** Prohibited/unavailable cursor (circle with slash). */
    IDC_NO = 32648,

    /** Four-way resize cursor (move). */
    IDC_SIZEALL = 32646,

    /** Diagonal resize cursor (top-right to bottom-left). */
    IDC_SIZENESW = 32643,

    /** Vertical resize cursor (up-down). */
    IDC_SIZENS = 32645,

    /** Diagonal resize cursor (top-left to bottom-right). */
    IDC_SIZENWSE = 32642,

    /** Horizontal resize cursor (left-right). */
    IDC_SIZEWE = 32644,

    /** Up-arrow cursor (for selection). */
    IDC_UPARROW = 32516,

    /** Wait/busy cursor (hourglass). */
    IDC_WAIT = 32514,
}
