import api from "./axios";

const getAdminStats = () => {
    return api.get("/api/admin/dashboard")
}

const getAllUsers = () => {
    return api.get("/api/admin/users")
}

const changeUserRole = (id, role) => {
    return api.put(`/api/admin/users/${id}/role?role=${role}`)
}

const disableUser = (id) => {
    return api.put(`/api/admin/users/${id}/disable`)
}

const deleteUser = (id) => {
    return api.delete(`/api/admin/users/${id}`)
}

const monthlyGrowth = () => {
    return api.get("/api/admin/monthly-growth")
}

const aiInsights = () => {
    return api.get("/api/admin/platform-ai-report")
}

export { getAdminStats, getAllUsers, changeUserRole, disableUser, deleteUser, monthlyGrowth, aiInsights }