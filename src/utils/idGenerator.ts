export const generateUniqueId = (): string => {
    const timestamp = Date.now();

    const randomPart = Math.random().toString(36).substring(2, 10);

    return `${timestamp}-${randomPart}`;
};
