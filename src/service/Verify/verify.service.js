import axios from 'axios'

export const verifyService = {
    verifyTicket(data) {
        let response
        var url = "";
        if (data.promotor !== null) {
            url = 'https://backend.niiru.club/api/ticket-asist/' + data.cliente + '/' + data.evento + '/' + data.promotor;
        } else {
            url = 'https://backend.niiru.club/api/ticket-asist/' + data.cliente + '/' + data.evento;
        }

        response = axios
            .post(url)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch(() => {
                return { success: false }
            })
        return response
    },
    searchTable(data) {
        let response
        var url = 'https://backend.niiru.club/api/search';
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