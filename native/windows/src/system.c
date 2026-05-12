#include "export.h"

API_EXPORT int getSystemMetrics(int index)
{
    return GetSystemMetrics(index);
}

API_EXPORT BOOL sysWorkArea(RECT *rect)
{
    if (!rect) return FALSE;
    return SystemParametersInfoW(SPI_GETWORKAREA, 0, rect, 0);
}

API_EXPORT int sysDpi()
{
    HDC dc = GetDC(NULL);
    if (!dc) return 96;
    int dpi = GetDeviceCaps(dc, LOGPIXELSX);
    ReleaseDC(NULL, dc);
    return dpi;
}

API_EXPORT int sysComputerName(wchar_t *buffer, int bufferSize)
{
    if (!buffer || bufferSize <= 0) return 0;
    DWORD size = (DWORD)bufferSize;
    if (GetComputerNameW(buffer, &size)) {
        return (int)size;
    }
    return 0;
}

API_EXPORT int sysUserName(wchar_t *buffer, int bufferSize)
{
    if (!buffer || bufferSize <= 0) return 0;
    DWORD size = (DWORD)bufferSize;
    if (GetUserNameW(buffer, &size)) {
        return (int)size;
    }
    return 0;
}

API_EXPORT int sysSystemDirectory(wchar_t *buffer, int bufferSize)
{
    if (!buffer || bufferSize <= 0) return 0;
    return (int)GetSystemDirectoryW(buffer, (UINT)bufferSize);
}

API_EXPORT int sysWindowsDirectory(wchar_t *buffer, int bufferSize)
{
    if (!buffer || bufferSize <= 0) return 0;
    return (int)GetWindowsDirectoryW(buffer, (UINT)bufferSize);
}

API_EXPORT UINT sysDoubleClickTime()
{
    return GetDoubleClickTime();
}

API_EXPORT UINT sysCaretBlinkTime()
{
    return GetCaretBlinkTime();
}

API_EXPORT DWORDLONG sysPhysicalMemory()
{
    DWORDLONG memoryKB = 0;
    if (GetPhysicallyInstalledSystemMemory(&memoryKB)) {
        return memoryKB;
    }
    return 0;
}

API_EXPORT DWORDLONG sysAvailableMemory()
{
    MEMORYSTATUSEX ms = { sizeof(ms) };
    GlobalMemoryStatusEx(&ms);
    return ms.ullAvailPhys;
}

API_EXPORT DWORDLONG sysTotalMemory()
{
    MEMORYSTATUSEX ms = { sizeof(ms) };
    GlobalMemoryStatusEx(&ms);
    return ms.ullTotalPhys;
}

API_EXPORT DWORD sysMemoryLoad()
{
    MEMORYSTATUSEX ms = { sizeof(ms) };
    GlobalMemoryStatusEx(&ms);
    return ms.dwMemoryLoad;
}

API_EXPORT DWORD sysProcessorCount()
{
    SYSTEM_INFO si;
    GetSystemInfo(&si);
    return si.dwNumberOfProcessors;
}

API_EXPORT DWORD sysPageSize()
{
    SYSTEM_INFO si;
    GetSystemInfo(&si);
    return si.dwPageSize;
}

API_EXPORT WORD sysProcessorArchitecture()
{
    SYSTEM_INFO si;
    GetSystemInfo(&si);
    return si.wProcessorArchitecture;
}

API_EXPORT BOOL sysOsVersion(int *major, int *minor, int *build)
{
    if (!major || !minor || !build) return FALSE;
    *major = 0; *minor = 0; *build = 0;
    HMODULE ntdll = GetModuleHandleW(L"ntdll.dll");
    if (!ntdll) return FALSE;
    typedef LONG (WINAPI *RtlGetVersionPtr)(PRTL_OSVERSIONINFOEXW);
    RtlGetVersionPtr RtlGetVersion = (RtlGetVersionPtr)GetProcAddress(ntdll, "RtlGetVersion");
    if (!RtlGetVersion) return FALSE;
    RTL_OSVERSIONINFOEXW ver = {0};
    ver.dwOSVersionInfoSize = sizeof(ver);
    if (RtlGetVersion(&ver) >= 0) {
        *major = (int)ver.dwMajorVersion;
        *minor = (int)ver.dwMinorVersion;
        *build = (int)ver.dwBuildNumber;
        return TRUE;
    }
    return FALSE;
}
