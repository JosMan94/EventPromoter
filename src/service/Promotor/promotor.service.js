import axios from 'axios'
export const promotorService = {
    getPromotor(data) {
        let response
        let url = 'https://backend.niiru.club/api/list/user'
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
        let url = 'https://backend.niiru.club/api/create/user'
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
    },
    ticketPromotor(data) {
        let response
        let url = 'https://backend.niiru.club/api/promotor/ticket'
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