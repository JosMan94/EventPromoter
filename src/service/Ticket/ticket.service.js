import axios from 'axios'
export const ticketService = {
    reenviarTicket(data) {
        let response
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/reenviar/ticket'
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
    getTickets(data) {
        let response
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/ticket/list'
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
    detailTIcket(data) {
        let response
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/detail/ticket'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch(() => {
                return { success: false }
            })
        return response
    }
}