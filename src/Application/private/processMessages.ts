/** @module @brass/window/process-messages
 *
 * Non-blocking Windows message loop implementation.
 *
 * Uses PeekMessage + setTimeout to avoid blocking the Deno event loop,
 * serving as the core of the application message pump.
 *
 * @see https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues
 */

import { libSymbols } from "../../ffi.ts";
import { Values } from "../../Values/Values.ts";

/**
 * Non-blocking Windows message loop.
 *
 * @since 0.0.27
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-peekmessagew
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-translatemessage
 * @see https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-dispatchmessage
 *
 * Uses PeekMessage (PM_REMOVE) for non-blocking polling,
 * avoiding blocking the Deno event loop.
 *
 * When no messages are available, yields CPU via setTimeout(1ms)
 */
export function processMessages(): void {
    // MSG 结构体 (x64, 48 bytes):
    //   offset 0: HWND    (8 bytes)
    //   offset 8: UINT    (4 bytes) — message
    //   offset 12: WPARAM (8 bytes)
    //   offset 20: LPARAM (8 bytes)
    //   offset 28: DWORD  (4 bytes) — time
    //   offset 32: POINT  (8 bytes) — pt
    const msg = new Uint8Array(48);
    const view = new DataView(msg.buffer);
    const msgPtr = Deno.UnsafePointer.of(msg);
    const poll = () => {
        let hasMessage = true;
        while (hasMessage) {
            hasMessage = libSymbols.peekMessage(msgPtr, null, 0, 0, Values.PeekMessage.PM_REMOVE) as boolean;
            if (hasMessage) {
                const message = view.getUint32(8, true);
                if (message === Values.WindowMessage.WM_QUIT) {
                    hasMessage = false;
                    return;
                }
                libSymbols.translateMessage(msgPtr);
                libSymbols.dispatchMessage(msgPtr);
            }
        }
        setTimeout(poll, 1);
    };
    poll();
};