/**
 * @module
 * Virtual-key code constants (Virtual-Key Codes, `VK_*`).
 *
 * Used to identify keyboard input, passed in the `wParam` parameter of messages such as
 * {@link https://learn.microsoft.com/windows/win32/inputdev/wm-keydown | WM_KEYDOWN} and
 * {@link https://learn.microsoft.com/windows/win32/inputdev/wm-keyup | WM_KEYUP}.
 *
 * Refer to the official documentation for the complete list of virtual-key codes.
 *
 * ## Usage Example
 * ```ts
 * import { VirtualKeys } from "./VirtualKeys.ts";
 *
 * // Handle key presses in the window procedure
 * if (msg === WindowMessage.WM_KEYDOWN) {
 *   switch (wParam) {
 *     case VirtualKeys.VK_ESCAPE:
 *       // Escape pressed
 *       break;
 *     case VirtualKeys.VK_F11:
 *       // F11 pressed (toggle fullscreen)
 *       break;
 *   }
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/inputdev/virtual-key-codes
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getkeystate
 */
export enum VirtualKeys {
    // ==================== Mouse Keys ====================

    /** Left mouse button. */
    VK_LBUTTON = 0x01,

    /** Right mouse button. */
    VK_RBUTTON = 0x02,

    /** Middle mouse button. */
    VK_MBUTTON = 0x04,

    /** X1 mouse button. */
    VK_XBUTTON1 = 0x05,

    /** X2 mouse button. */
    VK_XBUTTON2 = 0x06,

    // ==================== Control Keys ====================

    /** BACKSPACE key. */
    VK_BACK = 0x08,

    /** TAB key. */
    VK_TAB = 0x09,

    /** CLEAR key. */
    VK_CLEAR = 0x0C,

    /** ENTER/RETURN key. */
    VK_RETURN = 0x0D,

    /** SHIFT key. */
    VK_SHIFT = 0x10,

    /** CTRL key. */
    VK_CONTROL = 0x11,

    /** ALT key (menu key). */
    VK_MENU = 0x12,

    /** PAUSE key. */
    VK_PAUSE = 0x13,

    /** CAPS LOCK key. */
    VK_CAPITAL = 0x14,

    /** ESCAPE key. */
    VK_ESCAPE = 0x1B,

    /** SPACEBAR key. */
    VK_SPACE = 0x20,

    // ==================== Edit Keys ====================

    /** PAGE UP / PRIOR key. */
    VK_PRIOR = 0x21,

    /** PAGE DOWN / NEXT key. */
    VK_NEXT = 0x22,

    /** END key. */
    VK_END = 0x23,

    /** HOME key. */
    VK_HOME = 0x24,

    /** LEFT ARROW key. */
    VK_LEFT = 0x25,

    /** UP ARROW key. */
    VK_UP = 0x26,

    /** RIGHT ARROW key. */
    VK_RIGHT = 0x27,

    /** DOWN ARROW key. */
    VK_DOWN = 0x28,

    /** SELECT key. */
    VK_SELECT = 0x29,

    /** PRINT key. */
    VK_PRINT = 0x2A,

    /** EXECUTE key. */
    VK_EXECUTE = 0x2B,

    /** PRINT SCREEN key. */
    VK_SNAPSHOT = 0x2C,

    /** INSERT key. */
    VK_INSERT = 0x2D,

    /** DELETE key. */
    VK_DELETE = 0x2E,

    /** HELP key. */
    VK_HELP = 0x2F,

    // ==================== Number Keys ====================

    /** Main keyboard 0 key. */
    VK_0 = 0x30,

    /** Main keyboard 1 key. */
    VK_1 = 0x31,

    /** Main keyboard 2 key. */
    VK_2 = 0x32,

    /** Main keyboard 3 key. */
    VK_3 = 0x33,

    /** Main keyboard 4 key. */
    VK_4 = 0x34,

    /** Main keyboard 5 key. */
    VK_5 = 0x35,

    /** Main keyboard 6 key. */
    VK_6 = 0x36,

    /** Main keyboard 7 key. */
    VK_7 = 0x37,

    /** Main keyboard 8 key. */
    VK_8 = 0x38,

    /** Main keyboard 9 key. */
    VK_9 = 0x39,

    // ==================== Letter Keys ====================

    /** A key. */
    VK_A = 0x41,

    /** B key. */
    VK_B = 0x42,

    /** C key. */
    VK_C = 0x43,

    /** D key. */
    VK_D = 0x44,

    /** E key. */
    VK_E = 0x45,

    /** F key. */
    VK_F = 0x46,

    /** G key. */
    VK_G = 0x47,

    /** H key. */
    VK_H = 0x48,

    /** I key. */
    VK_I = 0x49,

    /** J key. */
    VK_J = 0x4A,

    /** K key. */
    VK_K = 0x4B,

    /** L key. */
    VK_L = 0x4C,

    /** M key. */
    VK_M = 0x4D,

    /** N key. */
    VK_N = 0x4E,

    /** O key. */
    VK_O = 0x4F,

