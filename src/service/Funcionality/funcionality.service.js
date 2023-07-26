import axios from 'axios'
import store from '../../store/index';
export const funcionalityService = {

    smsMasivo(mensaje) {
        store.state.load.status = true;
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/send-sms-masivo'
        response = axios
            .post(url, {
                "message": mensaje,
            })
            .then(response => {
                console.log(response, "response");
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