import axios from 'axios'
import store from '../../store/index';
export const ticketService = {
    reenviarTicket(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/reenviar/ticket'
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
    getTickets(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/ticket/list'
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
    detailTIcket(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/detail/ticket'
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
    }
}