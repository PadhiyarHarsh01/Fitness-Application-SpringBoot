export const getToken = () => {
    return localStorage.getItem("token");
}

export const removeToken = () => {
    localStorage.removeItem("token");
}

export const isTokenExpired = (token) => {
    try {
        const playload = JSON.parse(atob(token.split('.')[1]));
        const exp = playload.exp * 1000; 
        return Date.now() > exp;
    } catch (e) {
        return true;
    }
}