import type { WindowOptions, WindowEvents, WindowState } from "../types.ts";
import type { HINSTANCE, HWND } from "../Values/types.ts"; 
import { Values } from "../Values/Values.ts";
import { TypedEmitter } from "./TypedEmitter/TypedEmitter.ts";
import { libSymbols, toWCstr, setImeEnabled } from "../ffi.ts";


/**
 * The Window class encapsulates a Win32 window handle, providing window state management, property access, and event emission capabilities.
 * Extends TypedEmitter to support listening to window lifecycle callbacks through the event mechanism.
 *
 * @since 0.0.27
 */
export class Window extends TypedEmitter<WindowEvents> {
    /** Window title */
    public title!: string;
    /** Window unique identifier */
    public readonly id!: string;
    /** Window width (pixels) */
    public width!: number;
    /** Window height (pixels) */
    public height!: number;
    /** Window X coordinate (offset from left of screen) */
    public x!: number;
    /** Window Y coordinate (offset from top of screen) */
    public y!: number;
    /** Window state collection */
    public readonly state: WindowState = {
        isMaximized: false,
        isMinimized: false,
        isFullscreen: false,
        isAlwaysOnTop: false,
        isResizeable: true,
        isBorderless: false,
        isLocked: false,
        isVisible: true,
        isImeEnabled: true,
        isCursorVisible: true,
        isCentered: false,
    };
    /** Window style saved before entering fullscreen */
    private _savedStyle: bigint | null = null;
    /** Window rectangle saved before entering fullscreen */
    private _savedRect: { x: number; y: number; w: number; h: number } | null = null;
    /** Window position saved before centering */
    private _savedCenterPos: { x: number; y: number } | null = null;
    /** Module instance handle */
    public readonly displayHandle!: HINSTANCE;
    /** Window handle */
    public readonly windowHandle!: HWND;

    /**
     * Creates a new Window instance.
     *
     * @since 0.0.27
     * @param options - Window configuration options, including title, identifier, dimensions, and initial position
     */
    constructor(options: WindowOptions) {
        super();
        this.title = options.title;
        this.id = options.id;
        this.width = options.width ?? 800;
        this.height = options.height ?? 600;
        this.x = options.x ?? 0;
        this.y = options.y ?? 0;

        const handle = libSymbols.createWindow(
            Values.WindowStyleEx.WS_EX_APPWINDOW,
            toWCstr(this.title),
            Values.WindowStyle.WS_OVERLAPPEDWINDOW,
            null, // 无 owner，所有窗口 Z-order 独立
            this.x,
            this.y,
            this.width,
            this.height,
        );

        if (!handle) throw new Error(`[ERROR] Failed to create window "${options.id}"`);

        this.displayHandle = libSymbols.getModuleHandle();
        this.windowHandle = handle;
    }

    /**
     * Sets the window title.
     *
     * @since 0.0.27
     * @param title - The new window title
     * @returns this (chained call)
     */
    public setTitle(title: string): Window {
        this.title = title;
        libSymbols.setWindowText(this.windowHandle, toWCstr(title));
        return this;
    };

    /**
     * Sets the window size.
     *
     * @since 0.0.27
     * @param width  - The new width (pixels)
     * @param height - The new height (pixels)
     * @returns this (chained call)
     */
    public setSize(width: number, height: number): Window {
        this.width = width;
        this.height = height;
        libSymbols.moveWindow(this.windowHandle, this.x, this.y, width, height, true);
        return this;
    };

    /**
     * Sets the window position.
     * 
     * @since 0.0.27
     * @param x - The new X coordinate (offset from left of screen)
     * @param y - The new Y coordinate (offset from top of screen)
     * @returns this (chained call)
     */
    public setPosition(x: number, y: number): Window {
        this.x = x;
        this.y = y;
        libSymbols.moveWindow(this.windowHandle, x, y, this.width, this.height, true);
        return this;
    };

    /**
     * Sets the window visibility.
     *
     * @since 0.0.27
     * @param value - true to show the window, false to hide (toggles if omitted)
     * @returns this (chained call)
     */
    public setVisible(value?: boolean): Window {
        const newValue = value ?? !this.state.isVisible;
        if (newValue === this.state.isVisible) return this;
        libSymbols.showWindow(this.windowHandle, newValue ? 5 : 0);
        this.state.isVisible = newValue;
        return this;
    }

