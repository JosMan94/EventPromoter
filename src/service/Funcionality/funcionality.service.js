import axios from 'axios'
import store from '../../store/index';
export const funcionalityService = {

    smsMasivo(mensaje) {
        var security = prompt('Ingresar código de seguridad');
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/send-sms-masivo'
        response = axios
            .post(url, {
                "message": mensaje,
                "securityPass": security
            })
            .then(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true, }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true }
            })
        return response
    },
    emailMasivo(mensaje) {
        var security = prompt('Ingresar código de seguridad');
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/send-email-text-masivo'
        response = axios
            .post(url, {
                "message": mensaje,
                "securityPass": security
            })
            .then(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: true, }
            })
            .catch(() => {
                store.state.load.status = false;
                store.state.nav.status = false
                return { success: false }
            })
        return response
    },
}