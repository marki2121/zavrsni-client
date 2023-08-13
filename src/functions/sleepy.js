export const sleepy = async (number) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, number);
    });
}