    import axios from 'axios';

    export const deleteService = {

        deletemultiple(data, type) {

            let response
            let url = 'https://promotoresback.azurewebsites.net/api/delete-multiple'
            response = axios
                .post(url, {
                    ids: data,
                    type: type
                })
                .then(() => {
                    return { success: true }
                })
                .catch(() => {
                    return { success: false }
                })
            return response
        }

    }