/**
 * FFI binding layer module. Encapsulates the functionality of calling Windows native APIs via Deno FFI,
 * including window management, message processing, Input Method Editor (IME), keyboard state, system information,
 * high-precision timing, and other operations.
 */
import WINDOWS_LIB_PATH from "../build/brassWindow.dll.ts";

/**
 * Converts a JavaScript string to a C-style null-terminated UTF-8 string.
 * @param str - The input string to convert.
 * @returns A Uint8Array containing the null-terminated UTF-8 encoded string.
 */
export function toCstr(str: string): Uint8Array<ArrayBuffer> {
    return (new TextEncoder()).encode(`${str}\0`) as Uint8Array<ArrayBuffer>;
}

/**
 * Converts a JavaScript string to a wide-character (UTF-16) null-terminated string.
 * @param str - The input string to convert.
 * @returns A Uint16Array containing the null-terminated UTF-16 encoded string.
 */
export function toWCstr(str: string): Uint16Array<ArrayBuffer> {
    const length = str.length + 1;
    const wideCharArray = new Uint16Array(length);
    for (let i = 0; i < str.length; i++) {
        wideCharArray[i] = str.charCodeAt(i);
    }
    wideCharArray[str.length] = 0;
    return wideCharArray;
}
/**
 * Reads a null-terminated UTF-16 string from a Uint16Array.
 *
 * @param buf - The buffer containing the wide string.
 * @returns The decoded JavaScript string.
 */
export function readWideBuf(buf: Uint16Array): string {
    let end = 0;
    while (end < buf.length && buf[end] !== 0) end++;
    return new TextDecoder("utf-16").decode(
        new Uint8Array(buf.slice(0, end).buffer)
    );
}



/**
 * FFI symbols loaded from the brassWindow native library.
 * These functions encapsulate various Windows API calls for window management, message processing, timing, and high-precision operations.
 */
