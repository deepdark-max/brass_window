#include "export.h"

API_EXPORT HINSTANCE getModuleHandle()
{
    return GetModuleHandleW(NULL);
}

API_EXPORT BOOL showWindow(HWND hwnd, int mode)
{
    return hwnd ? ShowWindow(hwnd, mode) : FALSE;
}

API_EXPORT BOOL updateWindow(HWND hwnd)
{
    return hwnd ? UpdateWindow(hwnd) : FALSE;
}

API_EXPORT BOOL destroyWindow(HWND hwnd)
{
    return hwnd ? DestroyWindow(hwnd) : FALSE;
}

API_EXPORT BOOL getWindowRect(HWND hwnd, RECT *rect)
{
    return (hwnd && rect) ? GetWindowRect(hwnd, rect) : FALSE;
}

API_EXPORT BOOL moveWindow(HWND hwnd, int x, int y, int width, int height, BOOL repaint)
{
    return hwnd ? MoveWindow(hwnd, x, y, width, height, repaint) : FALSE;
}

API_EXPORT BOOL setWindowText(HWND hwnd, const wchar_t *title)
{
    return (hwnd && title) ? SetWindowTextW(hwnd, title) : FALSE;
}

API_EXPORT int getWindowText(HWND hwnd, wchar_t *buffer, int bufferSize)
{
    return (hwnd && buffer && bufferSize > 0) ? GetWindowTextW(hwnd, buffer, bufferSize) : 0;
}

API_EXPORT BOOL getClientRect(HWND hwnd, RECT *rect)
{
    return (hwnd && rect) ? GetClientRect(hwnd, rect) : FALSE;
}

API_EXPORT BOOL invalidateRect(HWND hwnd, const RECT *rect, BOOL erase)
{
    return hwnd ? InvalidateRect(hwnd, rect, erase) : FALSE;
}

API_EXPORT LONG_PTR getWindowLongPtr(HWND hwnd, int index)
{
    return hwnd ? GetWindowLongPtrW(hwnd, index) : 0;
}

API_EXPORT LONG_PTR setWindowLongPtr(HWND hwnd, int index, LONG_PTR newValue)
{
    return hwnd ? SetWindowLongPtrW(hwnd, index, newValue) : 0;
}

API_EXPORT BOOL setWindowPos(HWND hwnd, HWND hwndInsertAfter, int x, int y, int cx, int cy, UINT flags)
{
    return hwnd ? SetWindowPos(hwnd, hwndInsertAfter, x, y, cx, cy, flags) : FALSE;
}

API_EXPORT HWND getForegroundWindow()
{
    return GetForegroundWindow();
}

API_EXPORT BOOL setForegroundWindow(HWND hwnd)
{
    return hwnd ? SetForegroundWindow(hwnd) : FALSE;
}

API_EXPORT HWND setFocus(HWND hwnd)
{
    return hwnd ? SetFocus(hwnd) : NULL;
}

API_EXPORT BOOL bringWindowToTop(HWND hwnd)
{
    return hwnd ? BringWindowToTop(hwnd) : FALSE;
}

API_EXPORT BOOL forceSetForegroundWindow(HWND hwnd)
{
    if (!hwnd) return FALSE;
    DWORD foregroundThread = GetWindowThreadProcessId(GetForegroundWindow(), NULL);
    DWORD attachThreadId = GetWindowThreadProcessId(hwnd, NULL);
    if (foregroundThread != attachThreadId && foregroundThread != 0) {
        AttachThreadInput(foregroundThread, attachThreadId, TRUE);
    }
    BOOL result = SetForegroundWindow(hwnd);
    BringWindowToTop(hwnd);
    SetFocus(hwnd);
    if (foregroundThread != attachThreadId && foregroundThread != 0) {
        AttachThreadInput(foregroundThread, attachThreadId, FALSE);
    }
    return result;
}

API_EXPORT HWND setFocusAllowNull(HWND hwnd)
{
    return SetFocus(hwnd);
}

API_EXPORT BOOL deactivateWindow(HWND hwnd)
{
    if (!hwnd) return FALSE;
    SetFocus(NULL);
    return SetWindowPos(hwnd, HWND_BOTTOM, 0, 0, 0, 0,
        SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE);
}

API_EXPORT HWND setCapture(HWND hwnd)
{
    return hwnd ? SetCapture(hwnd) : NULL;
}

API_EXPORT BOOL releaseCapture()
{
    return ReleaseCapture();
}

API_EXPORT BOOL clientToScreen(HWND hwnd, int *x, int *y)
{
    if (!hwnd || !x || !y) return FALSE;
    POINT pt = { *x, *y };
    BOOL result = ClientToScreen(hwnd, &pt);
    if (result) {
        *x = pt.x;
        *y = pt.y;
    }
    return result;
}

API_EXPORT BOOL setWindowTopmost(HWND hwnd, BOOL topmost)
{
    if (!hwnd) return FALSE;
    return SetWindowPos(hwnd, topmost ? HWND_TOPMOST : HWND_NOTOPMOST,
                        0, 0, 0, 0, SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE);
}
