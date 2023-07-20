import axios from 'axios'
import store from '../../store/index';
export const eventoService = {
    createEvent(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/create-event'
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
    updateStatusEvent(id, dataStatus) {

        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/status-change-events'
        response = axios
            .put(url, {
                "id_event": id,
                "status": dataStatus
            })
            .then(() => {
                store.state.load.status = false;
                return { success: true }
            })
            .catch(() => {
                store.state.load.status = false;
                return { success: false }
            })
        return response
    },


}