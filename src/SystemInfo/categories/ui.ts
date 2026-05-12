import { libSymbols } from "../../ffi.ts";
import { Values } from "../../Values/Values.ts"; 

/**
 * UI metrics information.
 *
 * Provides dimension queries for Windows window UI elements (borders, caption bar, scroll bars, menu bar, etc.).
 * All queries retrieve system-level UI parameters via `GetSystemMetrics`.
 *
 * @module SystemInfo.ui
 * @since 0.0.27
 * @since 0.0.27
 */
export class UiInfo {
    /**
     * Gets the width of the window border.
     *
     * Retrieves the width of a window's resizable border via `GetSystemMetrics(SM_CXBORDER)`.
     *
     * @returns The border width in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.borderWidth(); // 1
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static borderWidth(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXBORDER);
    }

    /**
     * Gets the height of the window border.
     *
     * Retrieves the height of a window's resizable border via `GetSystemMetrics(SM_CYBORDER)`.
     *
     * @returns The border height in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.borderHeight(); // 1
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static borderHeight(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYBORDER);
    }

    /**
     * Gets the height of the window caption bar.
     *
     * Retrieves the height of a standard window caption bar via `GetSystemMetrics(SM_CYCAPTION)`.
     * The caption bar area includes the window title text and the minimize, maximize, and close buttons.
     *
     * @returns The caption bar height in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.captionHeight(); // 23
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static captionHeight(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYCAPTION);
    }

    /**
     * Gets the width of the vertical scroll bar.
     *
     * Retrieves the width of a standard vertical scroll bar via `GetSystemMetrics(SM_CXVSCROLL)`.
     *
     * @returns The vertical scroll bar width in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.scrollBarWidth(); // 17
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static scrollBarWidth(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXVSCROLL);
    }

    /**
     * Gets the height of the horizontal scroll bar.
     *
     * Retrieves the height of a standard horizontal scroll bar via `GetSystemMetrics(SM_CYHSCROLL)`.
     *
     * @returns The horizontal scroll bar height in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.scrollBarHeight(); // 17
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static scrollBarHeight(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYHSCROLL);
    }

    /**
     * Gets the height of the menu bar.
     *
     * Retrieves the height of a standard window menu bar via `GetSystemMetrics(SM_CYMENU)`.
     * The menu bar may have multiple rows, but this value only returns the height of one row.
     *
     * @returns The menu bar height in pixels, or 0 when no menu bar is present.
     *
     * @example
     * ```ts
     * SystemInfo.ui.menuHeight(); // 19
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static menuHeight(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYMENU);
    }

    /**
     * Gets the resizable frame border width of a sizable window.
     *
     * Retrieves the width of the resizable border for windows with the `WS_THICKFRAME` style
     * via `GetSystemMetrics(SM_CXFRAME)` (aka `SM_CXSIZEFRAME`).
     * This border area allows the user to drag and resize the window.
     *
     * @returns The frame border width in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.frameWidth(); // 4
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static frameWidth(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXFRAME);
    }

    /**
     * Gets the resizable frame border height of a sizable window.
     *
     * Retrieves the height of the resizable border for windows with the `WS_THICKFRAME` style
     * via `GetSystemMetrics(SM_CYFRAME)` (aka `SM_CYSIZEFRAME`).
     *
     * @returns The frame border height in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.ui.frameHeight(); // 4
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static frameHeight(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYFRAME);
    }
}