    /** P key. */
    VK_P = 0x50,

    /** Q key. */
    VK_Q = 0x51,

    /** R key. */
    VK_R = 0x52,

    /** S key. */
    VK_S = 0x53,

    /** T key. */
    VK_T = 0x54,

    /** U key. */
    VK_U = 0x55,

    /** V key. */
    VK_V = 0x56,

    /** W key. */
    VK_W = 0x57,

    /** X key. */
    VK_X = 0x58,

    /** Y key. */
    VK_Y = 0x59,

    /** Z key. */
    VK_Z = 0x5A,

    // ==================== Windows Keys ====================

    /** Left Windows key. */
    VK_LWIN = 0x5B,

    /** Right Windows key. */
    VK_RWIN = 0x5C,

    /** Application key (context menu). */
    VK_APPS = 0x5D,

    // ==================== Numpad Keys ====================

    /** Numpad 0 key. */
    VK_NUMPAD0 = 0x60,

    /** Numpad 1 key. */
    VK_NUMPAD1 = 0x61,

    /** Numpad 2 key. */
    VK_NUMPAD2 = 0x62,

    /** Numpad 3 key. */
    VK_NUMPAD3 = 0x63,

    /** Numpad 4 key. */
    VK_NUMPAD4 = 0x64,

    /** Numpad 5 key. */
    VK_NUMPAD5 = 0x65,

    /** Numpad 6 key. */
    VK_NUMPAD6 = 0x66,

    /** Numpad 7 key. */
    VK_NUMPAD7 = 0x67,

    /** Numpad 8 key. */
    VK_NUMPAD8 = 0x68,

    /** Numpad 9 key. */
    VK_NUMPAD9 = 0x69,

    /** Multiply key (*). */
    VK_MULTIPLY = 0x6A,

    /** Add key (+). */
    VK_ADD = 0x6B,

    /** Separator key. */
    VK_SEPARATOR = 0x6C,

    /** Subtract key (-). */
    VK_SUBTRACT = 0x6D,

    /** Decimal point key (.). */
    VK_DECIMAL = 0x6E,

    /** Divide key (/). */
    VK_DIVIDE = 0x6F,

    // ==================== Function Keys F1-F12 ====================

    /** F1 key. */
    VK_F1 = 0x70,

    /** F2 key. */
    VK_F2 = 0x71,

    /** F3 key. */
    VK_F3 = 0x72,

    /** F4 key. */
    VK_F4 = 0x73,

    /** F5 key. */
    VK_F5 = 0x74,

    /** F6 key. */
    VK_F6 = 0x75,

    /** F7 key. */
    VK_F7 = 0x76,

    /** F8 key. */
    VK_F8 = 0x77,

    /** F9 key. */
    VK_F9 = 0x78,

    /** F10 key. */
    VK_F10 = 0x79,

    /** F11 key. */
    VK_F11 = 0x7A,

    /** F12 key. */
    VK_F12 = 0x7B,

    // ==================== State Keys ====================

    /** NUMLOCK key. */
    VK_NUMLOCK = 0x90,

    /** SCROLL LOCK key. */
    VK_SCROLL = 0x91,

    // ==================== Left/Right Distinction Keys ====================

    /** Left SHIFT key. */
    VK_LSHIFT = 0xA0,

    /** Right SHIFT key. */
    VK_RSHIFT = 0xA1,

    /** Left CONTROL key. */
    VK_LCONTROL = 0xA2,

    /** Right CONTROL key. */
    VK_RCONTROL = 0xA3,

    /** Left ALT key. */
    VK_LMENU = 0xA4,

    /** Right ALT key. */
    VK_RMENU = 0xA5,

    // ==================== OEM Keys (Punctuation) ====================

    /** OEM `;:` key (semicolon/colon). */
    VK_OEM_1 = 0xBA,

    /** OEM `=+` key (equals/plus). */
    VK_OEM_PLUS = 0xBB,

    /** OEM `,<` key (comma/less than). */
    VK_OEM_COMMA = 0xBC,

    /** OEM `-_` key (minus/underscore). */
    VK_OEM_MINUS = 0xBD,

    /** OEM `.>` key (period/greater than). */
    VK_OEM_PERIOD = 0xBE,

    /** OEM `/?` key (question mark/forward slash). */
    VK_OEM_2 = 0xBF,

    /** OEM `` `~ `` key (backtick/tilde). */
    VK_OEM_3 = 0xC0,

    /** OEM `[{` key (left bracket/left brace). */
    VK_OEM_4 = 0xDB,

    /** OEM `\|` key (backslash/vertical bar). */
    VK_OEM_5 = 0xDC,

    /** OEM `]}` key (right bracket/right brace). */
    VK_OEM_6 = 0xDD,

    /** OEM `'"` key (single quote/double quote). */
    VK_OEM_7 = 0xDE,

    /** OEM miscellaneous character key. */
    VK_OEM_8 = 0xDF,

    /** OEM 102 key (`\|` on non-US keyboards). */
    VK_OEM_102 = 0xE2,
}
