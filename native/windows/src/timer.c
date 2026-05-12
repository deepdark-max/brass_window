#include "export.h"

API_EXPORT MMRESULT setTimerPrecision(UINT ms)
{
    return timeBeginPeriod(ms);
}

API_EXPORT MMRESULT resetTimerPrecision(UINT ms)
{
    return timeEndPeriod(ms);
}

API_EXPORT BOOL queryPerformanceCounter(LONGLONG *counter)
{
    if (!counter) return FALSE;
    return QueryPerformanceCounter((LARGE_INTEGER*)counter);
}

API_EXPORT BOOL queryPerformanceFrequency(LONGLONG *frequency)
{
    if (!frequency) return FALSE;
    return QueryPerformanceFrequency((LARGE_INTEGER*)frequency);
}

API_EXPORT double getHighResolutionTime()
{
    LARGE_INTEGER counter, frequency;
    if (QueryPerformanceCounter(&counter) && QueryPerformanceFrequency(&frequency))
    {
        return (double)counter.QuadPart * 1000.0 / (double)frequency.QuadPart;
    }
    return (double)GetTickCount();
}

API_EXPORT void highPrecisionSleep(double ms)
{
    if (ms <= 0) return;

    if (ms < 1.0)
    {
        double target = getHighResolutionTime() + ms;
        while (getHighResolutionTime() < target)
        {
            Sleep(0);
        }
    }
    else
    {
        Sleep((DWORD)ms);
    }
}

API_EXPORT int getDisplayRefreshRate()
{
    DWM_TIMING_INFO timingInfo = {0};
    timingInfo.cbSize = sizeof(DWM_TIMING_INFO);

    if (SUCCEEDED(DwmGetCompositionTimingInfo(NULL, &timingInfo)))
    {
        if (timingInfo.rateRefresh.uiDenominator > 0)
        {
            return (int)(timingInfo.rateRefresh.uiNumerator / timingInfo.rateRefresh.uiDenominator);
        }
    }

    return 60;
}

API_EXPORT BOOL waitableTimerSleep(double ms)
{
    if (ms <= 0) return TRUE;

    HANDLE hTimer = CreateWaitableTimer(NULL, TRUE, NULL);
    if (!hTimer) return FALSE;

    LARGE_INTEGER liDueTime;
    liDueTime.QuadPart = -(LONGLONG)(ms * 10000.0);

    if (!SetWaitableTimer(hTimer, &liDueTime, 0, NULL, NULL, 0))
    {
        CloseHandle(hTimer);
        return FALSE;
    }

    WaitForSingleObject(hTimer, INFINITE);
    CloseHandle(hTimer);
    return TRUE;
}
