import { libSymbols } from "../../ffi.ts";
import { Values } from "../../Values/Values.ts"; 

/**
 * Screen and display information.
 *
 * Provides queries for primary and multi-monitor resolution, work area, DPI, refresh rate, etc.,
 * covering single-monitor and multi-monitor virtual desktop scenarios.
 *
 * @module SystemInfo.screen
 * @since 0.0.27
 * @since 0.0.27
 */
export class ScreenInfo {
    /**
     * Gets the resolution of the primary display.
     *
     * Retrieves the physical resolution (in pixels) of the primary display via
     * `GetSystemMetrics(SM_CXSCREEN)` and `GetSystemMetrics(SM_CYSCREEN)`.
     * In multi-monitor configurations, only the primary display is returned.
     *
     * @returns An object containing width and height, in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.screen.resolution(); // { width: 1920, height: 1080 }
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static resolution(): { width: number; height: number } {
        return {
            width: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXSCREEN),
            height: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYSCREEN),
        };
    }

    /**
     * Gets the work area of the primary display.
     *
     * Retrieves the area of the screen available for application use via
     * `SystemParametersInfoW(SPI_GETWORKAREA)`, excluding system-reserved regions such as
     * the taskbar and docked toolbars.
     *
     * @returns An object containing x, y, width and height, in pixels, with coordinates relative to the screen origin.
     *
     * @example
     * ```ts
     * SystemInfo.screen.workArea(); // { x: 0, y: 0, width: 1920, height: 1032 }
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-systemparametersinfow
     */
    static workArea(): { x: number; y: number; width: number; height: number } {
        const buf = new Uint8Array(16);
        const ptr = Deno.UnsafePointer.of(buf);
        if (libSymbols.sysWorkArea(ptr)) {
            const v = new DataView(buf.buffer);
            const left = v.getInt32(0, true);
            const top = v.getInt32(4, true);
            const right = v.getInt32(8, true);
            const bottom = v.getInt32(12, true);
            return { x: left, y: top, width: right - left, height: bottom - top };
        }
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    /**
     * Gets the DPI (dots per inch) of the primary display.
     *
     * Retrieves the horizontal DPI of the primary display via `GetDeviceCaps(LOGPIXELSX)`.
     * The standard value is 96 (100% scaling); high-DPI displays may return 120 (125%), 144 (150%), etc.
     *
     * @returns The current DPI value.
     *
     * @example
     * ```ts
     * SystemInfo.screen.dpi(); // 96
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/gdi32/nf-gdi32-getdevicecaps
     */
    static dpi(): number {
        return libSymbols.sysDpi();
    }

    /**
     * Gets the refresh rate of the primary display.
     *
     * Retrieves the actual refresh rate of the current display via DWM's `DwmGetCompositionTimingInfo`.
     * Returns the default value 60 on failure.
     *
     * @returns The refresh rate in Hz, e.g. 60, 120, 144, etc.
     *
     * @example
     * ```ts
     * SystemInfo.screen.refreshRate(); // 144
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/dwmapi/nf-dwmapi-dwmgetcompositiontiminginfo
     */
    static refreshRate(): number {
        return libSymbols.getDisplayRefreshRate();
    }

    /**
     * Gets the number of connected monitors.
     *
     * Retrieves the number of monitors detected by the system via `GetSystemMetrics(SM_CMONITORS)`.
     * Multiple monitors in clone mode are counted as one.
     *
     * @returns The number of monitors.
     *
     * @example
     * ```ts
     * SystemInfo.screen.monitorCount(); // 2
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static monitorCount(): number {
        return libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CMONITORS);
    }

    /**
     * Gets the bounds of the virtual screen.
     *
     * The virtual screen is the logical rectangular area formed by all monitors in desktop space.
     * In multi-monitor configurations, the primary display is typically at (0, 0),
     * while secondary display coordinates may be negative or exceed the primary display dimensions.
     *
     * @returns The x, y, width and height of the virtual screen, in pixels.
     *
     * @example
     * ```ts
     * SystemInfo.screen.virtualScreen(); // { x: 0, y: 0, width: 3840, height: 1080 }
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
     */
    static virtualScreen(): { x: number; y: number; width: number; height: number } {
        return {
            x: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_XVIRTUALSCREEN),
            y: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_YVIRTUALSCREEN),
            width: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXVIRTUALSCREEN),
            height: libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYVIRTUALSCREEN),
        };
    }
}
