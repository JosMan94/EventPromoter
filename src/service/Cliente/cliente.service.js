import axios from 'axios'
export const clientService = {
    getEvent(data) {
        let response
        let url = 'https://backend.niiru.club/api/list-events'
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
    login(data) {
        let response
        let url = 'https://backend.niiru.club/api/client/auth'
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
    getDetailEnvet(codeEvent, codePromotor) {

        let response
        var url = '';

        if (codePromotor) {
            url = 'https://backend.niiru.club/api/event-invitation/' + codeEvent
        } else {
            url = 'https://backend.niiru.club/api/event-invitation/' + codeEvent + '/' + codePromotor
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
    registerEvent(data) {
        let response
        let url = 'https://backend.niiru.club/api/client/register'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                return { success: false, data: error.response.data.data }
            })
        return response
    },
    getClient(data) {
        let response
        let url = 'https://backend.niiru.club/api/client/list'
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