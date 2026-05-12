/**
 * @module
 * System event flag constants (Event Flags).
 *
 * These constants are used in the Windows Accessibility / UI Automation API,
 * identifying system-wide events (such as sound, focus change, menu operations, etc.).
 *
 * Typically used with the {@link https://learn.microsoft.com/windows/win32/winauto/seteventhook | SetWinEventHook}
 * function to register event hooks.
 *
 * ## Usage Example
 * ```ts
 * import { EventFlags } from "./EventFlags.ts";
 *
 * // Listen for foreground window switch events
 * // SetWinEventHook(EventFlags.EVENT_SYSTEM_FOREGROUND, ...)
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winauto/event-constants
 * @see https://learn.microsoft.com/windows/win32/winauto/seteventhook
 */
export enum EventFlags {
    /** System sound event. */
    EVENT_SYSTEM_SOUND = 0x0001,

    /** System alert event. */
    EVENT_SYSTEM_ALERT = 0x0002,

    /** Foreground window change event. */
    EVENT_SYSTEM_FOREGROUND = 0x0003,

    /** System menu start event. */
    EVENT_SYSTEM_MENUSTART = 0x0004,

    /** System menu end event. */
    EVENT_SYSTEM_MENUEND = 0x0005,

    /** Popup menu start event. */
    EVENT_SYSTEM_MENUPOPUPSTART = 0x0006,

    /** Popup menu end event. */
    EVENT_SYSTEM_MENUPOPUPEND = 0x0007,

    /** Mouse capture start event. */
    EVENT_SYSTEM_CAPTURESTART = 0x0008,

    /** Mouse capture end event. */
    EVENT_SYSTEM_CAPTUREEND = 0x0009,

    /** Window move or resize start event. */
    EVENT_SYSTEM_MOVESIZESTART = 0x000A,

    /** Window move or resize end event. */
    EVENT_SYSTEM_MOVESIZEEND = 0x000B,

    /** Context help start event. */
    EVENT_SYSTEM_CONTEXTHELPSTART = 0x000C,

    /** Context help end event. */
    EVENT_SYSTEM_CONTEXTHELPEND = 0x000D,

    /** Drag-and-drop operation start event. */
    EVENT_SYSTEM_DRAGDROPSTART = 0x000E,

    /** Drag-and-drop operation end event. */
    EVENT_SYSTEM_DRAGDROPEND = 0x000F,

    /** Dialog start event. */
    EVENT_SYSTEM_DIALOGSTART = 0x0010,

    /** Dialog end event. */
    EVENT_SYSTEM_DIALOGEND = 0x0011,

    /** Scrollbar scroll start event. */
    EVENT_SYSTEM_SCROLLINGSTART = 0x0012,

    /** Scrollbar scroll end event. */
    EVENT_SYSTEM_SCROLLINGEND = 0x0013,

    /** Window switch start event (Alt+Tab). */
    EVENT_SYSTEM_SWITCHSTART = 0x0014,

    /** Window switch end event (Alt+Tab). */
    EVENT_SYSTEM_SWITCHEND = 0x0015,

    /** Window minimize start event. */
    EVENT_SYSTEM_MINIMIZESTART = 0x0016,

    /** Window minimize end event. */
    EVENT_SYSTEM_MINIMIZEEND = 0x0017,
}
