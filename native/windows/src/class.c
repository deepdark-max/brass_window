#include "export.h"

UINT windowCount = 0;
WNDCLASSEXW wcex = {0};
EVENT_CALLBACK eventCallback = NULL;

API_EXPORT void setEventCallback(EVENT_CALLBACK callback)
{
    eventCallback = callback;
}

LRESULT CALLBACK WindowProcedure(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    if (eventCallback) eventCallback(hwnd, uMsg, wParam, lParam);

    switch (uMsg)
    {
    case WM_DESTROY:
        windowCount -= 1;
        if (windowCount == 0) PostQuitMessage(0);
        break;
    case WM_CLOSE:
        DestroyWindow(hwnd);
        break;
    default:
        return DefWindowProc(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

API_EXPORT BOOL initializeWindowClass(HICON hIcon, HICON hIconSm, UINT style)
{
    HINSTANCE hInstance = GetModuleHandleW(NULL);
    if (!hInstance) return FALSE;

    WNDCLASSEXW existing = {0};
    existing.cbSize = sizeof(WNDCLASSEXW);
    if (GetClassInfoExW(hInstance, L"brass_window", &existing))
        return TRUE;

    wcex.cbSize = sizeof(WNDCLASSEXW);
    wcex.lpfnWndProc = WindowProcedure;
    wcex.hInstance = hInstance;
    wcex.lpszClassName = L"brass_window";
    wcex.hCursor = LoadCursor(NULL, IDC_ARROW);
    wcex.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wcex.hIcon = hIcon ? hIcon : LoadIcon(NULL, IDI_APPLICATION);
    wcex.hIconSm = hIconSm ? hIconSm : LoadIcon(NULL, IDI_APPLICATION);
    wcex.style = style;

    return RegisterClassExW(&wcex) != 0;
}

API_EXPORT HWND createWindow(
    DWORD dwExStyle,
    LPCWSTR lpWindowName,
    DWORD dwStyle,
    HWND hwndParent,
    int X, int Y,
    int nWidth, int nHeight)
{
    HWND window = CreateWindowExW(
        dwExStyle,
        L"brass_window",
        lpWindowName,
        dwStyle,
        X, Y,
        nWidth, nHeight,
        hwndParent,
        NULL,
        GetModuleHandleW(NULL),
        NULL
    );
    if (window)
    {
        windowCount += 1;
        ShowWindow(window, SW_SHOW);
        UpdateWindow(window);
    }
    return window;
}
