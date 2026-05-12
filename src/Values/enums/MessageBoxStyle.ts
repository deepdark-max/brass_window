/**
 * @module
 * Message box style constants (Message Box Style, `MB_*`).
 *
 * Used in the `uType` parameter of the
 * {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-messageboxw | MessageBox}
 * function, specifying the button combination, icon style, and default button.
 *
 * These flags can be combined using bitwise OR (`|`). Select one value from each category (buttons, icon, default button, modality).
 *
 * ## Usage Example
 * ```ts
 * import { MessageBoxStyle } from "./MessageBoxStyle.ts";
 *
 * const result = libSymbols.messageBox(
 *   null,
 *   toWCstr("Do you want to save changes?"),
 *   toWCstr("Prompt"),
 *   MessageBoxStyle.MB_YESNO | MessageBoxStyle.MB_ICONQUESTION | MessageBoxStyle.MB_DEFBUTTON1
 * );
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-messageboxw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-messageboxexw
 */
export enum MessageBoxStyle {
    // ==================== Button Types ====================

    /** Message box contains an "OK" button. Default. */
    MB_OK = 0x00000000,

    /** Message box contains "OK" and "Cancel" buttons. */
    MB_OKCANCEL = 0x00000001,

    /** Message box contains "Abort", "Retry", and "Ignore" buttons. */
    MB_ABORTRETRYIGNORE = 0x00000002,

    /** Message box contains "Yes", "No", and "Cancel" buttons. */
    MB_YESNOCANCEL = 0x00000003,

    /** Message box contains "Yes" and "No" buttons. */
    MB_YESNO = 0x00000004,

    /** Message box contains "Retry" and "Cancel" buttons. */
    MB_RETRYCANCEL = 0x00000005,

    /** Message box contains "Cancel", "Retry", and "Continue" buttons. */
    MB_CANCELTRYCONTINUE = 0x00000006,

    // ==================== Icon Types ====================

    /** Stop/Error icon (✕ circle). */
    MB_ICONSTOP = 0x00000010,

    /** Question mark icon (? bubble). No longer recommended. */
    MB_ICONQUESTION = 0x00000020,

    /** Warning/Exclamation icon (! triangle). */
    MB_ICONEXCLAMATION = 0x00000030,

    /** Information icon (i bubble). */
    MB_ICONINFORMATION = 0x00000040,

    /** User-defined icon (specified via the `hIcon` parameter). */
    MB_USERICON = 0x00000080,

    // ==================== Default Buttons ====================

    /** The first button is the default button (triggered when user presses Enter). Default. */
    MB_DEFBUTTON1 = 0x00000000,

    /** The second button is the default button. */
    MB_DEFBUTTON2 = 0x00000100,

    /** The third button is the default button. */
    MB_DEFBUTTON3 = 0x00000200,

    /** The fourth button is the default button. */
    MB_DEFBUTTON4 = 0x00000300,

    // ==================== Modality & Behavior ====================

    /** The message box is set as the foreground window. */
    MB_SETFOREGROUND = 0x00010000,

    /** System-modal message box (all applications are blocked until the user responds). */
    MB_SYSTEMMODAL = 0x00001000,

    /** Task-modal message box (only blocks the current task). */
    MB_TASKMODAL = 0x00002000,

    /** Adds a Help button to the message box. */
    MB_HELP = 0x00004000,

    /** Right-aligned text. */
    MB_RIGHT = 0x00080000,

    /** Right-to-left reading order. */
    MB_RTLREADING = 0x00100000,

    /** Display only on the default desktop (for service processes). */
    MB_DEFAULT_DESKTOP_ONLY = 0x00020000,

    /** The caller is a Windows service (uses `WTSSendMessage`). */
    MB_SERVICE_NOTIFICATION = 0x00200000,

    // ==================== Return Value Constants ====================

    /** The user clicked "OK". */
    IDOK = 1,

    /** The user clicked "Cancel". */
    IDCANCEL = 2,

    /** The user clicked "Abort". */
    IDABORT = 3,

    /** The user clicked "Retry". */
    IDRETRY = 4,

    /** The user clicked "Ignore". */
    IDIGNORE = 5,

    /** The user clicked "Yes". */
    IDYES = 6,

    /** The user clicked "No". */
    IDNO = 7,

    /** The user clicked "Continue". */
    IDCONTINUE = 11,

    /** The user clicked "Help". */
    IDHELP = 9,

    /** Message box creation failed (insufficient memory, etc.). */
    IDTRYAGAIN = 10,

    /** Returned after timeout (when using `MB_TIMEDOUT`). */
    IDTIMEOUT = 32000,
}
