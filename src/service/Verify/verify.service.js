import axios from 'axios'
import store from '../../store/index';
export const verifyService = {
    verifyTicket(data) {
        store.state.load.status = true;
        let response
        var url = "";
        if (data.promotor !== null) {
            url = 'https://promotoresback.azurewebsites.net/api/ticket-asist/' + data.cliente + '/' + data.evento + '/' + data.promotor;
        } else {
            url = 'https://promotoresback.azurewebsites.net/api/ticket-asist/' + data.cliente + '/' + data.evento;
        }
        // Obtener la fecha y hora actual
        const fechaHoraActual = new Date();
        const fechaActual = fechaHoraActual.toISOString().slice(0, 10);
        const horaActual = fechaHoraActual.toISOString().slice(11, 19);
        response = axios
            .post(url, {
                'date_scanner': fechaActual + ' ' + horaActual
            })
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
    searchTable(data) {
        store.state.load.status = true;
        let response
        var url = 'https://promotoresback.azurewebsites.net/api/search';
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
    }
}