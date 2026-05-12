/**
 * @module
 * System metric constants (System Metrics).
 *
 * Used in the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics | GetSystemMetrics}
 * function to retrieve Windows system configuration and display information.
 *
 * ## Usage Example
 * ```ts
 * import { SystemMetrics } from "./SystemMetrics.ts";
 *
 * const cxScreen = libSymbols.getSystemMetrics(SystemMetrics.SM_CXSCREEN);
 * const cyScreen = libSymbols.getSystemMetrics(SystemMetrics.SM_CYSCREEN);
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getsystemmetrics
 * @see https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues
 */
export enum SystemMetrics {
    /** Primary display screen width (pixels). */
    SM_CXSCREEN = 0,
    /** Primary display screen height (pixels). */
    SM_CYSCREEN = 1,
    /** Width of the arrow bitmap on a vertical scroll bar (pixels). */
    SM_CXVSCROLL = 2,
    /** Height of the arrow bitmap on a horizontal scroll bar (pixels). */
    SM_CYHSCROLL = 3,
    /** Window title bar height (pixels). */
    SM_CYCAPTION = 4,
    /** Window border width (pixels); resizable windows use SM_CXSIZEFRAME. */
    SM_CXBORDER = 5,
    /** Window border height (pixels); resizable windows use SM_CYSIZEFRAME. */
    SM_CYBORDER = 6,
    /**
     * Border width of a window with a title bar but not resizable (pixels).
     * `SM_CXFIXEDFRAME` has the same value as `SM_CXSIZEFRAME`.
     */
    SM_CXFIXEDFRAME = 7,
    /**
     * Border height of a window with a title bar but not resizable (pixels).
     * `SM_CYFIXEDFRAME` has the same value as `SM_CYSIZEFRAME`.
     */
    SM_CYFIXEDFRAME = 8,
    /** Height of the scroll thumb in a vertical scroll bar (pixels). */
    SM_CYVTHUMB = 9,
    /** Width of the scroll thumb in a horizontal scroll bar (pixels). */
    SM_CXHTHUMB = 10,
    /** Default icon width (pixels). */
    SM_CXICON = 11,
    /** Default icon height (pixels). */
    SM_CYICON = 12,
    /** Default cursor width (pixels). */
    SM_CXCURSOR = 13,
    /** Default cursor height (pixels). */
    SM_CYCURSOR = 14,
    /** Menu bar height (pixels). */
    SM_CYMENU = 15,
    /** Full-screen window client area width (pixels). */
    SM_CXFULLSCREEN = 16,
    /** Full-screen window client area height (pixels). */
    SM_CYFULLSCREEN = 17,
    /** Height of the Kanji window for Japanese systems (pixels). */
    SM_CYKANJIWINDOW = 18,
    /** Whether a mouse is present (nonzero = present). */
    SM_MOUSEPRESENT = 19,
    /** Height of the vertical scroll bar (pixels). */
    SM_CYVSCROLL = 20,
    /** Width of the horizontal scroll bar (pixels). */
    SM_CXHSCROLL = 21,
    /** Whether the system is a debug version (nonzero = yes). */
    SM_DEBUG = 22,
    /** Whether mouse buttons are swapped (nonzero = swapped). */
    SM_SWAPBUTTON = 23,
    /** Window minimum width (pixels). */
    SM_CXMIN = 28,
    /** Window minimum height (pixels). */
    SM_CYMIN = 29,
    /** Width of buttons in the title bar (pixels). */
    SM_CXSIZE = 30,
    /** Height of buttons in the title bar (pixels). */
    SM_CYSIZE = 31,
    /** Border width of a resizable window (pixels); alias `SM_CXSIZEFRAME`. */
    SM_CXFRAME = 32,
    /** Border height of a resizable window (pixels); alias `SM_CYSIZEFRAME`. */
    SM_CYFRAME = 33,
    /** Minimum tracking width when dragging a window (pixels). */
    SM_CXMINTRACK = 34,
    /** Minimum tracking height when dragging a window (pixels). */
    SM_CYMINTRACK = 35,
    /** Width of the double-click effective area (pixels). */
    SM_CXDOUBLECLK = 36,
    /** Height of the double-click effective area (pixels). */
    SM_CYDOUBLECLK = 37,
    /** Horizontal icon spacing (pixels). */
    SM_CXICONSPACING = 38,
    /** Vertical icon spacing (pixels). */
    SM_CYICONSPACING = 39,
    /** Drop-down menu alignment: 0 = left-aligned, nonzero = right-aligned. */
    SM_MENUDROPALIGNMENT = 40,
    /** Whether Microsoft Windows for Pen Computing extensions exist (nonzero = yes). */
    SM_PENWINDOWS = 41,
    /** Whether the system supports DBCS (nonzero = yes). */
    SM_DBCSENABLED = 42,
    /** Number of mouse buttons. */
    SM_CMOUSEBUTTONS = 43,
    /** Fixed window border width (pixels); same as `SM_CXFRAME`. */
    SM_CXSIZEFRAME = 32,
    /** Fixed window border height (pixels); same as `SM_CYFRAME`. */
    SM_CYSIZEFRAME = 33,
    /** Window edge border width (pixels). */
    SM_CXEDGE = 45,
    /** Window edge border height (pixels). */
    SM_CYEDGE = 46,
    /** Horizontal spacing when arranging minimized windows (pixels). */
    SM_CXMINSPACING = 47,
    /** Vertical spacing when arranging minimized windows (pixels). */
    SM_CYMINSPACING = 48,
    /** Small icon width (pixels). */
    SM_CXSMICON = 49,
    /** Small icon height (pixels). */
    SM_CYSMICON = 50,
    /** Small caption height (pixels). */
    SM_CYSMCAPTION = 51,
    /** Small caption button width (pixels). */
    SM_CXSMSIZE = 52,
    /** Small caption button height (pixels). */
    SM_CYSMSIZE = 53,
    /** Menu bar button width (pixels). */
    SM_CXMENUSIZE = 54,
    /** Menu bar button height (pixels). */
    SM_CYMENUSIZE = 55,
    /** Whether the system has set the arrange flag for minimized windows. */
    SM_ARRANGE = 56,
    /** Minimized window width (pixels). */
    SM_CXMINIMIZED = 57,
    /** Minimized window height (pixels). */
    SM_CYMINIMIZED = 58,
    /** Maximum tracking width for a maximized window (pixels). */
    SM_CXMAXTRACK = 59,
    /** Maximum tracking height for a maximized window (pixels). */
    SM_CYMAXTRACK = 60,
    /** Maximized window width (pixels). */
    SM_CXMAXIMIZED = 61,
    /** Maximized window height (pixels). */
    SM_CYMAXIMIZED = 62,
    /** Whether a network connection is present (nonzero = yes). */
    SM_NETWORK = 63,
    /** System startup mode: 0 = normal, 1 = safe mode, 2 = safe mode with networking. */
    SM_CLEANBOOT = 67,
    /** Horizontal area width when dragging a window (pixels). */
    SM_CXDRAG = 68,
    /** Vertical area height when dragging a window (pixels). */
    SM_CYDRAG = 69,
    /** Whether the system has sound assistance enabled (nonzero = yes). */
    SM_SHOWSOUNDS = 70,
    /** Menu checkmark bitmap width (pixels). */
    SM_CXMENUCHECK = 71,
    /** Menu checkmark bitmap height (pixels). */
    SM_CYMENUCHECK = 72,
    /** Whether the system is a slow machine (nonzero = yes). */
    SM_SLOWMACHINE = 73,
    /** Whether Middle Eastern language support is enabled (nonzero = yes). */
    SM_MIDEASTENABLED = 74,
    /** Whether a vertical mouse wheel is installed (nonzero = yes). */
    SM_MOUSEWHEELPRESENT = 75,
    /** Virtual screen top-left X coordinate (pixels). */
    SM_XVIRTUALSCREEN = 76,
    /** Virtual screen top-left Y coordinate (pixels). */
    SM_YVIRTUALSCREEN = 77,
    /** Virtual screen width (pixels). */
    SM_CXVIRTUALSCREEN = 78,
    /** Virtual screen height (pixels). */
    SM_CYVIRTUALSCREEN = 79,
    /** Number of displays. */
    SM_CMONITORS = 80,
    /** Whether all displays have the same color format. */
    SM_SAMEDISPLAYFORMAT = 81,
    /** Whether the Input Method Editor (IME) is enabled (nonzero = yes). */
    SM_IMMENABLED = 82,
    /** Focus border width (pixels). */
    SM_CXFOCUSBORDER = 83,
    /** Focus border height (pixels). */
    SM_CYFOCUSBORDER = 84,
    /** Whether the system supports Tablet PC functionality (nonzero = yes). */
    SM_TABLETPC = 86,
    /** Whether the system supports Media Center (nonzero = yes). */
    SM_MEDIACENTER = 87,
    /** Whether the system is Windows Starter Edition (nonzero = yes). */
    SM_STARTER = 88,
    /** Whether the system is Windows Server R2 (nonzero = yes). */
    SM_SERVERR2 = 89,
    /** Whether a horizontal mouse wheel is installed (nonzero = yes). */
    SM_MOUSEHORIZONTALWHEELPRESENT = 91,
    /** Padded border width (pixels), used to reserve space in the Desktop Window Manager. */
    SM_CXPADDEDBORDER = 92,
    /** Whether the system supports digitizer input (touch/pen) (nonzero = yes). */
    SM_DIGITIZER = 94,
    /** Maximum number of simultaneous touch points. */
    SM_MAXIMUMTOUCHES = 95,
    /** Whether the system is in a remote session (nonzero = yes). */
    SM_REMOTESESSION = 0x1000,
    /** Whether the system is shutting down (nonzero = yes). */
    SM_SHUTTINGDOWN = 0x2000,
    /** Whether the system is being remotely controlled (nonzero = yes). */
    SM_REMOTECONTROL = 0x2001,
    /** Whether the system is in convertible slate mode (nonzero = yes). */
    SM_CONVERTIBLESLATEMODE = 0x2003,
    /** Whether the system is docked (nonzero = yes). */
    SM_SYSTEMDOCKED = 0x2004,
}
