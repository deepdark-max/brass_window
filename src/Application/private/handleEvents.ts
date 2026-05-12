/** @module @brass/window/handle-events
 *
 * Dispatching of Win32 window messages to TypeScript events.
 *
 * Converts raw Windows messages received by the window procedure (WM_SIZE, WM_MOVE, WM_KEYDOWN, etc.)
 * into type-safe events and dispatches them to the corresponding Window instance.
 *
 * @see https://learn.microsoft.com/windows/win32/learnwin32/window-messages
 */

import { setEventCallback, libSymbols, vkToChar, isShiftDown, isCtrlDown, isAltDown, getImeString, GCS_COMPSTR, GCS_RESULTSTR } from "../../ffi.ts";
import { allWindows } from "../Application.ts";
import { Values } from "../../Values/Values.ts";

const rectBuf = new Uint8Array(16);
const rectView = new DataView(rectBuf.buffer);
const xBuf = new Uint8Array(4);
const yBuf = new Uint8Array(4);
const xView = new DataView(xBuf.buffer);
const yView = new DataView(yBuf.buffer);

/**
 * Sign-extends a 16-bit unsigned value to a signed 16-bit integer.
 *
 * Coordinates in Win32 messages are typically stored as 16-bit signed values in the low/high words of LPARAM,
 * but are read as unsigned in JavaScript. This function performs sign extension.
 *
 * @param v - The 16-bit unsigned integer value to extend (0–65535).
 * @returns The corresponding 16-bit signed integer value (-32768–32767).
 *
 * @example
 * ```ts
 * signExtend16(65535); // => -1
 * signExtend16(32768); // => -32768
 * signExtend16(100);   // => 100
 * ```
 */
function signExtend16(v: number): number {
    return v > 32767 ? v - 65536 : v;
}

/**
 * Registers a global window procedure callback to dispatch Win32 messages to the corresponding Window instance.
 *
 * Sets up a unified callback via `setEventCallback` that receives the native window handle, message type, wParam, and lParam,
 * and calls the corresponding Window instance's `emit` method based on the message type.
 *
 * Supported messages include: window size/position changes, focus, mouse, keyboard, IME input, etc.
 *
 * @see setEventCallback
 * @see https://learn.microsoft.com/windows/win32/winmsg/window-procedures
 */
