import axios from 'axios'
import store from '../../store/index';
export const ticketService = {
    exportTicket() {
        axios.get('https://promotoresback.azurewebsites.net/api/dowload/excel/tickets')
            .then(response => {
                // La respuesta contiene el archivo Excel
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'datos.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error al obtener los datos en Excel:', error);
            });
    },
    dowloadTicket(id) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/descarga-ticket/' + id
        response = axios
            .get(url, { responseType: 'blob' })
            .then(response => {
                store.state.load.status = false;
                store.state.nav.status = false
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Ticket.pdf');
                document.body.appendChild(link);
                link.click();
                return { success: true, }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
    reenviarTicket(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/reenviar/ticket'
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
    getTickets(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/ticket/list'
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
    detailTIcket(data) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/detail/ticket'
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