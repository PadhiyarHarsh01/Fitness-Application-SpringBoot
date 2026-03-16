import api from "./axios";

const getProfile = () => {
    return api.get("/api/user/profile");
}

const updateProfile = (data) => {
    return api.put("/api/user/profile", data);
}

const changePassword = (data) => {
    return api.put("/api/user/change-password", data);
}

export { getProfile, updateProfile, changePassword };