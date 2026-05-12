#include "export.h"

API_EXPORT BOOL peekMessage(MSG *msg, HWND hwnd, UINT wMsgFilterMin, UINT wMsgFilterMax, UINT wRemoveMsg)
{
    return PeekMessageW(msg, hwnd, wMsgFilterMin, wMsgFilterMax, wRemoveMsg);
}

API_EXPORT BOOL translateMessage(const MSG *msg)
{
    return TranslateMessage(msg);
}

API_EXPORT LRESULT dispatchMessage(const MSG *msg)
{
    return DispatchMessageW(msg);
}

API_EXPORT void waitMessage()
{
    WaitMessage();
}

API_EXPORT void postQuitMessage(int nExitCode)
{
    PostQuitMessage(nExitCode);
}
