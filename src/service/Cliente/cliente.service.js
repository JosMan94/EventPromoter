import axios from 'axios'
export const clientService = {
    getEvent(data) {

        let response
        let url = 'https://promotoresback.azurewebsites.net/api/list-events'
        response = axios
            .post(url, { order_type: 'id' })
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
        let url = 'https://promotoresback.azurewebsites.net/api/client/auth'
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
            url = 'https://promotoresback.azurewebsites.net/api/event-invitation/' + codeEvent + '/' + codePromotor

        } else {
            url = 'https://promotoresback.azurewebsites.net/api/event-invitation/' + codeEvent
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
        let url = 'https://promotoresback.azurewebsites.net/api/client/register'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch((error) => {

                if (error.response.data.data === null) {
                    return { success: false, data: error.response.data.message }
                } else {
                    return { success: false, data: error.response.data.data }
                }

            })
        return response
    },
    getClient(data) {
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/client/list'
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