export function handleEvents() {
    setEventCallback((hwnd, umsg, wParam, lParam) => {
        const window = allWindows.get(Deno.UnsafePointer.value(hwnd));
        if (!window) return;
        switch (umsg) {
            case Values.WindowMessage.WM_SIZE: {
                const w = Number(lParam & 0xFFFFn);
                const h = Number((lParam >> 16n) & 0xFFFFn);
                window.width = w;
                window.height = h;
                const sizing = Number(wParam);
                if (sizing === 1) {
                    window.state.isMinimized = true;
                    window.emit("minimize", undefined);
                } else if (sizing === 2) {
                    window.state.isMaximized = true;
                    window.state.isMinimized = false;
                    window.emit("maximize", undefined);
                } else if (sizing === 0) {
                    if (window.state.isMinimized || window.state.isMaximized) {
                        window.state.isMinimized = false;
                        window.state.isMaximized = false;
                        window.emit("restore", undefined);
                    }
                    window.emit("resize", { width: w, height: h });
                }
                break;
            }


            case Values.WindowMessage.WM_MOVE: {
                const x = signExtend16(Number(lParam & 0xFFFFn));
                const y = signExtend16(Number((lParam >> 16n) & 0xFFFFn));
                window.x = x;
                window.y = y;
                window.emit("move", { x, y });
                break;
            }


            case Values.WindowMessage.WM_CLOSE:
                window.emit("close", undefined);
                break;


            case Values.WindowMessage.WM_SETFOCUS:
                window.emit("focus", undefined);
                break;


            case Values.WindowMessage.WM_KILLFOCUS:
                window.emit("blur", undefined);
                break;


            case Values.WindowMessage.WM_DESTROY:
                window.emit("destroy", undefined);
                break;


            case Values.WindowMessage.WM_MOUSEWHEEL: {
                const raw = Number((wParam >> 16n) & 0xFFFFn);
                const delta = raw > 32767 ? raw - 65536 : raw;
                window.emit("mousewheel", { delta });
                break;
            }


            case Values.WindowMessage.WM_LBUTTONDOWN:
                window.emit("click", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 0 });
                break;
            case Values.WindowMessage.WM_RBUTTONDOWN:
                window.emit("click", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 1 });
                break;
            case Values.WindowMessage.WM_MBUTTONDOWN:
                window.emit("click", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 2 });
                break;
            case Values.WindowMessage.WM_XBUTTONDOWN:
                window.emit("click", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: Number((wParam >> 16n) & 0xFFFFn) === 1 ? 3 : 4 });
                break;


            case Values.WindowMessage.WM_LBUTTONDBLCLK:
                window.emit("dblclick", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 0 });
                break;
            case Values.WindowMessage.WM_RBUTTONDBLCLK:
                window.emit("dblclick", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 1 });
                break;
            case Values.WindowMessage.WM_MBUTTONDBLCLK:
                window.emit("dblclick", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: 2 });
                break;
            case Values.WindowMessage.WM_XBUTTONDBLCLK:
                window.emit("dblclick", { x: Number(lParam & 0xFFFFn), y: Number((lParam >> 16n) & 0xFFFFn), button: Number((wParam >> 16n) & 0xFFFFn) === 1 ? 3 : 4 });
                break;


            case Values.WindowMessage.WM_MOUSEMOVE:
                if (window.state.isLocked) {
                    const clientX = signExtend16(Number(lParam & 0xFFFFn));
                    const clientY = signExtend16(Number((lParam >> 16n) & 0xFFFFn));
                    const rectPtr = Deno.UnsafePointer.of(rectBuf);
                    libSymbols.getClientRect(hwnd, rectPtr);
                    const left = rectView.getInt32(0, true);
                    const top = rectView.getInt32(4, true);
                    const right = rectView.getInt32(8, true);
                    const bottom = rectView.getInt32(12, true);
                    const cx = Math.floor((left + right) / 2);
                    const cy = Math.floor((top + bottom) / 2);
                    if (clientX === cx && clientY === cy) return;
                    const deltaX = clientX - cx;
                    const deltaY = clientY - cy;
                    xView.setInt32(0, cx, true);
                    yView.setInt32(0, cy, true);
                    libSymbols.clientToScreen(hwnd, Deno.UnsafePointer.of(xBuf), Deno.UnsafePointer.of(yBuf));
                    const screenCx = xView.getInt32(0, true);
                    const screenCy = yView.getInt32(0, true);
                    libSymbols.setCursorPos(screenCx, screenCy);
                    window.emit("mouselock", { deltaX, deltaY });
                } else {
                    const clientX = signExtend16(Number(lParam & 0xFFFFn));
                    const clientY = signExtend16(Number((lParam >> 16n) & 0xFFFFn));
                    window.emit("mousemove", { x: clientX, y: clientY });
                }
                break;


            case Values.WindowMessage.WM_KEYDOWN:
            case Values.WindowMessage.WM_KEYUP:
            case Values.WindowMessage.WM_SYSKEYDOWN:
            case Values.WindowMessage.WM_SYSKEYUP: {
                const code = Number(wParam);
                const repeat = Number(lParam & 0xFFFFn);
                const scanCode = Number((lParam >> 16n) & 0xFFn);
                const extended = ((lParam >> 24n) & 1n) === 1n;
                const altKey = ((lParam >> 29n) & 1n) === 1n;
                const eventName = umsg === Values.WindowMessage.WM_KEYDOWN || umsg === Values.WindowMessage.WM_SYSKEYDOWN
                    ? "keydown" : "keyup";
                const char = vkToChar(code);
                window.emit(eventName, {
                    code,
                    char,
                    repeat,
                    scanCode,
                    extended,
                    altKey,
                    ctrlKey: isCtrlDown(),
                    shiftKey: isShiftDown(),
                });
                break;
            }

            
            case Values.WindowMessage.WM_CHAR:
            case Values.WindowMessage.WM_SYSCHAR: {
                const char = String.fromCharCode(Number(wParam));
                const repeat = Number(lParam & 0xFFFFn);
                const scanCode = Number((lParam >> 16n) & 0xFFn);
                const extended = ((lParam >> 24n) & 1n) === 1n;
                const altKey = ((lParam >> 29n) & 1n) === 1n;
                window.emit("keypress", {
                    char,
                    repeat,
                    scanCode,
                    extended,
                    altKey,
                    ctrlKey: isCtrlDown(),
                    shiftKey: isShiftDown(),
                });
                break;
            }

            case Values.WindowMessage.WM_IME_STARTCOMPOSITION:
                window.emit("compositionstart", undefined);
                break;

            case Values.WindowMessage.WM_IME_COMPOSITION: {
                if (Number(lParam) & GCS_COMPSTR) {
                    const data = getImeString(hwnd, GCS_COMPSTR);
                    if (data) window.emit("compositionupdate", { data });
                }
                break;
            }

            case Values.WindowMessage.WM_IME_ENDCOMPOSITION: {
                const data = getImeString(hwnd, GCS_RESULTSTR);
                window.emit("compositionend", { data });
                break;
            }
        }
    });
}