export const libSymbols = Deno.dlopen(WINDOWS_LIB_PATH, {
    /**
     * 获取指定模块的模块句柄。
     * @returns 模块句柄指针，未找到时返回 null。
     */
    getModuleHandle: {
        parameters: [],
        result: 'pointer'
    },
    /**
     * 获取系统指标和配置设置。
     * @param nIndex - 要检索的系统指标或配置项（SM_* 常量）。
     * @returns 请求的系统指标值。
     */
    getSystemMetrics: {
        parameters: ['i32'],
        result: 'i32'
    },
    /**
     * 显示或隐藏光标。
     * @param bShow - true 显示光标，false 隐藏光标。
     * @returns 成功时返回新的显示计数器值。
     */
    showCursor: {
        parameters: ['bool'],
        result: 'i32'
    },
    /**
     * 设置指定窗口的显示状态。
     * @param hWnd - 窗口句柄。
     * @param nCmdShow - 控制窗口显示方式的参数（SW_* 常量）。
     * @returns 窗口先前可见时返回 true，先前隐藏时返回 false。
     */
    showWindow: {
        parameters: ['pointer', 'i32'],
        result: 'bool'
    },
    /**
     * 通过发送 WM_PAINT 消息更新指定窗口的客户区。
     * @param hWnd - 要更新的窗口句柄。
     * @returns 成功返回 true，否则返回 false。
     */
    updateWindow: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 从指定资源加载图标。
     * @param iconPath - 包含图标路径或资源标识符的缓冲区。
     * @returns 加载成功的图标句柄，失败返回 null。
     */
    loadIcon: {
        parameters: ['buffer'],
        result: 'pointer'
    },
    /**
     * 销毁指定窗口并从系统中移除。
     * @param hWnd - 要销毁的窗口句柄。
     * @returns 成功返回 true，否则返回 false。
     */
    destroyWindow: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 获取指定窗口的外接矩形尺寸。
     * @param hWnd - 窗口句柄。
     * @param lpRect - 指向接收坐标的 RECT 结构的指针。
     * @returns 成功返回 true，否则返回 false。
     */
    getWindowRect: {
        parameters: ['pointer', 'pointer'],
        result: 'bool'
    },
    /**
     * 更改指定窗口的位置和尺寸。
     * @param hWnd - 窗口句柄。
     * @param X - 窗口新的 X 坐标。
     * @param Y - 窗口新的 Y 坐标。
     * @param nWidth - 窗口新的宽度。
     * @param nHeight - 窗口新的高度。
     * @param bRepaint - true 重绘窗口，false 不重绘。
     * @returns 成功返回 true，否则返回 false。
     */
    moveWindow: {
        parameters: ['pointer', 'i32', 'i32', 'i32', 'i32', 'bool'],
        result: 'bool'
    },
    /**
     * 修改指定窗口标题栏的文本（如果窗口有标题栏）。
     * @param hWnd - 窗口句柄。
     * @param lpString - 包含新窗口文本的缓冲区（UTF-16 字符串）。
     * @returns 成功返回 true，否则返回 false。
     */
    setWindowText: {
        parameters: ['pointer', 'buffer'],
        result: 'bool'
    },
    /**
     * 将指定窗口标题栏的文本复制到缓冲区。
     * @param hWnd - 窗口句柄。
     * @param lpString - 接收窗口文本的缓冲区。
     * @param nMaxCount - 要复制的最大字符数。
     * @returns 复制的字符串长度，失败返回 0。
     */
    getWindowText: {
        parameters: ['pointer', 'buffer', 'i32'],
        result: 'i32'
    },
    /**
     * 设置光标形状。
     * @param hCursor - 光标句柄，为 null 时移除光标图像。
     */
    setCursor: {
        parameters: ['pointer'],
        result: 'void'
    },
    /**
     * 获取光标在屏幕坐标系中的位置。
     * @param lpPoint - 指向接收光标位置的 POINT 结构的指针。
     * @returns 成功返回 true，否则返回 false。
     */
    getCursorPos: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 将光标移动到指定的屏幕坐标。
     * @param X - 光标新的 X 坐标。
     * @param Y - 光标新的 Y 坐标。
     * @returns 成功返回 true，否则返回 false。
     */
    setCursorPos: {
        parameters: ['i32', 'i32'],
        result: 'bool'
    },
    /**
     * 获取窗口客户区的坐标。
     * @param hWnd - 窗口句柄。
     * @param lpRect - 指向接收客户区坐标的 RECT 结构的指针。
     * @returns 成功返回 true，否则返回 false。
     */
    getClientRect: {
        parameters: ['pointer', 'pointer'],
        result: 'bool'
    },
    /**
     * 将矩形添加到指定窗口的更新区域以触发重绘。
     * @param hWnd - 窗口句柄。
     * @param lpRect - 指向包含更新矩形的 RECT 结构的指针，为 null 时表示整个客户区。
     * @param bErase - true 重绘前擦除背景，false 不擦除。
     * @returns 成功返回 true，否则返回 false。
     */
    invalidateRect: {
        parameters: ['pointer', 'pointer', 'bool'],
        result: 'bool'
    },
    /**
     * 获取指定窗口的信息（64 位扩展版本）。
     * @param hWnd - 窗口句柄。
     * @param nIndex - 要检索的值的基于 0 的偏移量（GWL_* 常量）。
     * @returns 请求的值，失败返回 0。
     */
    getWindowLongPtr: {
        parameters: ['pointer', 'i32'],
        result: 'i64'
    },
    /**
     * 修改指定窗口的属性（64 位扩展版本）。
     * @param hWnd - 窗口句柄。
     * @param nIndex - 要设置的值的基于 0 的偏移量（GWL_* 常量）。
     * @param dwNewLong - 替换值。
     * @returns 先前的值，失败返回 0。
     */
    setWindowLongPtr: {
        parameters: ['pointer', 'i32', 'i64'],
        result: 'i64'
    },
    /**
     * 注册用于创建窗口的窗口类。
     * @param wc - 指向描述窗口类的 WNDCLASS 结构的指针。
     * @param hInstance - 包含窗口过程的实例句柄。
     * @param style - 窗口类样式标志（CS_* 常量）。
     * @returns 成功返回 true，否则返回 false。
     */
    initializeWindowClass: {
        parameters: ['pointer', 'pointer', 'u32'],
        result: 'bool'
    },
    /**
     * 创建窗口并返回其句柄。
     * @param dwExStyle - 扩展窗口样式（WS_EX_* 常量）。
     * @param lpClassName - 包含窗口类名的缓冲区（UTF-16 字符串）。
     * @param dwStyle - 窗口样式（WS_* 常量）。
     * @param hwndParent - 拥有者窗口句柄，null 表示顶级窗口（独立任务栏按钮）。
     * @param x - 窗口初始 X 坐标。
     * @param y - 窗口初始 Y 坐标。
     * @param nWidth - 窗口宽度。
     * @param nHeight - 窗口高度。
     * @returns 新窗口的句柄，失败返回 null。
     */
    createWindow: {
        parameters: ['u32', 'buffer', 'u32', 'pointer', 'i32', 'i32', 'i32', 'i32'],
        result: 'pointer'
    },
    /**
     * 检查线程消息队列中的消息并检索（不移除）。
     * @param lpMsg - 指向接收消息的 MSG 结构的指针。
     * @param hWnd - 要查看消息的窗口句柄，为 null 时查看所有窗口的消息。
     * @param wMsgFilterMin - 要检查的消息范围的最小值。
     * @param wMsgFilterMax - 要检查的消息范围的最大值。
     * @param wRemoveMsg - 消息处理方式（PM_* 常量）。
     * @returns 有消息可用时返回 true，否则返回 false。
     */
    peekMessage: {
        parameters: ['pointer', 'pointer', 'u32', 'u32', 'u32'],
        result: 'bool'
    },
    /**
     * 将虚拟键消息转换为字符消息。
     * @param lpMsg - 指向包含要转换的消息的 MSG 结构的指针。
     * @returns 消息被转换时返回 true，否则返回 false。
     */
    translateMessage: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 将消息分发到目标窗口的窗口过程。
     * @param lpMsg - 指向包含要分发的消息的 MSG 结构的指针。
     * @returns 窗口过程的执行结果。
     */
    dispatchMessage: {
        parameters: ['pointer'],
        result: 'i64'
    },
    /**
     * 等待直到有消息被投递到线程的消息队列。
     */
    waitMessage: {
        parameters: [],
        result: 'void'
    },
    /**
     * 向线程的消息队列投递 WM_QUIT 消息。
     * @param nExitCode - 处理 WM_QUIT 时 GetMessage 返回的退出码。
     */
    postQuitMessage: {
        parameters: ['i32'],
        result: 'void'
    },
    /**
     * 设置窗口事件的回调函数。
     * @param callback - 指向处理窗口事件的回调函数的指针。
     */
    setEventCallback: {
        parameters: ['pointer'],
        result: 'void'
    },
    /**
     * 为窗口设置 Application User Model ID，控制任务栏分组。
     * @param hwnd - 窗口句柄
     * @param appId - AppUserModelID 字符串
     */
    setWindowAppId: {
        parameters: ['pointer', 'buffer'],
        result: 'void'
    },
    /**
     * 为窗口设置自定义图标。
     * @param hwnd - 窗口句柄
     * @param hIcon - 大图标句柄（可为 null）
     * @param hIconSm - 小图标句柄（可为 null）
     */
    setWindowIcon: {
        parameters: ['pointer', 'pointer', 'pointer'],
        result: 'void'
    },
    /**
     * 设置窗口的位置、大小和 Z 序。
     * @param hwnd - 窗口句柄
     * @param hwndInsertAfter - Z 序 (null=HWND_TOP, -1n=HWND_TOPMOST, -2n=HWND_NOTOPMOST)
     * @param x, y - 新位置
     * @param cx, cy - 新尺寸
     * @param flags - SWP_* 标志组合
     */
    setWindowPos: {
        parameters: ['pointer', 'pointer', 'i32', 'i32', 'i32', 'i32', 'u32'],
        result: 'bool'
    },
    /**
     * 获取当前前台（焦点）窗口句柄。
     */
    getForegroundWindow: {
        parameters: [],
        result: 'pointer'
    },
    /**
     * 限制或释放光标移动范围。
     * @param clip - TRUE 限制，FALSE 释放
     * @param left, top, right, bottom - 限制矩形
     */
    clipCursor: {
        parameters: ['bool', 'i32', 'i32', 'i32', 'i32'],
        result: 'bool'
    },

    /**
     * 将窗口带到前台并激活。
     * @param hwnd - 窗口句柄
     */
    setForegroundWindow: {
        parameters: ['pointer'],
        result: 'bool'
    },

    /**
     * 设置键盘焦点到指定窗口。
     * @param hwnd - 窗口句柄
     */
    setFocus: {
        parameters: ['pointer'],
        result: 'pointer'
    },

    /**
     * 将窗口带到 Z 序顶部。
     * @param hwnd - 窗口句柄
     */
    bringWindowToTop: {
        parameters: ['pointer'],
        result: 'bool'
    },

    /**
     * 强制设置前台窗口（绕过 Windows 前台限制）。
     * @param hwnd - 窗口句柄
     */
    forceSetForegroundWindow: {
        parameters: ['pointer'],
        result: 'bool'
    },

    /**
     * 设置键盘焦点（允许 NULL 清除焦点）。
     * @param hwnd - 窗口句柄或 NULL
     */
    setFocusAllowNull: {
        parameters: ['pointer'],
        result: 'pointer'
    },

    /**
     * 取消窗口激活状态（清除键盘焦点并移至 Z 序底部）。
     * @param hwnd - 窗口句柄
     */
    deactivateWindow: {
        parameters: ['pointer'],
        result: 'bool'
    },

    /**
     * 捕获鼠标输入到指定窗口。
     * @param hwnd - 窗口句柄
     */
    setCapture: {
        parameters: ['pointer'],
        result: 'pointer'
    },

    /**
     * 释放鼠标捕获。
     */
    releaseCapture: {
        parameters: [],
        result: 'bool'
    },

    /**
     * 将客户区坐标转换为屏幕坐标。
     * @param hwnd - 窗口句柄
     * @param x - 输入输出 X 坐标指针
     * @param y - 输入输出 Y 坐标指针
     */
    clientToScreen: {
        parameters: ['pointer', 'pointer', 'pointer'],
        result: 'bool'
    },

    /**
     * 设置窗口是否置顶（简化版 setWindowPos 用于 HWND_TOPMOST）。
     * @param hwnd - 窗口句柄
     * @param topmost - true=置顶(HWND_TOPMOST), false=取消置顶(HWND_NOTOPMOST)
     */
    setWindowTopmost: {
        parameters: ['pointer', 'bool'],
        result: 'bool'
    },

    /**
     * 将光标限制在窗口客户区内（或释放）。
     * @param hwnd - 窗口句柄
     * @param clip - true=限制, false=释放
     */
    clipCursorToClient: {
        parameters: ['pointer', 'bool'],
        result: 'bool'
    },

    // ==========================  System Parameters  ==========================
    /**
     * 获取工作区（屏幕排除任务栏后的区域）。
     * @param rect - 输出 RECT 指针 (left, top, right, bottom)
     */
    sysWorkArea: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 获取主显示器 DPI。
     */
    sysDpi: {
        parameters: [],
        result: 'i32'
    },
    /**
     * 获取计算机名称。
     * @param buffer - 输出 wchar_t 缓冲区
     * @param bufferSize - 缓冲区大小（字符数）
     * @return 实际字符数，失败返回 0
     */
    sysComputerName: {
        parameters: ['pointer', 'i32'],
        result: 'i32'
    },
    /**
     * 获取当前用户名。
     */
    sysUserName: {
        parameters: ['pointer', 'i32'],
        result: 'i32'
    },
    /**
     * 获取系统目录路径。
     */
    sysSystemDirectory: {
        parameters: ['pointer', 'i32'],
        result: 'i32'
    },
    /**
     * 获取 Windows 目录路径。
     */
    sysWindowsDirectory: {
        parameters: ['pointer', 'i32'],
        result: 'i32'
    },
    /**
     * 获取鼠标双击时间（毫秒）。
     */
    sysDoubleClickTime: {
        parameters: [],
        result: 'u32'
    },
    /**
     * 获取光标闪烁时间（毫秒）。
     */
    sysCaretBlinkTime: {
        parameters: [],
        result: 'u32'
    },
    /**
     * 获取物理内存大小（KB）。
     */
    sysPhysicalMemory: {
        parameters: [],
        result: 'i64'
    },
    /**
     * 获取可用物理内存（字节）。
     */
    sysAvailableMemory: {
        parameters: [],
        result: 'i64'
    },
    /**
     * 获取总物理内存（字节）。
     */
    sysTotalMemory: {
        parameters: [],
        result: 'i64'
    },
    /**
     * 获取内存使用率（百分比 0-100）。
     */
    sysMemoryLoad: {
        parameters: [],
        result: 'u32'
    },
    /**
     * 获取逻辑处理器数量。
     */
    sysProcessorCount: {
        parameters: [],
        result: 'u32'
    },
    /**
     * 获取页面大小（字节）。
     */
    sysPageSize: {
        parameters: [],
        result: 'u32'
    },
    /**
     * 获取处理器架构。
     */
    sysProcessorArchitecture: {
        parameters: [],
        result: 'u16'
    },
    /**
     * 获取操作系统版本信息。
     * @param major - 输出主版本号
     * @param minor - 输出次版本号
     * @param build - 输出构建号
     */
    sysOsVersion: {
        parameters: ['pointer', 'pointer', 'pointer'],
        result: 'bool'
    },
    
    /**
     * 设置系统的最小计时器分辨率。
     * @param uMilliseconds - 新的最小计时器分辨率（毫秒）。
     * @returns 实际设置的分辨率，失败返回 0。
     */
    setTimerPrecision: {
        parameters: ['u32'],
        result: 'u32'
    },
    /**
     * 将计时器分辨率重置为之前的状态。
     * @param uMilliseconds - 之前设置的计时器分辨率。
     * @returns 重置后的分辨率，失败返回 0。
     */
    resetTimerPrecision: {
        parameters: ['u32'],
        result: 'u32'
    },
    /**
     * 获取当前高精度时间（单位：秒）。
     * @returns 高精度时间值，浮点数形式。
     */
    getHighResolutionTime: {
        parameters: [],
        result: 'f64'
    },
    /**
     * 高精度休眠指定时长。
     * @param seconds - 休眠时长（秒，支持亚毫秒精度）。
     */
    highPrecisionSleep: {
        parameters: ['f64'],
        result: 'void'
    },
    /**
     * 获取当前显示器的刷新率（单位：Hz）。
     * @returns 刷新率，失败返回 0。
     */
    getDisplayRefreshRate: {
        parameters: [],
        result: 'i32'
    },
    /**
     * 使用 Windows 可等待定时器进行高精度休眠。
     * @param seconds - 休眠时长（秒）。
     * @returns 成功返回 true，否则返回 false。
     */
    waitableTimerSleep: {
        parameters: ['f64'],
        result: 'bool'
    },
    /**
     * 获取高精度性能计数器的当前值。
     * @param lpPerformanceCount - 指向接收计数器值的变量的指针。
     * @returns 成功返回 true，否则返回 false。
     */
    queryPerformanceCounter: {
        parameters: ['pointer'],
        result: 'bool'
    },
    /**
     * 获取高精度性能计数器的频率。
     * @param lpFrequency - 指向接收每秒计数次数的变量的指针。
     * @returns 成功返回 true，否则返回 false。
     */
    queryPerformanceFrequency: {
        parameters: ['pointer'],
        result: 'bool'
    },
}).symbols; 

