export const addUserToLocalStorage = ({user, token}) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

export const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    return {user, token};
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme');
}

export const addThemeToLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
}