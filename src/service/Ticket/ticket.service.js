import axios from 'axios'
export const ticketService = {
    reenviarTicket(data) {
        let response
        let url = 'https://backend.niiru.club/api/reenviar/ticket'
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
        let url = 'https://backend.niiru.club/api/ticket/list'
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
        let url = 'https://backend.niiru.club/api/detail/ticket'
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