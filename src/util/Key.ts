export const generateUniqueKey = (): number => {
    return Date.now() + Math.round(Math.random() * 37 * 1024);
}