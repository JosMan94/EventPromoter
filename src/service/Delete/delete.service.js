    import axios from 'axios';

    export const deleteService = {

        deletemultiple(data, type) {

            let response
            let url = 'http://localhost:8000/api/delete-multiple'
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