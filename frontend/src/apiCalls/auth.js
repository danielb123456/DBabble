import { axiosInstance } from './index';
// logic of api calls
export const signupUser = async (user) => { // async since api calls
    try{
        const response = await axiosInstance.post('/api/auth/signup', user);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const loginUser = async (user) => {
    try{
        const response = await axiosInstance.post('/api/auth/login', user);
        return response.data;
    }catch(error){
        return error;
    }
}