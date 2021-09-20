"use strict";

const recorder = (offset, divider) => {
    const tick = () => {
        return ((Date.now() - offset ) / divider) >>> 0;
    }

    const now = () => {
        return new Date(Date.now()).toISOString();
    }

    return { tick, now };
}

export default recorder;