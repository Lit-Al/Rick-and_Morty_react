import axios from "axios";


export default class GetResultsApi {
    static async getAll(url, page = 1) {
        try {
            const response = await axios.get(url, {
                params: {
                    page: page
                }
            });
            return response.data
        } catch (error) {
            console.log(error.message);
            return false;
        } 
    }

    static async getById(url, id) {
        try {
            const response = await axios.get(url + id);
            return response.data
        } catch (error) {
            console.log(error.message);
            return false;
        } 
    }
}

