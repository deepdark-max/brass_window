/**
 * @module
 * Message queue retrieval option constants (Peek Message).
 *
 * Used in the `wRemoveMsg` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-peekmessagew | PeekMessage}
 * function, controlling message processing and queue filtering.
 * PM_* controls whether messages are removed; QS_* (shifted left 16 bits) serve as PM_QS_* flags to filter queue message types.
 *
 * ## Usage Example
 * ```ts
 * import { PeekMessage } from "./PeekMessage.ts";
 *
 * // Only process input messages and remove them from the queue
 * const flags = PeekMessage.PM_REMOVE | PeekMessage.QS_INPUT;
 * libSymbols.peekMessage(msgPtr, null, 0, 0, flags);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-peekmessagew
 * @see https://learn.microsoft.com/windows/win32/winmsg/using-messages-and-message-queues
 */
export enum PeekMessage {
    // ==================== PM_* Message Removal Options ====================

    /**
     * Messages are not removed from the queue after being read.
     * Commonly used for previewing messages without consuming them.
     */
    PM_NOREMOVE = 0x0000,

    /**
     * Messages are removed from the queue after being read.
     * This is the standard message processing mode.
     */
    PM_REMOVE = 0x0001,

    /**
     * Prevents the system from releasing threads waiting for a call (prevents thread yielding).
     * Used in combination with PM_NOREMOVE or PM_REMOVE.
     */
    PM_NOYIELD = 0x0002,

    // ==================== PM_QS_* Queue Status Filter Flags (QS_* << 16) ====================

    /** Key press messages in the queue (WM_KEYDOWN, WM_KEYUP, etc.). */
    QS_KEY = 0x00010000,

    /** Mouse movement messages in the queue (WM_MOUSEMOVE). */
    QS_MOUSEMOVE = 0x00020000,

    /** Mouse button messages in the queue (WM_LBUTTONDOWN, etc.). */
    QS_MOUSEBUTTON = 0x00040000,

    /** Posted messages in the queue (posted via PostMessage). */
    QS_POSTMESSAGE = 0x00080000,

    /** Timer messages in the queue (WM_TIMER). */
    QS_TIMER = 0x00100000,

    /** Paint messages in the queue (WM_PAINT). */
    QS_PAINT = 0x00200000,

    /** Sent messages in the queue (sent via SendMessage). */
    QS_SENDMESSAGE = 0x00400000,

    /** Hotkey messages in the queue (WM_HOTKEY). */
    QS_HOTKEY = 0x00800000,

    /** All posted messages in the queue (cross-thread). */
    QS_ALLPOSTMESSAGE = 0x01000000,

    /** Raw input messages in the queue. */
    QS_RAWINPUT = 0x04000000,

    // ==================== Combined Flags ====================

    /**
     * All input messages (keyboard + mouse move + mouse button).
     * Combined value: QS_KEY | QS_MOUSEMOVE | QS_MOUSEBUTTON
     */
    QS_INPUT = 0x00070000,

    /**
     * All message types (posted, sent, input, timer, paint, hotkey).
     * Combined value: QS_SENDMESSAGE | QS_POSTMESSAGE | QS_TIMER | QS_PAINT |
     *         QS_MOUSEMOVE | QS_MOUSEBUTTON | QS_KEY | QS_HOTKEY
     */
    QS_ALLINPUT = 0x04DF0000,
}
