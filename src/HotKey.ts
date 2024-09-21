/*
 * @author Brandon Ramirez <brandon@brr.dev>
 * @copyright Copyright (c) 2024
 */

import { HotKeyCallback, HotKeyOptions } from './HotKey.types';
import { isMacOS } from './isMacOS';
import HotKeyMap from './HotKeyMap';

export class HotKey {
    public key: string;
    public alt: boolean;
    public ctrl: boolean;
    public shift: boolean;
    public callback: HotKeyCallback;

    /**
     * Create a new HotKey binding with the given options.
     */
    constructor(options: HotKeyOptions) {
        if (!options.callback) {
            throw new Error('Missing callback for new HotKey');
        }

        if (!options.key) {
            throw new Error('Missing key for new HotKey');
        }

        this.key = options.key;
        this.callback = options.callback;

        this.alt = options.alt ?? false;
        this.ctrl = options.ctrl ?? false;
        this.shift = options.shift ?? false;

        // Register the new HotKey after creating it
        HotKeyMap.addHotKey(this, options.target ?? document.body);
    }

    satisfiesEvent(event: KeyboardEvent): boolean {
        const isMac = isMacOS();

        return (
            this.key === _fixKeyCasing(event.key) &&
            this.shift === event.shiftKey &&
            // Check for the ctrlKey (Control) on Mac, altKey (Alt) on windows
            this.alt === (isMac ? event.ctrlKey : event.altKey) &&
            // Check for the metaKey (Command) on Mac, ctrlKey (Ctrl) on windows
            this.ctrl === (isMac ? event.metaKey : event.ctrlKey)
        );
    }

    toString() {
        let str = this.key;

        const isMac = isMacOS();

        if (this.shift) str = 'Shift + ' + str;
        if (this.ctrl) str = (isMac ? 'Cmd' : 'Ctrl') + ' + ' + str;
        if (this.alt) str = (isMac ? 'Ctrl' : 'Alt') + ' + ' + str;

        return str;
    }
}

function _fixKeyCasing(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
}
