import apiClient from "./api";

const InchargeInfoServices = {
    getAll: (payload) => {
        return apiClient.get("inchargeInfo", {
            params:payload
        });
    },   
    add: (payload) => {
        return apiClient.post("inchargeInfo", payload);
    },
    update: (payload) => {
        return apiClient.put("inchargeInfo", payload);
    },
    delete: (payload) => {
        return apiClient.delete("inchargeInfo", {data:payload});
    },
    
};

export default InchargeInfoServices;
