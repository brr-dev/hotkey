/*
 * @author Brandon Ramirez <brandon@brr.dev>
 * @copyright Copyright (c) 2024
 */

import { HotKey } from './HotKey';

class _HotKeyMap extends Map<HTMLElement, Set<HotKey>> {
    addHotKey(hotkey: HotKey): void {
        this._getCollectionForTarget(hotkey.target).add(hotkey);
    }

    removeHotKey(hotkey: HotKey): void {
        if (this.has(hotkey.target)) {
            this.get(hotkey.target)?.delete(hotkey);
        }
    }

    private _getCollectionForTarget(target: HTMLElement): Set<HotKey> {
        let hotkeys;

        if (this.has(target)) {
            hotkeys = this.get(target) as Set<HotKey>;
        } else {
            hotkeys = new Set<HotKey>();
            this.set(target, hotkeys);

            // We need to register the event handler when the set is created
            this._registerEventHandler(target, hotkeys);
        }

        return hotkeys;
    }

    private _registerEventHandler(
        target: HTMLElement,
        hotkeys: Set<HotKey>,
    ): void {
        target.addEventListener('keydown', function (event) {
            hotkeys.forEach((hotkey) => {
                if (hotkey.satisfiesEvent(event)) {
                    try {
                        hotkey.callback(event);
                    } catch (error) {
                        console.warn('Failed to run HotKey');
                        console.error(error);
                    }
                }
            });
        });
    }
}

export default new _HotKeyMap();
