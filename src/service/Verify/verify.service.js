import axios from 'axios'

export const verifyService = {
    verifyTicket(data) {
        let response
        var url = "";
        if (data.promotor !== null) {
            url = 'https://promotoresback.azurewebsites.net/api/ticket-asist/' + data.cliente + '/' + data.evento + '/' + data.promotor;
        } else {
            url = 'https://promotoresback.azurewebsites.net/api/ticket-asist/' + data.cliente + '/' + data.evento;
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
        var url = 'https://promotoresback.azurewebsites.net/api/search';
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