/**
 * Sets the window event callback function.
 *
 * @param callback - The window event callback function
 */
export function setEventCallback(callback: (
    hwnd: Deno.PointerValue<unknown>,
    umsg: number,
    wParam: bigint,
    lParam: bigint
) => void) {
    const callbackPtr = new Deno.UnsafeCallback({
        parameters: ['pointer', 'u32', 'u64', 'i64'],
        result: "void"
    }, callback).pointer;
    libSymbols.setEventCallback(callbackPtr);
}

const user32 = Deno.dlopen("user32.dll", {
    MapVirtualKeyW: { parameters: ["u32", "u32"], result: "u32" },
    GetKeyState: { parameters: ["i32"], result: "i16" },
}).symbols;

const imm32 = Deno.dlopen("imm32.dll", {
    ImmGetContext: { parameters: ["pointer"], result: "pointer" },
    ImmGetCompositionStringW: { parameters: ["pointer", "u32", "pointer", "u32"], result: "i32" },
    ImmReleaseContext: { parameters: ["pointer", "pointer"], result: "bool" },
    ImmAssociateContextEx: { parameters: ["pointer", "pointer", "u32"], result: "bool" },
}).symbols;

/**
 * IME composition string flag (0x0008). Instructs ImmGetCompositionStringW to retrieve the composition string.
 */
