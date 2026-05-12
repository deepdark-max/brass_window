import { libSymbols } from "../../ffi.ts";

/** Mapping from processor architecture identifier to readable name. */
const ARCH_MAP: Record<number, string> = {
    0: "x86",
    5: "ARM",
    9: "AMD64",
    12: "ARM64",
};

/**
 * Hardware information.
 *
 * Provides queries for hardware parameters such as processor, memory, page size, and architecture.
 * Processor information is obtained via `GetSystemInfo`, memory information via `GlobalMemoryStatusEx`.
 *
 * @module SystemInfo.hardware
 * @since 0.0.27
 * @since 0.0.27
 */
export class HardwareInfo {
    /**
     * Gets the number of logical processors in the system.
     *
     * Retrieves the number of logical processors (including hyper-threaded cores) via `GetSystemInfo`.
     * For example, a 4-core 8-thread CPU returns 8.
     *
     * @returns The number of logical processors.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.processorCount(); // 8
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsysteminfo
     */
    static processorCount(): number {
        return libSymbols.sysProcessorCount();
    }

    /**
     * Gets the processor architecture name.
     *
     * Retrieves the processor architecture from the `wProcessorArchitecture` field of `GetSystemInfo`.
     * The return value is mapped to a readable architecture name string.
     *
     * - x86: 32-bit Intel/AMD processors
     * - AMD64: 64-bit Intel/AMD processors
     * - ARM: 32-bit ARM processors
     * - ARM64: 64-bit ARM processors
     *
     * @returns The architecture name ("x86", "AMD64", "ARM", "ARM64"), or "unknown(N)" for unknown architectures.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.processorArchitecture(); // "AMD64"
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsysteminfo
     */
    static processorArchitecture(): string {
        const arch = libSymbols.sysProcessorArchitecture();
        return ARCH_MAP[arch] ?? `unknown(${arch})`;
    }

    /**
     * Gets the system memory page size.
     *
     * Retrieves the memory page size used by the operating system via `GetSystemInfo`.
     * Most x64 systems use 4096 bytes (4KB); some systems may use larger pages.
     *
     * @returns The page size in bytes.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.pageSize(); // 4096
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getsysteminfo
     */
    static pageSize(): number {
        return libSymbols.sysPageSize();
    }

    /**
     * Gets the total amount of physically installed memory (KB).
     *
     * Retrieves the actual physically installed memory size via `GetPhysicallyInstalledSystemMemory`.
     * Unlike `totalMemory`, this value reflects the hardware installed capacity rather than the OS-addressable capacity.
     *
     * @returns The physical memory size in KB, or 0 on failure.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.physicalMemoryKB(); // 16777216 (i.e. 16GB)
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-getphysicallyinstalledsystemmemory
     */
    static physicalMemoryKB(): number {
        const val = libSymbols.sysPhysicalMemory() as bigint;
        return Number(val);
    }

    /**
     * Gets the total physical memory size (bytes).
     *
     * Retrieves the total OS-addressable physical memory via `GlobalMemoryStatusEx`.
     * On 32-bit systems, this may be less than the physically installed memory amount.
     *
     * @returns The total physical memory in bytes.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.totalMemory(); // 16940015616 (approx 16GB)
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-globalmemorystatusex
     */
    static totalMemory(): number {
        const val = libSymbols.sysTotalMemory() as bigint;
        return Number(val);
    }

    /**
     * Gets the currently available physical memory (bytes).
     *
     * Retrieves the current amount of physical memory available for allocation via `GlobalMemoryStatusEx`.
     * This value changes in real time as the system runs.
     *
     * @returns The available physical memory in bytes.
     *
     * @example
     * ```ts
     * SystemInfo.hardware.availableMemory(); // 5893140480 (approx 5.5GB)
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-globalmemorystatusex
     */
    static availableMemory(): number {
        const val = libSymbols.sysAvailableMemory() as bigint;
        return Number(val);
    }

    /**
     * Gets the current memory load.
     *
     * Retrieves the percentage of physical memory in use via `GlobalMemoryStatusEx`.
     * The return value ranges from 0–100, where 100 indicates all physical memory is fully occupied.
     *
     * @returns The memory load percentage (0–100).
     *
     * @example
     * ```ts
     * SystemInfo.hardware.memoryLoad(); // 65
     * ```
     *
     * @see https://learn.microsoft.com/windows/win32/api/sysinfoapi/nf-sysinfoapi-globalmemorystatusex
     */
    static memoryLoad(): number {
        return libSymbols.sysMemoryLoad();
    }
}
