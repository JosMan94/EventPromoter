import axios from 'axios'
import store from '../../store/index';
export const promotorService = {
    getPromotor(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/list/user'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.load.status = false;
                return { success: true, data: response.data.data }
            })
            .catch(() => {
                store.state.load.status = false;
                return { success: false }
            })
        return response
    },
    createPromotor(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/create/user'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.load.status = false;
                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                store.state.load.status = false;
                return { success: false, data: error.response.data.data }
            })
        return response
    },
    ticketPromotor(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/promotor/ticket'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.load.status = false;
                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                store.state.load.status = false;
                return { success: false }
            })
        return response
    }

}