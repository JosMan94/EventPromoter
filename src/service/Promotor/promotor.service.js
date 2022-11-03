import axios from 'axios'
export const promotorService = {
    getPromotor(data) {
        let response
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/list/user'
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
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/create/user'
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
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/promotor/ticket'
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