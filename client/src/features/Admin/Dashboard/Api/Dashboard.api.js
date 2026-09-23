import axiosInstance  from "../../../../shared/services/axiosInstance" ; 
export const getHomeDataAPI = async() =>{
    try {
        const response = await axiosInstance.get("/Admin/");
        return response.data
    } catch (error) {
        console.error(`error at Admin.api.getHomeData ${error}`);
    }
}
