/*
 * @author Brandon Ramirez <brandon@brr.dev>
 * @copyright Copyright (c) 2024
 */

export type HotKeyCallback = (event: KeyboardEvent) => false | void;

export type HotKeyOptions = {
    // Key and callback are required
    key: string;
    callback: HotKeyCallback;

    // Optional target override, defaults to the document body
    target?: HTMLElement;

    // Optional modifiers, default to false
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
};