export const GCS_COMPSTR = 0x0008;
/**
 * IME result string flag (0x0800). Instructs ImmGetCompositionStringW to retrieve the finalized result string.
 */
export const GCS_RESULTSTR = 0x0800;
/**
 * IME association context default flag (0x0010). Instructs ImmAssociateContextEx to associate the default IME context with the window.
 */
export const IACE_DEFAULT = 0x0010;

const vkKeyNames: Record<number, string> = {
    0x08: "backspace", 0x09: "tab", 0x0D: "enter",
    0x10: "shift", 0x11: "control", 0x12: "alt",
    0x13: "pause", 0x14: "capslock", 0x1B: "escape",
    0x20: "space",
    0x21: "pageup", 0x22: "pagedown", 0x23: "end", 0x24: "home",
    0x25: "arrowleft", 0x26: "arrowup", 0x27: "arrowright", 0x28: "arrowdown",
    0x29: "select", 0x2A: "print", 0x2B: "execute",
    0x2C: "printscreen", 0x2D: "insert", 0x2E: "delete", 0x2F: "help",
    0x5B: "meta", 0x5C: "meta", 0x5D: "contextmenu", 0x5F: "sleep",
    0x60: "numpad0", 0x61: "numpad1", 0x62: "numpad2",
    0x63: "numpad3", 0x64: "numpad4", 0x65: "numpad5",
    0x66: "numpad6", 0x67: "numpad7", 0x68: "numpad8", 0x69: "numpad9",
    0x6A: "multiply", 0x6B: "add", 0x6C: "separator",
    0x6D: "subtract", 0x6E: "decimal", 0x6F: "divide",
    0x90: "numlock", 0x91: "scrolllock",
    0xA0: "shift", 0xA1: "shift",
    0xA2: "control", 0xA3: "control",
    0xA4: "alt", 0xA5: "alt",
    0xB0: "nexttrack", 0xB1: "prevtrack", 0xB2: "stop",
    0xB3: "playpause", 0xB4: "mail", 0xB5: "selectmedia",
    0xB6: "app1", 0xB7: "app2",
    0xE5: "browserback", 0xE6: "browserforward",
    0xE7: "browserrefresh", 0xE8: "browserstop",
    0xE9: "browsersearch", 0xEA: "browserfavorites",
    0xEB: "browserhome", 0xF6: "volumemute",
    0xF7: "volumedown", 0xF8: "volumeup",
};

