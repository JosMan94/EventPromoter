import axios from 'axios'
import store from '../../store/index';

export const clientService = {
    exportClients() {
        store.state.load.status = true;
        axios.get('https://promotoresback.azurewebsites.net/api/dowload/excel/clientes')
            .then(response => {
                store.state.load.status = false;
                store.state.nav.status = false
                    // La respuesta contiene el archivo Excel
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Clientes.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                store.state.load.status = false;
                store.state.nav.status = false
                console.error('Error al obtener los datos en Excel:', error);
            });
    },
    getEvent(data) {
        store.state.loadEvent.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/list-events'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.loadEvent.status = false;
                store.state.nav.status = false
                return { success: true, data: response.data.data }
            })
            .catch(() => {

                store.state.loadEvent.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    getEventAdmin(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/events-admin-list'
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
    login(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/client/auth'
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
    getDetailEnvet(codeEvent, codePromotor) {
        store.state.load.status = true;
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
    registerEvent(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/client/register'
        response = axios
            .post(url, data)
            .then(response => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                store.state.load.status = false;
                store.state.nav.status = false
                if (error.response.data.data === null) {
                    return { success: false, data: error.response.data.message }
                } else {
                    return { success: false, data: error.response.data.data }
                }

            })
        return response
    },
    getClient(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/client/list'
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