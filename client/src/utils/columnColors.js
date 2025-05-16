export const getColor = (index) => {
    const colors = ['#49c4e5', '#8471f2', '#67e2ae', '#e2679b', '#e27167', '#e267d9'];
    if (index < colors.length) {
        return colors[index];
    } else {
        const tempIndex = index % colors.length;
        return colors[tempIndex];
    }
}