for (let i = 0; i < 24; i++) vkKeyNames[0x70 + i] = `F${i + 1}`;

/**
 * Converts a virtual key code to the corresponding character or key name.
 * @param vk - The virtual key code (VK_* constant).
 * @returns The translated character or key name string, or an empty string if unmappable.
 */
export function vkToChar(vk: number): string {
    const name = vkKeyNames[vk];
    if (name !== undefined) return name;
    const raw = Number(user32.MapVirtualKeyW(vk, 2));
    const ch = raw & 0xFFFF;
    if (ch === 0) return "";
    if (ch >= 0x41 && ch <= 0x5A) {
        const shift = (Number(user32.GetKeyState(0x10)) & 0x8000) !== 0;
        const caps = (Number(user32.GetKeyState(0x14)) & 0x0001) !== 0;
        return String.fromCharCode(shift !== caps ? ch : ch + 32);
    }
    return String.fromCharCode(ch);
}

/**
 * Checks whether the Shift key is pressed.
 * @returns true if the Shift key is currently pressed, false otherwise.
 */
export function isShiftDown(): boolean {
    return (Number(user32.GetKeyState(0x10)) & 0x8000) !== 0;
}

/**
 * Checks whether the Ctrl key is pressed.
 * @returns true if the Ctrl key is currently pressed, false otherwise.
 */
