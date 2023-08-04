import axios from 'axios'
import store from '../../store/index';
export const regaloService = {

    createRegaloForUser(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/created-gift-for-user'
        response = axios
            .post(url, data)
            .then(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    updateStatusRegalo(id, dataStatus) {

        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/status-change-regalo'
        response = axios
            .put(url, {
                "id_regalo": id,
                "status": dataStatus
            })
            .then(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    verifyRegalo(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/reclamar/regalo'
        response = axios
            .post(url, data)
            .then(response => {

                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true, message: response.data.message, data: response.data.data, promotor: response.data.promotor }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    getRegalo(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/regalo/list'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true, data: response.data.data }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    createRegalo(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/regalo/created'
        response = axios
            .post(url, data)
            .then(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },


}