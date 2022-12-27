import apiClient from "./api";

const StudentServices = {
    getAll: (payload) => {
        return apiClient.get("student", {
            params:payload
        });
    },
    getById: (payload) => {
        return apiClient.post("student", payload);
    },    
    add: (payload) => {
        return apiClient.post("student", payload);
    },
    update: (payload) => {
        return apiClient.put("student", payload);
    },
    delete: (payload) => {
        return apiClient.delete("student", {data:payload});
    },
    getALlStudentByIncharge: (payload) => {
        return apiClient.get("getALlStudentByIncharge", {params:payload});
    },
    addStudentResult: (payload) => {
        return apiClient.post("addStudentResult", {data:payload});
    },
    getStudentInfo: (payload) => {
        return apiClient.get("getStudentInfo", {params:payload});
    }
};

export default StudentServices;
