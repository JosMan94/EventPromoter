import axios from 'axios'
export const promotorService = {
    getPromotor(data) {
        let response
        let url = 'http://localhost:8000/api/list/user'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch(() => {
                return { success: false }
            })
        return response
    },
    createPromotor(data) {
        let response
        let url = 'http://localhost:8000/api/create/user'
        response = axios
            .post(url, data)
            .then(response => {

                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                console.log(error);
                return { success: false, data: error.response.data.data }
            })
        return response
    },
    ticketPromotor(data) {
        let response
        let url = 'http://localhost:8000/api/promotor/ticket'
        response = axios
            .post(url, data)
            .then(response => {

                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                console.log(error);
                return { success: false }
            })
        return response
    }

}