    /**
     * Sets the window maximized state.
     *
     * @since 0.0.27
     * @param value - true to maximize the window, false to restore (toggles if omitted)
     * @returns this (chained call)
     */
    public setMaximized(value?: boolean): Window {
        const newValue = value ?? !this.state.isMaximized;
        if (newValue === this.state.isMaximized) return this;
        libSymbols.showWindow(this.windowHandle, newValue ? 3 : 9);
        this.state.isMaximized = newValue;
        if (newValue) this.state.isMinimized = false;
        return this;
    }

    /**
     * Sets the window minimized state.
     *
     * @since 0.0.27
     * @param value - true to minimize the window, false to restore (toggles if omitted)
     * @returns this (chained call)
     */
    public setMinimized(value?: boolean): Window {
        const newValue = value ?? !this.state.isMinimized;
        if (newValue === this.state.isMinimized) return this;
        libSymbols.showWindow(this.windowHandle, newValue ? 6 : 9);
        this.state.isMinimized = newValue;
        if (newValue) this.state.isMaximized = false;
        return this;
    }

    /**
     * Sets whether the window stays on top.
     *
     * @since 0.0.27
     * @param value - true to set topmost, false to unset (toggles if omitted)
     * @returns this (chained call)
     */
    public setAlwaysOnTop(value?: boolean): Window {
        const newValue = value ?? !this.state.isAlwaysOnTop;
        if (newValue === this.state.isAlwaysOnTop) return this;
        libSymbols.setWindowTopmost(this.windowHandle, newValue);
        this.state.isAlwaysOnTop = newValue;
        return this;
    }

