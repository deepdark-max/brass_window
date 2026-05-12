import { libSymbols, readWideBuf } from "../../ffi.ts";


/**
 * Operating system information.
 *
 * Provides queries for computer name, user name, system paths, and Windows version.
 * All queries are made via Win32 APIs; version information uses `RtlGetVersion` to ensure accuracy.
 *
 * @module SystemInfo.os
 * @since 0.0.27
 * @since 0.0.27
 */
export class OsInfo {
    /**
     * Gets the NetBIOS name of the computer.
     *
     * Retrieves the computer's network name via `GetComputerNameW`,
     * typically matching the "Computer name" in system properties. The name does not exceed 15 characters.
     *
     * @returns The computer name string, or an empty string on failure.
     *
     * @example
     * ```ts
     * SystemInfo.os.computerName(); // "DESKTOP-ABCD123"
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winbase/nf-winbase-getcomputernamew
     */
    static computerName(): string {
        const buf = new Uint16Array(256);
        const ptr = Deno.UnsafePointer.of(buf);
        if (libSymbols.sysComputerName(ptr, 256) > 0) {
            return readWideBuf(buf);
        }
        return "";
    }

    /**
     * Gets the user name of the currently logged-on user.
     *
     * Retrieves the user name of the logon session associated with the current thread via `GetUserNameW`.
     *
     * @returns The user name, or an empty string on failure.
     *
     * @example
     * ```ts
     * SystemInfo.os.userName(); // "admin"
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winbase/nf-winbase-getusernamew
     */
    static userName(): string {
        const buf = new Uint16Array(256);
        const ptr = Deno.UnsafePointer.of(buf);
        if (libSymbols.sysUserName(ptr, 256) > 0) {
            return readWideBuf(buf);
        }
        return "";
    }

    /**
     * Gets the path of the Windows system directory.
     *
     * Retrieves the full path of the system directory via `GetSystemDirectoryW`,
     * typically `C:\Windows\system32`. This directory contains system DLLs and executables.
     *
     * @returns The system directory path, or an empty string on failure.
     *
     * @example
     * ```ts
     * SystemInfo.os.systemDirectory(); // "C:\\Windows\\system32"
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsystemdirectoryw
     */
    static systemDirectory(): string {
        const buf = new Uint16Array(260);
        const ptr = Deno.UnsafePointer.of(buf);
        if (libSymbols.sysSystemDirectory(ptr, 260) > 0) {
            return readWideBuf(buf);
        }
        return "";
    }

    /**
     * Gets the path of the Windows directory.
     *
     * Retrieves the full path of the Windows directory via `GetWindowsDirectoryW`,
     * typically `C:\Windows`.
     *
     * @returns The Windows directory path, or an empty string on failure.
     *
     * @example
     * ```ts
     * SystemInfo.os.windowsDirectory(); // "C:\\Windows"
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getwindowsdirectoryw
     */
    static windowsDirectory(): string {
        const buf = new Uint16Array(260);
        const ptr = Deno.UnsafePointer.of(buf);
        if (libSymbols.sysWindowsDirectory(ptr, 260) > 0) {
            return readWideBuf(buf);
        }
        return "";
    }

    /**
     * Gets the operating system version information.
     *
     * Retrieves the version number and build number of the Windows operating system via `RtlGetVersion`.
     * This API is not affected by application manifest compatibility settings and always returns the true version.
     *
     * - Windows 10/11: major=10, minor=0
     * - Windows 8.1: major=6, minor=3
     * - Windows 7: major=6, minor=1
     * - Windows Vista: major=6, minor=0
     *
     * @returns An object containing major, minor, and build; all are 0 on failure.
     *
     * @example
     * ```ts
     * SystemInfo.os.version(); // { major: 10, minor: 0, build: 22621 }
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/winternl/nf-winternl-rtlgetversion
     */
    static version(): { major: number; minor: number; build: number } {
        const majorBuf = new Uint32Array(1);
        const minorBuf = new Uint32Array(1);
        const buildBuf = new Uint32Array(1);
        const majorPtr = Deno.UnsafePointer.of(majorBuf);
        const minorPtr = Deno.UnsafePointer.of(minorBuf);
        const buildPtr = Deno.UnsafePointer.of(buildBuf);
        if (libSymbols.sysOsVersion(majorPtr, minorPtr, buildPtr)) {
            return {
                major: majorBuf[0],
                minor: minorBuf[0],
                build: buildBuf[0],
            };
        }
        return { major: 0, minor: 0, build: 0 };
    }
}