export function isCtrlDown(): boolean {
    return (Number(user32.GetKeyState(0x11)) & 0x8000) !== 0;
}

/**
 * Checks whether the Alt key is pressed.
 * @returns true if the Alt key is currently pressed, false otherwise.
 */
export function isAltDown(): boolean {
    return (Number(user32.GetKeyState(0x12)) & 0x8000) !== 0;
}

/**
 * Enables or disables the IME (Input Method Editor) for the specified window.
 * @param hwnd - The window handle.
 * @param enabled - true to enable IME, false to disable IME.
 */
export function setImeEnabled(hwnd: Deno.PointerValue<unknown>, enabled: boolean): void {
    imm32.ImmAssociateContextEx(hwnd, null, enabled ? IACE_DEFAULT : 0);
}

/**
 * Retrieves the composition string or result string from the IME context of the specified window.
 * @param hwnd - The window handle.
 * @param dwIndex - GCS_* constant (e.g., GCS_COMPSTR or GCS_RESULTSTR) specifying the type of string to retrieve.
 * @returns The IME string, or an empty string if retrieval fails or the string is empty.
 */
export function getImeString(hwnd: Deno.PointerValue<unknown>, dwIndex: number): string {
    const himc = imm32.ImmGetContext(hwnd);
    if (!himc) return "";
    const size = imm32.ImmGetCompositionStringW(himc, dwIndex, null, 0);
    if (Number(size) <= 0) {
        imm32.ImmReleaseContext(hwnd, himc);
        return "";
    }
    const byteLen = Number(size);
    const buf = new Uint8Array(byteLen);
    const bufPtr = Deno.UnsafePointer.of(buf);
    imm32.ImmGetCompositionStringW(himc, dwIndex, bufPtr, size);
    imm32.ImmReleaseContext(hwnd, himc);
    return new TextDecoder("utf-16le").decode(buf);
}