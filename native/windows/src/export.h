#pragma once
#define UNICODE
#define _UNICODE
#define _WIN32_WINNT 0x0601
#include <windows.h>
#include <stdio.h>
#include <timeapi.h>
#include <dwmapi.h>
#include <shobjidl.h>
#include <propkey.h>
#include <propvarutil.h>
#pragma comment(lib, "dwmapi.lib")
#pragma comment(lib, "winmm.lib")
#pragma comment(lib, "ole32.lib")
#pragma comment(lib, "shell32.lib")
#pragma comment(lib, "propsys.lib")
#define API_EXPORT __declspec(dllexport)
typedef void (*EVENT_CALLBACK)(HWND, UINT, WPARAM, LPARAM);

extern UINT windowCount;
extern WNDCLASSEXW wcex;
extern EVENT_CALLBACK eventCallback;

API_EXPORT HINSTANCE getModuleHandle();
API_EXPORT int getSystemMetrics(int index);
API_EXPORT int showCursor(BOOL show);
API_EXPORT BOOL showWindow(HWND hwnd, int mode);
API_EXPORT BOOL updateWindow(HWND hwnd);
API_EXPORT HICON loadIcon(LPCWSTR filePath);
API_EXPORT BOOL destroyWindow(HWND hwnd);
API_EXPORT BOOL getWindowRect(HWND hwnd, RECT *rect);
API_EXPORT BOOL moveWindow(HWND hwnd, int x, int y, int width, int height, BOOL repaint);
API_EXPORT BOOL setWindowText(HWND hwnd, const wchar_t *title);
API_EXPORT int getWindowText(HWND hwnd, wchar_t *buffer, int bufferSize);
API_EXPORT void setCursor(HCURSOR hCursor);
API_EXPORT BOOL getCursorPos(POINT *point);
API_EXPORT BOOL setCursorPos(int x, int y);
API_EXPORT BOOL getClientRect(HWND hwnd, RECT *rect);
API_EXPORT BOOL invalidateRect(HWND hwnd, const RECT *rect, BOOL erase);
API_EXPORT LONG_PTR getWindowLongPtr(HWND hwnd, int index);
API_EXPORT LONG_PTR setWindowLongPtr(HWND hwnd, int index, LONG_PTR newValue);
API_EXPORT BOOL peekMessage(MSG *msg, HWND hwnd, UINT wMsgFilterMin, UINT wMsgFilterMax, UINT wRemoveMsg);
API_EXPORT BOOL translateMessage(const MSG *msg);
API_EXPORT LRESULT dispatchMessage(const MSG *msg);
API_EXPORT void waitMessage();
API_EXPORT void postQuitMessage(int nExitCode);
API_EXPORT void setEventCallback(EVENT_CALLBACK callback);
API_EXPORT BOOL initializeWindowClass(HICON hIcon, HICON hIconSm, UINT style);
API_EXPORT HWND createWindow(DWORD dwExStyle, LPCWSTR lpWindowName, DWORD dwStyle, HWND hwndParent, int X, int Y, int nWidth, int nHeight);
API_EXPORT void setWindowAppId(HWND hwnd, LPCWSTR appId);
API_EXPORT void setWindowIcon(HWND hwnd, HICON hIcon, HICON hIconSm);
API_EXPORT BOOL setWindowPos(HWND hwnd, HWND hwndInsertAfter, int x, int y, int cx, int cy, UINT flags);
API_EXPORT HWND getForegroundWindow();
API_EXPORT BOOL setForegroundWindow(HWND hwnd);
API_EXPORT HWND setFocus(HWND hwnd);
API_EXPORT BOOL bringWindowToTop(HWND hwnd);
API_EXPORT BOOL forceSetForegroundWindow(HWND hwnd);
API_EXPORT HWND setFocusAllowNull(HWND hwnd);
API_EXPORT BOOL deactivateWindow(HWND hwnd);
API_EXPORT HWND setCapture(HWND hwnd);
API_EXPORT BOOL releaseCapture();
API_EXPORT BOOL clientToScreen(HWND hwnd, int *x, int *y);
API_EXPORT BOOL setWindowTopmost(HWND hwnd, BOOL topmost);
API_EXPORT BOOL clipCursorToClient(HWND hwnd, BOOL clip);
API_EXPORT BOOL sysWorkArea(RECT *rect);
API_EXPORT int sysDpi();
API_EXPORT int sysComputerName(wchar_t *buffer, int bufferSize);
API_EXPORT int sysUserName(wchar_t *buffer, int bufferSize);
API_EXPORT int sysSystemDirectory(wchar_t *buffer, int bufferSize);
API_EXPORT int sysWindowsDirectory(wchar_t *buffer, int bufferSize);
API_EXPORT UINT sysDoubleClickTime();
API_EXPORT UINT sysCaretBlinkTime();
API_EXPORT DWORDLONG sysPhysicalMemory();
API_EXPORT DWORDLONG sysAvailableMemory();
API_EXPORT DWORDLONG sysTotalMemory();
API_EXPORT DWORD sysMemoryLoad();
API_EXPORT DWORD sysProcessorCount();
API_EXPORT DWORD sysPageSize();
API_EXPORT WORD sysProcessorArchitecture();
API_EXPORT BOOL sysOsVersion(int *major, int *minor, int *build);
API_EXPORT MMRESULT setTimerPrecision(UINT ms);
API_EXPORT MMRESULT resetTimerPrecision(UINT ms);
API_EXPORT BOOL queryPerformanceCounter(LONGLONG *counter);
API_EXPORT BOOL queryPerformanceFrequency(LONGLONG *frequency);
API_EXPORT double getHighResolutionTime();
API_EXPORT void highPrecisionSleep(double ms);
API_EXPORT int getDisplayRefreshRate();
API_EXPORT BOOL waitableTimerSleep(double ms);
