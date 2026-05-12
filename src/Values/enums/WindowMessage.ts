/**
 * @module
 * Window message constants (Window Messages).
 *
 * Corresponds to Win32 `WM_*` message identifiers. These constants are passed in the
 * `uMsg` parameter of the window procedure (Window Procedure), identifying the type of message
 * sent by the system or application to the window.
 *
 * ## Message Categories
 * - **Window Management** (0x0001-0x0083): Create, destroy, move, paint
 * - **Keyboard Input** (0x0100-0x0108): Key presses, character input
 * - **Mouse Input** (0x0200-0x020E): Mouse movement, buttons, wheel
 * - **Non-Client Area** (0x00A0-0x00A3): Title bar, border interaction
 * - **Control Notifications** (0x0111-0x0115): Menus, scroll bars, timers
 *
 * ## Usage Example
 * ```ts
 * import { WindowMessage } from "./WindowMessage.ts";
 *
 * // Identify message type in a callback
 * switch (msg) {
 *   case WindowMessage.WM_CLOSE:
 *     // Handle close request
 *     break;
 *   case WindowMessage.WM_SIZE:
 *     // Handle window resize
 *     break;
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues
 * @see https://learn.microsoft.com/windows/win32/winmsg/window-notifications
 */
export enum WindowMessage {
    // ==================== Window Management Messages (0x0001-0x0083) ====================

    /** Sent when a window is created. `lParam` points to `CREATESTRUCT`. */
    WM_CREATE = 0x0001,

    /** Sent when a window is destroyed. After handling this message, `PostQuitMessage` should be called. */
    WM_DESTROY = 0x0002,

    /** Sent after a window is moved. `lParam` contains the new position (HIWORD=Y, LOWORD=X). */
    WM_MOVE = 0x0003,

    /** Sent after a window's size changes. `wParam` is the `SizeMode`, `lParam` contains the new dimensions. */
    WM_SIZE = 0x0005,

    /** Sent when the window activation state changes. `wParam` is the `WindowActivation`. */
    WM_ACTIVATE = 0x0006,

    /** Sent when the window gains keyboard focus. */
    WM_SETFOCUS = 0x0007,

    /** Sent when the window loses keyboard focus. */
    WM_KILLFOCUS = 0x0008,

    /** Sent when the window's enabled/disabled state changes. `wParam` is nonzero if enabled. */
    WM_ENABLE = 0x000A,

    /** Sent when setting window text (e.g., title bar text). */
    WM_SETTEXT = 0x000C,

    /** Sent when retrieving window text content. */
    WM_GETTEXT = 0x000D,

    /** Sent when retrieving the length of window text. */
    WM_GETTEXTLENGTH = 0x000E,

    /** Sent when the window client area needs repainting. */
    WM_PAINT = 0x000F,

    /** Sent when the close button is clicked or Alt+F4 is pressed. Default behavior is `DestroyWindow`. */
    WM_CLOSE = 0x0010,

    /** Queries before the system ends a session. Return TRUE to allow, FALSE to reject. */
    WM_QUERYENDSESSION = 0x0011,

    /** Application exit message, posted by `PostQuitMessage`. */
    WM_QUIT = 0x0012,

    /** Sent when erasing the window background (usually occurs before `WM_PAINT`). */
    WM_ERASEBKGND = 0x0014,

    /** Sent when system color settings change. */
    WM_SYSCOLORCHANGE = 0x0015,

    /** Session end event (`WM_QUERYENDSESSION` has been accepted). */
    WM_ENDSESSION = 0x0016,

    /** Sent when the window display state changes. */
    WM_SHOWWINDOW = 0x0018,

    /** Sent when the application activation state changes. */
    WM_ACTIVATEAPP = 0x001C,

    /** Sent when setting the cursor shape. The cursor can be changed in this message. */
    WM_SETCURSOR = 0x0020,

    /** Retrieves minimized/maximized size information. `lParam` points to `MINMAXINFO`. */
    WM_GETMINMAXINFO = 0x0024,

    /** Sent while the window position is changing. `lParam` points to `WINDOWPOS`. */
    WM_WINDOWPOSCHANGING = 0x0046,

    /** Sent after the window position has changed. `lParam` points to `WINDOWPOS`. */
    WM_WINDOWPOSCHANGED = 0x0047,

    /** Sent when the non-client area is created. Occurs before `WM_CREATE`. */
    WM_NCCREATE = 0x0081,

    /** Sent when the non-client area is destroyed. Occurs after `WM_DESTROY`. */
    WM_NCDESTROY = 0x0082,

    /** Sent when calculating the non-client area size. Used for custom window borders. */
    WM_NCCALCSIZE = 0x0083,

    // ==================== Input Messages (0x0100-0x0108) ====================

    /** Sent when a non-system key is pressed. `wParam` is the virtual key code. */
    WM_KEYDOWN = 0x0100,

