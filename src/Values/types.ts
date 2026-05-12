/** @module @brass/window/values/types
 *
 * Windows base type definitions.
 *
 * Defines commonly used handle and base type aliases from the Windows API,
 * used for TypeScript mapping of
 * {@link https://learn.microsoft.com/windows/win32/learnwin32/what-is-a-handle | Win32 handles}.
 *
 * These types are all mapped to `Deno.PointerValue` or `number` for FFI function signatures.
 *
 * ## Usage Example
 * ```ts
 * import type { HWND, HINSTANCE } from "./types.ts";
 *
 * function createWindow(): HWND { ... }
 * ```
 *
 * @see https://learn.microsoft.com/windows/win32/learnwin32/what-is-a-handle
 * @see https://docs.deno.com/api/deno/~/Deno.PointerValue
 */

/** Window handle (`HWND`). Identifies a window instance. */
export type HWND = Deno.PointerValue;

/** Instance handle (`HINSTANCE`). Identifies a module instance loaded into the process address space. */
export type HINSTANCE = Deno.PointerValue;

/** Module handle (`HMODULE`). Identifies a loaded module (EXE or DLL). */
export type HMODULE = Deno.PointerValue;

/** Cursor handle (`HCURSOR`). Identifies a system or custom cursor. */
export type HCURSOR = Deno.PointerValue;

/** Icon handle (`HICON`). Identifies a system or custom icon. */
export type HICON = Deno.PointerValue;

/** Device context handle (`HDC`). Identifies a GDI device context. */
export type HDC = Deno.PointerValue;

/** Menu handle (`HMENU`). Identifies a menu resource. */
export type HMENU = Deno.PointerValue;

/** Atom type (`ATOM`). Used for system resource identifiers such as string tables. */
export type ATOM = number;

/** Message result (`LRESULT`). Returned by the window procedure. */
export type LRESULT = number;

/** Window procedure function pointer (`WNDPROC`). */
export type WNDPROC = Deno.PointerValue;

/** Callback function pointer (`CALLBACK`). Generic function pointer type. */
export type CallbackPtr = Deno.PointerValue;
