import apiClient from "./api";

const InchargeServices = {
    getAll: (payload) => {
        return apiClient.get("incharge", {
            params:payload
        });
    },
    getAllSimpleIncharge: (payload) => {
        return apiClient.get("inchargeList", {
            params:payload
        });
    },
    getById: (payload) => {
        return apiClient.post("incharge", payload);
    },    
    add: (payload) => {
        return apiClient.post("incharge", payload);
    },
    update: (payload) => {
        return apiClient.put("incharge", payload);
    },
    delete: (payload) => {
        return apiClient.delete("incharge", {data:payload});
    },
};

export default InchargeServices;
