import api from "./axios"

const getWeeklyProgress = () => {
    return api.get("/api/progress/weekly")
}

const getMonthlyProgress = () => {
    return api.get("/api/progress/monthly")
}

export { getWeeklyProgress, getMonthlyProgress }