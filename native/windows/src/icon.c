#include "export.h"

API_EXPORT HICON loadIcon(LPCWSTR filePath)
{
    if (!filePath)
        return LoadIconW(NULL, IDI_APPLICATION);
    return (HICON)LoadImageW(NULL, filePath, IMAGE_ICON, 0, 0, LR_DEFAULTSIZE | LR_LOADFROMFILE);
}

API_EXPORT void setWindowAppId(HWND hwnd, LPCWSTR appId)
{
    if (!hwnd || !appId) return;

    BOOL comUninit = FALSE;
    HRESULT hr = CoInitializeEx(NULL, COINIT_APARTMENTTHREADED);
    if (hr == S_OK) {
        comUninit = TRUE;
    } else if (FAILED(hr) && hr != RPC_E_CHANGED_MODE) {
        return;
    }

    IPropertyStore *pps = NULL;
    hr = SHGetPropertyStoreForWindow(hwnd, &IID_IPropertyStore, (void**)&pps);
    if (SUCCEEDED(hr) && pps) {
        PROPVARIANT pv;
        PropVariantInit(&pv);
        pv.vt = VT_LPWSTR;
        pv.pwszVal = (LPWSTR)appId;

        if (SUCCEEDED(pps->lpVtbl->SetValue(pps, &PKEY_AppUserModel_ID, &pv))) {
            pps->lpVtbl->Commit(pps);
        }

        pps->lpVtbl->Release(pps);
    }

    if (comUninit) CoUninitialize();
}

API_EXPORT void setWindowIcon(HWND hwnd, HICON hIcon, HICON hIconSm)
{
    if (!hwnd) return;
    if (hIcon) {
        SendMessageW(hwnd, WM_SETICON, ICON_BIG, (LPARAM)hIcon);
        SendMessageW(hwnd, WM_SETICON, 2, (LPARAM)hIcon);
    }
    if (hIconSm) {
        SendMessageW(hwnd, WM_SETICON, ICON_SMALL, (LPARAM)hIconSm);
    }
}
