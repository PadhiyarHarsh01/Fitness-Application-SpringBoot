import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, removeToken } from "../utils/jwt";

export default function useAuthCheck() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if(isTokenExpired(token)) {
            removeToken();
            navigate("/login", {replace : true});
        }
    }, [])
}