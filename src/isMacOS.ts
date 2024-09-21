/*
 * @author Brandon Ramirez <brandon@brr.dev>
 * @copyright Copyright (c) 2024
 */

/// <reference types="user-agent-data-types" />

let _userIsOnMac: boolean;

export function isMacOS() {
    if (_userIsOnMac === undefined) {
        // Attempt to use the experimental navigator userAgentData object
        if (navigator.userAgentData) {
            _userIsOnMac = navigator.userAgentData.platform === 'macOS';
        } else {
            _userIsOnMac = /mac/i.test(
                navigator.userAgent ?? navigator.platform,
            );
        }
    }

    return _userIsOnMac;
}
