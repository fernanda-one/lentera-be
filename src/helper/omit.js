export function omit(obj, keysToOmit) {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keysToOmit.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}