    /** Sent when a non-system key is released. `wParam` is the virtual key code. */
    WM_KEYUP = 0x0101,

    /** Character input message (converted from `WM_KEYDOWN` by `TranslateMessage`). */
    WM_CHAR = 0x0102,

    /** Sent when a system key (e.g., Alt+F4) is pressed. */
    WM_SYSKEYDOWN = 0x0104,

    /** Sent when a system key is released. */
    WM_SYSKEYUP = 0x0105,

    /** System character input message. */
    WM_SYSCHAR = 0x0106,

    /** Sent when the IME starts composition input. Typically used for showing the IME candidate window. */
    WM_IME_STARTCOMPOSITION = 0x010D,

    /** Sent when the IME ends composition input. Typically used for closing the IME candidate window. */
    WM_IME_ENDCOMPOSITION = 0x010E,

    /** Sent when the IME composition state changes. `lParam` contains change flags such as `GCS_COMPSTR` (composition content changed) or `GCS_RESULTSTR` (final commit). */
    WM_IME_COMPOSITION = 0x010F,

    // ==================== Mouse Messages (0x0200-0x020E) ====================

    /** Sent when the mouse moves within the client area. `lParam` contains cursor coordinates. */
    WM_MOUSEMOVE = 0x0200,

    /** Sent when the left mouse button is pressed in the client area. */
    WM_LBUTTONDOWN = 0x0201,

    /** Sent when the left mouse button is released in the client area. */
    WM_LBUTTONUP = 0x0202,

    /** Sent when the left mouse button is double-clicked in the client area (requires `CS_DBLCLKS` style). */
    WM_LBUTTONDBLCLK = 0x0203,

    /** Sent when the right mouse button is pressed in the client area. */
    WM_RBUTTONDOWN = 0x0204,

    /** Sent when the right mouse button is released in the client area. */
    WM_RBUTTONUP = 0x0205,

    /** Sent when the right mouse button is double-clicked in the client area. */
    WM_RBUTTONDBLCLK = 0x0206,

    /** Sent when the middle mouse button is pressed in the client area. */
    WM_MBUTTONDOWN = 0x0207,

    /** Sent when the middle mouse button is released in the client area. */
    WM_MBUTTONUP = 0x0208,

    /** Sent when the middle mouse button is double-clicked in the client area. */
    WM_MBUTTONDBLCLK = 0x0209,

    /** Sent when the mouse wheel is scrolled. `HIWORD(wParam)` is the scroll distance. */
    WM_MOUSEWHEEL = 0x020A,

    /** Sent when an X button is pressed in the client area. */
    WM_XBUTTONDOWN = 0x020B,

    /** Sent when an X button is released in the client area. */
    WM_XBUTTONUP = 0x020C,

    /** Sent when an X button is double-clicked in the client area. */
    WM_XBUTTONDBLCLK = 0x020D,

    /** Sent when the horizontal mouse wheel is scrolled. */
    WM_MOUSEHWHEEL = 0x020E,

    // ==================== Non-Client Mouse Messages (0x00A0-0x00A3) ====================

    /** Sent when the mouse moves in the non-client area (title bar, borders, etc.). */
    WM_NCMOUSEMOVE = 0x00A0,

    /** Sent when the left mouse button is pressed in the non-client area. */
    WM_NCLBUTTONDOWN = 0x00A1,

    /** Sent when the left mouse button is released in the non-client area. */
    WM_NCLBUTTONUP = 0x00A2,

    // ==================== Control Notifications (0x0111-0x0115) ====================

    /** Sent when a menu item is selected or a control sends a notification. `wParam` is the command ID. */
    WM_COMMAND = 0x0111,

    /** Sent when a system menu (window title bar context menu) item is selected. */
    WM_SYSCOMMAND = 0x0112,

    /** Sent when a timer expires. `wParam` is the timer ID. */
    WM_TIMER = 0x0113,

    /** Sent when a horizontal scroll bar event occurs. */
    WM_HSCROLL = 0x0114,

    /** Sent when a vertical scroll bar event occurs. */
    WM_VSCROLL = 0x0115,

    // ==================== Other Messages ====================

    /** Sent when setting the window icon. `wParam` is the icon type (ICON_BIG/ICON_SMALL). */
    WM_SETICON = 0x0080,

    /** Sent when retrieving the window icon. */
    WM_GETICON = 0x007F,

    /** Sent when the window enters a move or resize modal loop. */
    WM_ENTERSIZEMOVE = 0x0231,

    /** Sent when the window exits a move or resize modal loop. */
    WM_EXITSIZEMOVE = 0x0232,

    /** Sent when the mouse hovers over the client area (requires prior `TrackMouseEvent` call). */
    WM_MOUSEHOVER = 0x02A1,

    /** Sent when the mouse leaves the client area (requires prior `TrackMouseEvent` call). */
    WM_MOUSELEAVE = 0x02A3,
}
