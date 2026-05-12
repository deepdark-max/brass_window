/**
 * @module
 * Display device mode change flag constants (`CDS_*`).
 *
 * Used in the `dwFlags` parameter of
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-changedisplaysettingsw | ChangeDisplaySettings}
 * or {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-changedisplaysettingsexw | ChangeDisplaySettingsEx}
 * functions, controlling screen resolution and color depth changes.
 *
 * These flags can be combined using bitwise OR (`|`).
 *
 * ## Usage Example
 * ```ts
 * import { DisplayDeviceMode } from "./DisplayDeviceMode.ts";
 *
 * // Test new mode without permanent application
 * const flags = DisplayDeviceMode.CDS_TEST | DisplayDeviceMode.CDS_FULLSCREEN;
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-changedisplaysettingsw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-enumdisplaysettingsw
 */
export enum DisplayDeviceMode {
    /** Writes the new display settings to the registry, making them permanent. */
    CDS_UPDATEREGISTRY = 0x00000001,

    /** Tests whether the specified display settings are available without actually changing them. */
    CDS_TEST = 0x00000002,

    /** The setting is only effective when using full-screen mode (temporary change). */
    CDS_FULLSCREEN = 0x00000004,

    /** The setting is saved to the global registry (affects all users). Requires administrator privileges. */
    CDS_GLOBAL = 0x00000008,

    /** Sets the specified monitor as the primary display. */
    CDS_SET_PRIMARY = 0x00000010,

    /** Resets the display settings to the registry defaults. */
    CDS_RESET = 0x40000000,

    /**
     * Specifies that the `lParam` of `ChangeDisplaySettingsEx` contains
     * rectangle coordinates of the display area (related to multiple monitors).
     */
    CDS_SETRECT = 0x20000000,

    /** Changes settings only for the current session; the registry remains unchanged. */
    CDS_NORESET = 0x10000000,
}
