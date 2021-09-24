const recorder = (offset, divider) => {
    const tick = () => ((Date.now() - offset) / divider) >>> 0; // eslint-disable-line no-bitwise
    return { tick };
};
export default recorder;
