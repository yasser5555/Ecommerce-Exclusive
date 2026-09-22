import axiosInstance  from "../../../shared/services/axiosInstance" ; 

export const getHomeData = async() =>{
    try {
        const response = await axiosInstance.get("/Admin/");
         
        return response.data
    } catch (error) {
        console.error(`error at Admin.api.getHomeData ${error}`);
    }
}