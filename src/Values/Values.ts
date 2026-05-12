/**
 * @module
 * Windows API enum values and type exports (Values).
 *
 * Centralized export of all Win32-related enum constants, type aliases, and structure definitions
 * for use by the {@link @brass/window} package internally and by external consumers.
 *
 * ## Export Categories
 * - **Window Styles**: `WindowStyle`, `WindowStyleEx`, `ClassStyle`
 * - **Window Messages**: `WindowMessage`, `WindowActivation`, `SizeMode`
 * - **Window Management**: `ShowWindow`, `WindowPosition`, `WindowLong`, `SystemCommands`
 * - **Input**: `VirtualKeys`, `CursorType`
 * - **System Info**: `SystemMetrics`, `DisplayDeviceMode`
 * - **UI Controls**: `MessageBoxStyle`
 * - **Message Queue**: `PeekMessage`
 * - **Accessibility**: `EventFlags`
 * - **Types**: `HWND`, `HINSTANCE`, and other handle types
 * - **Structures**: `RECT`, `POINT`, `MSG`, and other Win32 structures
 *
 * @see https://learn.microsoft.com/windows/win32/
 */
import { SystemMetrics } from "./enums/SystemMetrics.ts";
import { ShowWindow } from "./enums/ShowWindow.ts";
import { WindowLong } from "./enums/WindowLong.ts";
import { ClassStyle } from "./enums/ClassStyle.ts";
import { WindowStyle } from "./enums/WindowStyle.ts";
import { WindowStyleEx } from "./enums/WindowStyleEx.ts";
import { PeekMessage } from "./enums/PeekMessage.ts";
import { WindowMessage } from "./enums/WindowMessage.ts";
import { VirtualKeys } from "./enums/VirtualKeys.ts";
import { CursorType } from "./enums/CursorType.ts";
import { MessageBoxStyle } from "./enums/MessageBoxStyle.ts";
import { WindowActivation } from "./enums/WindowActivation.ts";
import { SizeMode } from "./enums/SizeMode.ts";
import { SystemCommands } from "./enums/SystemCommands.ts";
import { DisplayDeviceMode } from "./enums/DisplayDeviceMode.ts";
import { WindowPosition } from "./enums/WindowPosition.ts";
import { EventFlags } from "./enums/EventFlags.ts";

/**
 * Win32 constants namespace.
 *
 * Provides access to all Win32 enum constants used throughout the library:
 * window styles, virtual key codes, window messages, system metrics, etc.
 *
 * @example
 * ```ts
 * import { Values } from "@brass/window";
 *
 * // Virtual key codes
 * Values.VirtualKeys.VK_ESCAPE // 0x1B
 *
 * // Window styles
 * Values.WindowStyle.WS_OVERLAPPEDWINDOW
 *
 * // Window messages
 * Values.WindowMessage.WM_CLOSE
 * ```
 */
export const Values = {
  SystemMetrics,
  ShowWindow,
  WindowLong,
  ClassStyle,
  WindowStyle,
  WindowStyleEx,
  PeekMessage,
  WindowMessage,
  VirtualKeys,
  CursorType,
  MessageBoxStyle,
  WindowActivation,
  SizeMode,
  SystemCommands,
  DisplayDeviceMode,
  WindowPosition,
  EventFlags,
};
