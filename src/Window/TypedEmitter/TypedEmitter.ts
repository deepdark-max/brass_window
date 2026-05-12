/** @module @brass/window/typed-emitter
 *
 * A strongly-typed event emitter.
 * Allows defining event names and their associated data types via generics, providing full type safety and IDE hints.
 * 
 * @typeParam Events - Event type mapping table, where keys are event names and values are the data carried by the event.
 * 
 * @example
 * ```ts
 * // 定义事件映射
 * interface MyEvents {
 *   open: void;
 *   data: number;
 *   error: string;
 * }
 * 
 * const emitter = new TypedEmitter<MyEvents>();
 * 
 * // 监听事件 (参数类型自动推断)
 * emitter.addEventListener("data", (val) => {
 *   console.log("Received:", val.toFixed(2)); // val 自动推断为 number
 * });
 * 
 * // 触发事件 (数据类型自动检查)
 * emitter.emit("data", 100);      // OK
 * // emitter.emit("data", "100"); // 报错: 期望 number
 * ```
 */
// deno-lint-ignore no-explicit-any
export class TypedEmitter<Events extends Record<string, any>> {
  /** Internal storage: maps event names to arrays of callback functions */
  // deno-lint-ignore no-explicit-any
  private listeners = new Map<keyof Events, Array<(data: any) => void>>();
  /**
   * Registers an event listener.
   * 
   * @param event - The name of the event to listen for.
   * @param callback - The callback function invoked when the event is emitted.
   * 
   * @example
   * ```ts
   * emitter.addEventListener("resize", (size) => console.log(size.width));
   * ```
   */
  public addEventListener<K extends keyof Events>(
    event: K,
    callback: (data: Events[K]) => void
  ) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  /**
   * Removes a listener for the specified event.
   *
   * @param event - The name of the event whose listener should be removed.
   * @param callback - The callback function to remove (must be the same function reference that was previously registered).
   *
   * @example
   * ```ts
   * const onResize = (size) => console.log(size);
   * emitter.addEventListener("resize", onResize);
   * emitter.removeEventListener("resize", onResize);
   * ```
   */
  public removeEventListener<K extends keyof Events>(
    event: K,
    callback: (data: Events[K]) => void
  ) {
    const cbs = this.listeners.get(event);
    if (!cbs) return;
    const idx = cbs.indexOf(callback);
    if (idx !== -1) cbs.splice(idx, 1);
  }
  /**
   * Emits the specified event, synchronously invoking all registered listeners.
   * 
   * @param event - The name of the event to emit.
   * @param data - The data to pass to the callback functions.
   * 
   * @example
   * ```ts
   * emitter.emit("resize", { width: 800, height: 600 });
   * ```
   */
  public emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}