import api from "./axios";

const generateAIReport = () => {
    return api.get("/api/ai/report")
}

export { generateAIReport }