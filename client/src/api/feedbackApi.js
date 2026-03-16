import api from "./axios";

const submitFeedback = (data) => {
    return api.post("/api/feedback", data);
} 

const getAllFeedback = () => {
    return api.get("/api/feedback");
}

export { submitFeedback, getAllFeedback };