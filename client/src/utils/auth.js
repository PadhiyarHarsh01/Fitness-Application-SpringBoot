import { jwtDecode } from "jwt-decode";
export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if(!token) return null;

    try {
        const decode = jwtDecode(token);
        return decode.role;
    } catch (error) {
        return null;
    }
}

export const logout = () => {
    localStorage.removeItem("token");
}