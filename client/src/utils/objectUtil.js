export const filterObject = (obj, id) => {
    const remainEntries = {};
    Object.entries(obj).filter((item) => {
        const [itemId] = item;
        if (itemId !== id) {
            return item;
        }
    }).forEach((item) => {
        const [id, value] = item;
        remainEntries[id] = value;
    });

    return remainEntries;
}

export const countCompletedSubtasks = (arr) => {
    return arr?.reduce((acc, curr) => {
        const {isCompleted} = curr;
        if (isCompleted) {
            return acc + 1;
        }
        return acc;
    }, 0)
}