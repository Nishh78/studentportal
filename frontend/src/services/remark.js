import apiClient from "./api";

const RemarkServices = {
    getAll: (payload) => {
        return apiClient.get("remark", {
            params:payload
        });
    },   
    add: (payload) => {
        return apiClient.post("remark", payload);
    },
    update: (payload) => {
        return apiClient.put("remark", payload);
    },
    delete: (payload) => {
        return apiClient.delete("remark", {data:payload});
    },
};

export default RemarkServices;
