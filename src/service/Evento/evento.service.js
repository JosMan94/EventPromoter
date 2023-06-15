import axios from 'axios'
export const eventoService = {
    createEvent(data) {
        let response
        let url = 'https://promotoresback.azurewebsites.net/api/create-event'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                return { success: false, data: error.response.data.data }
            })
        return response
    },


}