import { libSymbols } from "../../ffi.ts";
import { Values } from "../../Values/Values.ts"; 

/**
 * Input device information.
 *
 * Provides queries for mouse and keyboard related system parameters, including button count,
 * wheel status, double-click time, and caret blink period.
 *
 * @module SystemInfo.input
 * @since 0.0.27
 * @since 0.0.27
 */
export class InputInfo {
    /**
     * Gets the number of mouse buttons.
     *
     * Retrieves the number of physical buttons reported by the mouse device via `GetSystemMetrics(SM_CMOUSEBUTTONS)`.
     * Standard mice typically return 3 or 5; gaming mice may return more.
     *
     * @returns The number of mouse buttons.
     *
     * @example
     * ```ts
     * SystemInfo.input.mouseKeys(); // 5
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static mouseKeys(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CMOUSEBUTTONS);
    }

    /**
     * Checks whether a mouse device is connected.
     *
     * Detects whether at least one mouse device is connected to the system via `GetSystemMetrics(SM_MOUSEPRESENT)`.
     * Touchpads are typically also considered mouse devices.
     *
     * @returns true if a mouse is connected, otherwise false.
     *
     * @example
     * ```ts
     * SystemInfo.input.mousePresent(); // true
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static mousePresent(): boolean {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_MOUSEPRESENT) !== 0;
    }

    /**
     * Checks whether a mouse wheel is present.
     *
     * Detects whether the mouse is equipped with a vertical wheel via `GetSystemMetrics(SM_MOUSEWHEELPRESENT)`.
     *
     * @returns true if a wheel is present, otherwise false.
     *
     * @example
     * ```ts
     * SystemInfo.input.mouseWheelPresent(); // true
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static mouseWheelPresent(): boolean {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_MOUSEWHEELPRESENT) !== 0;
    }

    /**
     * Checks whether the primary and secondary mouse buttons are swapped.
     *
     * Detects whether the user has swapped the left and right mouse button functions in Control Panel
     * (typically for left-handed use) via `GetSystemMetrics(SM_SWAPBUTTON)`.
     *
     * @returns true if swapped (right button is primary), otherwise false (left button is primary).
     *
     * @example
     * ```ts
     * SystemInfo.input.mouseSwap(); // false
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static mouseSwap(): boolean {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_SWAPBUTTON) !== 0;
    }

    /**
     * Gets the mouse double-click time interval.
     *
     * Retrieves the maximum time interval the system considers two consecutive clicks as a double-click via `GetDoubleClickTime`.
     *
     * @returns The double-click time interval in milliseconds, default is 500.
     *
     * @example
     * ```ts
     * SystemInfo.input.doubleClickTime(); // 500
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getdoubleclicktime
     */
    static doubleClickTime(): number {
        return libSymbols.sysDoubleClickTime();
    }

    /**
     * Gets the caret blink time.
     *
     * Retrieves the alternating blink interval of the text cursor via `GetCaretBlinkTime`.
     *
     * @returns The caret blink period in milliseconds, default is 530.
     *
     * @example
     * ```ts
     * SystemInfo.input.caretBlinkTime(); // 530
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getcaretblinktime
     */
    static caretBlinkTime(): number {
        return libSymbols.sysCaretBlinkTime();
    }
}