    /**
     * Sets whether the window is resizable.
     *
     * @since 0.0.27
     * @param value - true to allow resizing, false to disallow (toggles if omitted)
     * @returns this (chained call)
     */
    public setResizeable(value?: boolean): Window {
        const newValue = value ?? !this.state.isResizeable;
        if (newValue === this.state.isResizeable) return this;
        const style = libSymbols.getWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE);
        const newStyle = newValue
            ? style | BigInt(Values.WindowStyle.WS_THICKFRAME)
            : style & ~BigInt(Values.WindowStyle.WS_THICKFRAME);
        libSymbols.setWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE, newStyle);
        libSymbols.setWindowPos(this.windowHandle, null, 0, 0, 0, 0,
            Values.WindowPosition.SWP_FRAMECHANGED | Values.WindowPosition.SWP_NOSIZE | Values.WindowPosition.SWP_NOMOVE | Values.WindowPosition.SWP_NOACTIVATE);
        this.state.isResizeable = newValue;
        return this;
    }

    /**
     * Sets whether the window is in borderless mode.
     *
     * @since 0.0.27
     * @param value - true for borderless, false to restore borders (toggles if omitted)
     * @returns this (chained call)
     */
    public setBorderless(value?: boolean): Window {
        const newValue = value !== undefined ? !value : !this.state.isBorderless;
        if (newValue === this.state.isBorderless) return this;
        const style = libSymbols.getWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE);
        const newStyle = newValue
            ? style & ~BigInt(Values.WindowStyle.WS_OVERLAPPEDWINDOW)
            : style | BigInt(Values.WindowStyle.WS_OVERLAPPEDWINDOW);
        libSymbols.setWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE, newStyle);
        libSymbols.setWindowPos(this.windowHandle, null, 0, 0, 0, 0,
            Values.WindowPosition.SWP_FRAMECHANGED | Values.WindowPosition.SWP_NOSIZE | Values.WindowPosition.SWP_NOMOVE | Values.WindowPosition.SWP_NOACTIVATE);
        this.state.isBorderless = newValue;
        return this;
    }

    /**
     * Sets the window fullscreen state. Saves the current style and position when entering fullscreen, restores them on exit.
     *
     * @since 0.0.27
     * @param value - true for fullscreen, false to exit fullscreen (toggles if omitted)
     * @returns this (chained call)
     */
    public setFullscreen(value?: boolean): Window {
        const newValue = value ?? !this.state.isFullscreen;
        if (newValue === this.state.isFullscreen) return this;
        if (newValue) {
            this._savedStyle = libSymbols.getWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE);
            this._savedRect = { x: this.x, y: this.y, w: this.width, h: this.height };
            const screenW = libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXSCREEN);
            const screenH = libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYSCREEN);
            const newStyle = this._savedStyle & ~BigInt(Values.WindowStyle.WS_OVERLAPPEDWINDOW);
            libSymbols.setWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE, newStyle);
            libSymbols.setWindowPos(this.windowHandle, null, 0, 0, screenW, screenH,
                Values.WindowPosition.SWP_FRAMECHANGED | Values.WindowPosition.SWP_NOACTIVATE);
            this.state.isBorderless = true;
        } else {
            if (this._savedStyle !== null) {
                libSymbols.setWindowLongPtr(this.windowHandle, Values.WindowLong.GWL_STYLE, this._savedStyle);
                libSymbols.setWindowPos(this.windowHandle, null,
                    this._savedRect?.x ?? 0, this._savedRect?.y ?? 0,
                    this._savedRect?.w ?? 800, this._savedRect?.h ?? 600,
                    Values.WindowPosition.SWP_FRAMECHANGED);
                this.state.isBorderless = false;
            }
        }
        this.state.isFullscreen = newValue;
        return this;
    }

    /**
     * Locks the mouse cursor to the window client area and hides the cursor. Commonly used for first-person game camera control.
     *
     * @since 0.0.27
     * @param value - true to lock, false to unlock (toggles if omitted)
     * @returns this (chained call)
     */
    public setLocked(value?: boolean): Window {
        const newValue = value ?? !this.state.isLocked;
        if (newValue === this.state.isLocked) return this;
        if (newValue) {
            libSymbols.clipCursorToClient(this.windowHandle, true);
            libSymbols.showCursor(false);
        } else {
            libSymbols.clipCursorToClient(this.windowHandle, false);
            libSymbols.showCursor(true);
        }
        this.state.isLocked = newValue;
        return this;
    }

    /**
     * Enables or disables the Input Method Editor (IME) for the current window.
     *
     * Disabling the IME prevents keyboard input from triggering the IME composition window, suitable for games or shortcut scenarios.
     *
     * @since 0.0.27
     * @param value - true to enable IME, false to disable IME (toggles if omitted)
     * @returns this (chained call)
     */
    public setIME(value?: boolean): Window {
        const newValue = value ?? !this.state.isImeEnabled;
        if (newValue === this.state.isImeEnabled) return this;
        setImeEnabled(this.windowHandle, newValue);
        this.state.isImeEnabled = newValue;
        return this;
    }

    /**
     * Shows or hides the mouse cursor.
     *
     * @since 0.0.27
     * @param value - true to show cursor, false to hide (toggles if omitted)
     * @returns this (chained call)
     */
    public setCursor(value?: boolean): Window {
        const newValue = value ?? !this.state.isCursorVisible;
        if (newValue === this.state.isCursorVisible) return this;
        libSymbols.showCursor(newValue);
        this.state.isCursorVisible = newValue;
        return this;
    }

    /**
     * Centers the window on the current screen, or restores the position before centering.
     *
     * @since 0.0.27
     * @param value - true to center, false to restore (toggles if omitted)
     * @returns this (chained call)
     */
    public setCenter(value?: boolean): Window {
        const newValue = value ?? !this.state.isCentered;
        if (newValue === this.state.isCentered) return this;
        if (newValue) {
            this._savedCenterPos = { x: this.x, y: this.y };
            const screenW = libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CXSCREEN);
            const screenH = libSymbols.getSystemMetrics(Values.SystemMetrics.SM_CYSCREEN);
            this.x = Math.max(0, Math.floor((screenW - this.width) / 2));
            this.y = Math.max(0, Math.floor((screenH - this.height) / 2));
            libSymbols.moveWindow(this.windowHandle, this.x, this.y, this.width, this.height, true);
        } else {
            if (this._savedCenterPos) {
                this.x = this._savedCenterPos.x;
                this.y = this._savedCenterPos.y;
                libSymbols.moveWindow(this.windowHandle, this.x, this.y, this.width, this.height, true);
                this._savedCenterPos = null;
            }
        }
        this.state.isCentered = newValue;
        return this;
    }
}
