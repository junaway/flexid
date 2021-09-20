"use strict";

const recorder = (offset, divider) => {
    const tick = () => {
        return ((Date.now() - offset ) / divider) >>> 0;
    }
    return { tick };
}

module.exports = recorder;