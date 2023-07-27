    import axios from 'axios';
    import store from '../../store/index';
    export const deleteService = {

        deletemultiple(data, type) {
            store.state.load.status = true;
            let response
            let url = 'https://promotoresback.azurewebsites.net/api/delete-multiple'
            response = axios
                .post(url, {
                    ids: data,
                    type: type
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
        }

    }