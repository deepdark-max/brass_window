/**
 * @module
 * Windows API structure definitions.
 *
 * Defines the TypeScript interface layouts for commonly used Win32 API structures,
 * used for FFI pointer read/write operations (via `Deno.UnsafePointerView`, etc.).
 *
 * ## Usage Example
 * ```ts
 * import type { RECT, POINT } from "./structures.ts";
 *
 * function getWindowRect(hwnd: Deno.PointerValue): RECT | null {
 *   const rect = new Uint8Array(16);
 *   if (libSymbols.getWindowRect(hwnd, Deno.UnsafePointer.of(rect))) {
 *     const view = new Deno.UnsafePointerView(Deno.UnsafePointer.of(rect));
 *     return {
 *       left: view.getInt32(0),
 *       top: view.getInt32(4),
 *       right: view.getInt32(8),
 *       bottom: view.getInt32(12),
 *     };
 *   }
 *   return null;
 * }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-rect
 * @see https://learn.microsoft.com/windows/win32/api/windef/ns-windef-point
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-msg
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-wndclassw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-minmaxinfo
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-windowpos
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-createstructw
 * @see https://learn.microsoft.com/windows/win32/api/winuser/ns-winuser-paintstruct
 */

/**
 * RECT structure — defines a rectangular area.
 *
 * Corresponds to the Win32 `tagRECT`.
 * Layout (4-byte aligned):
 * - `left`   : i32 (0)
 * - `top`    : i32 (4)
 * - `right`  : i32 (8)
 * - `bottom` : i32 (12)
 * Total size: 16 bytes.
 */
export interface RECT {
    /** The X coordinate of the left edge of the rectangle. */
    left: number;
    /** The Y coordinate of the top edge of the rectangle. */
    top: number;
    /** The X coordinate of the right edge of the rectangle. */
    right: number;
    /** The Y coordinate of the bottom edge of the rectangle. */
    bottom: number;
}

/**
 * POINT structure — defines a two-dimensional point coordinate.
 *
 * Corresponds to the Win32 `tagPOINT`.
 * Layout:
 * - `x` : i32 (0)
 * - `y` : i32 (4)
 * Total size: 8 bytes.
 */
export interface POINT {
    /** The X coordinate of the point. */
    x: number;
    /** The Y coordinate of the point. */
    y: number;
}

/**
 * MSG structure — defines message information.
 *
 * Corresponds to the Win32 `tagMSG`.
 * Layout:
 * - `hwnd`    : pointer (0, 8 bytes)
 * - `message` : u32 (8)
 * - `wParam`  : u64 (12 aligned to 16)
 * - `lParam`  : i64 (24)
 * - `time`    : u32 (32)
 * - `pt`      : POINT (36)
 * Total size: approximately 48 bytes (depends on pointer size).
 */
export interface MSG {
    /** Handle to the window that receives the message. */
    hwnd: number;
    /** Message identifier (WM_* constant). */
    message: number;
    /** Additional message information (depends on the message type). */
    wParam: number;
    /** Additional message information (depends on the message type). */
    lParam: number;
    /** The time at which the message was posted. */
    time: number;
    /** The cursor position in screen coordinates at the time the message was posted. */
    pt: POINT;
}

/**
 * WNDCLASS structure — defines window class attributes.
 *
 * Corresponds to the Win32 `tagWNDCLASSW`.
 * Layout (64-bit system):
 * - `style`         : u32 (0)
 * - `lpfnWndProc`   : pointer (4 aligned to 8)
 * - `cbClsExtra`    : i32 (16)
 * - `cbWndExtra`    : i32 (20)
 * - `hInstance`     : pointer (24)
 * - `hIcon`         : pointer (32)
 * - `hCursor`       : pointer (40)
 * - `hbrBackground` : pointer (48)
 * - `lpszMenuName`  : pointer (56)
 * - `lpszClassName` : pointer (64)
 * Total size: 72 bytes.
 */
