import axios from 'axios'
export const clientService = {
    getEvent(data) {
        let response
        let url = '/api/list-events'
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
        let url = '/api/client/auth'
        response = axios
            .post(url, data)
            .then(response => {
                console.log(response, "response del login");
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
        if (codePromotor.length === 0) {
            url = '/api/event-invitation/' + codeEvent
        } else {
            url = '/api/event-invitation/' + codeEvent + '/' + codePromotor
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
        let url = '/api/client/register'
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
    getClient(data) {
        let response
        let url = '/api/client/list'
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