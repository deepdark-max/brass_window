#include "export.h"

API_EXPORT int showCursor(BOOL show)
{
    return ShowCursor(show);
}

API_EXPORT void setCursor(HCURSOR hCursor)
{
    SetCursor(hCursor);
}

API_EXPORT BOOL getCursorPos(POINT *point)
{
    return point ? GetCursorPos(point) : FALSE;
}

API_EXPORT BOOL setCursorPos(int x, int y)
{
    return SetCursorPos(x, y);
}

API_EXPORT BOOL clipCursor(BOOL clip, int left, int top, int right, int bottom)
{
    if (!clip) return ClipCursor(NULL);
    RECT rect = { left, top, right, bottom };
    return ClipCursor(&rect);
}

API_EXPORT BOOL clipCursorToClient(HWND hwnd, BOOL clip)
{
    if (!clip) return ClipCursor(NULL);
    if (!hwnd) return FALSE;
    
    RECT clientRect;
    if (!GetClientRect(hwnd, &clientRect)) return FALSE;
    
    POINT topLeft = { clientRect.left, clientRect.top };
    POINT bottomRight = { clientRect.right, clientRect.bottom };
    
    if (!ClientToScreen(hwnd, &topLeft)) return FALSE;
    if (!ClientToScreen(hwnd, &bottomRight)) return FALSE;
    
    RECT screenRect = { topLeft.x, topLeft.y, bottomRight.x, bottomRight.y };
    return ClipCursor(&screenRect);
}