export interface WNDCLASS {
    /** Window class style (combination of CS_* constants). */
    style: number;
    /** Window procedure function pointer. */
    lpfnWndProc: Deno.PointerValue;
    /** Class extra memory size (bytes). */
    cbClsExtra: number;
    /** Window instance extra memory size (bytes). */
    cbWndExtra: number;
    /** Instance handle that registered the window class. */
    hInstance: Deno.PointerValue;
    /** Default icon handle. */
    hIcon: Deno.PointerValue;
    /** Default cursor handle. */
    hCursor: Deno.PointerValue;
    /** Background brush handle (or system color constant + 1). */
    hbrBackground: number;
    /** Menu resource name (UTF-16 string). */
    lpszMenuName: Deno.PointerValue;
    /** Window class name (UTF-16 string). */
    lpszClassName: Deno.PointerValue;
}

/**
 * MINMAXINFO structure — defines window minimized, maximized, and restored information.
 *
 * Corresponds to the Win32 `tagMINMAXINFO`.
 * Received from {@link https://learn.microsoft.com/windows/win32/winmsg/wm-getminmaxinfo | WM_GETMINMAXINFO}.
 */
export interface MINMAXINFO {
    /** Reserved. */
    ptReserved: POINT;
    /** Maximized window size. */
    ptMaxSize: POINT;
    /** Maximized window position. */
    ptMaxPosition: POINT;
    /** Minimum tracking size (smallest window size when dragging). */
    ptMinTrackSize: POINT;
    /** Maximum tracking size (largest window size when dragging). */
    ptMaxTrackSize: POINT;
}

/**
 * WINDOWPOS structure — defines window position and Z-order information.
 *
 * Corresponds to the Win32 `tagWINDOWPOS`.
 * Received from {@link https://learn.microsoft.com/windows/win32/winmsg/wm-windowposchanging | WM_WINDOWPOSCHANGING}
 * and {@link https://learn.microsoft.com/windows/win32/winmsg/wm-windowposchanged | WM_WINDOWPOSCHANGED}.
 */
export interface WINDOWPOS {
    /** Window handle. */
    hwnd: number;
    /** Handle to the Z-order reference window. */
    hwndInsertAfter: number;
    /** Window X coordinate. */
    x: number;
    /** Window Y coordinate. */
    y: number;
    /** Window width. */
    cx: number;
    /** Window height. */
    cy: number;
    /** Position flags (combination of SWP_* constants). */
    flags: number;
}

/**
 * CREATESTRUCT structure — defines window creation parameters.
 *
 * Corresponds to the Win32 `tagCREATESTRUCTW`.
 * Received from {@link https://learn.microsoft.com/windows/win32/winmsg/wm-create | WM_CREATE}.
 */
export interface CREATESTRUCT {
    /** Creation parameters (`lpParam` of `CreateWindowEx`). */
    lpCreateParams: Deno.PointerValue;
    /** Instance handle that created the window. */
    hInstance: Deno.PointerValue;
    /** Menu handle. */
    hMenu: Deno.PointerValue;
    /** Parent or owner window handle. */
    hwndParent: number;
    /** Window height. */
    cy: number;
    /** Window width. */
    cx: number;
    /** Window Y coordinate. */
    y: number;
    /** Window X coordinate. */
    x: number;
    /** Window style (combination of WS_* constants). */
    style: number;
    /** Window name (UTF-16 string). */
    lpszName: Deno.PointerValue;
    /** Window class name (UTF-16 string). */
    lpszClass: Deno.PointerValue;
    /** Extended window style (combination of WS_EX_* constants). */
    dwExStyle: number;
}

/**
 * PAINTSTRUCT structure — defines paint information.
 *
 * Corresponds to the Win32 `tagPAINTSTRUCT`.
 * Retrieved via {@link https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-beginpaint | BeginPaint},
 * used for {@link https://learn.microsoft.com/windows/win32/gdi/wm-paint | WM_PAINT} processing.
 */
export interface PAINTSTRUCT {
    /** Device context handle for drawing. */
    hdc: number;
    /** Whether the background should be erased (non-zero indicates erase). */
    fErase: number;
    /** The rectangular area that needs to be painted. */
    rcPaint: RECT;
    /** Reserved. */
    fRestore: number;
    /** Reserved. */
    fIncUpdate: number;
    /** Reserved (32 bytes). */
    rgbReserved: Uint8Array;
}

/**
 * SIZE structure — defines dimensions.
 *
 * Corresponds to the Win32 `tagSIZE`.
 * Layout:
 * - `cx` : i32 (0)
 * - `cy` : i32 (4)
 * Total size: 8 bytes.
 */
export interface SIZE {
    /** Width. */
    cx: number;
    /** Height. */
    cy: number;
}
