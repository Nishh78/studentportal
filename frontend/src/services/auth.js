import apiClient from "./api";

const AuthServices = {
    login: ({email, password}) => {
        return apiClient.post("login", {
            email: email,
            password: password,
            status:true
        });
    },    
    logout: () => {
        return apiClient.post("logout", {});
    }
};

export default AuthServices;
