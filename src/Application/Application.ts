/**
 * @module Application
 * @description Application class for creating and managing windows.
 */

import type { AppOptions, WindowOptions } from "../types.ts";
import type { HICON } from "../Values/types.ts";
import { Window } from "../Window/Window.ts";
import { Values } from "../Values/Values.ts";
import { libSymbols, toWCstr } from "../ffi.ts";
import { processMessages } from "./private/processMessages.ts";
import { handleEvents } from "./private/handleEvents.ts";

// 全局状态
let _init = false;
/**
 * Global window map used for event dispatch across all applications.
 */
export const allWindows: Map<bigint, Window> = new Map();

/**
 * Manages window creation, icon assignment, and AppUserModelID grouping
 * for a group of windows belonging to a single application instance.
 */
export class Application {

    private windows: Map<string, Window> = new Map();

    private readonly appId: string;
    /** Large icon handle */
    private readonly hIcon: HICON;
    /** Small icon handle */
    private readonly hIconSm: HICON;

    /**
     * @param options - Optional application-level options (icon paths, etc.).
     */
    constructor(options?: AppOptions) {
        this.hIcon = options?.iconPath ? libSymbols.loadIcon(toWCstr(options.iconPath)) : null;
        this.hIconSm = options?.iconSmPath ? libSymbols.loadIcon(toWCstr(options.iconSmPath)) : null;
        libSymbols.initializeWindowClass(
            this.hIcon,
            this.hIconSm,
            Values.ClassStyle.CS_OWNDC | Values.ClassStyle.CS_DBLCLKS
        );
        // 每个 Application 实例生成唯一 AppUserModelID
        this.appId = `BrassWindow.App.${crypto.randomUUID()}`;

        // 启动消息处理
        if (!_init) {
            processMessages();
            console.log("[INFO] Start message processing");
            handleEvents();
            console.log("[INFO] Start event handling");
            _init = true;
        }

        console.log("[INFO] App initialized");
    }


    /**
     * Create a new window and register it under this application instance.
     *
     * @since 0.0.27
     * @param options - Window creation options (id, title, size, etc.).
     * @returns The newly created Window instance.
     */
    public createWindow(options: WindowOptions): Window {
        const instance = new Window(options);
        // 设置自定义图标（各 Application 独立）
        libSymbols.setWindowIcon(instance.windowHandle, this.hIcon, this.hIconSm);
        // 设置 AppUserModelID，确保同 Application 窗口共享任务栏分组
        libSymbols.setWindowAppId(instance.windowHandle, toWCstr(this.appId));

        this.windows.set(options.id, instance); // 注册当前Application 窗口
        allWindows.set(Deno.UnsafePointer.value(instance.windowHandle), instance); // 注册全局Application 窗口

        console.log(`[INFO] Window ${options.id} created`);
        return instance;
    }

    /**
     * Get a created window by its ID.
     * @since 0.0.27
     * @param id - The unique identifier specified when creating the window
     * @returns The Window instance, or undefined if not found
     */
    public getWindowById(id: string): Window | undefined {
        return this.windows.get(id);
    };

    /**
     * Get all created windows.
     *
     * @since 0.0.27
     * @returns An array of Window instances
     */
    public getAllWindows(): Window[] {
        return Array.from(this.windows.values());
    }
}
