import axios from 'axios'
export const eventoService = {
    createEvent(data) {
        let response
        let url = 'https://backend.niiru.club/api/create-event'
        response = axios
            .post(url, data)
            .then(response => {

                return { success: true, data: response.data.data }
            })
            .catch((error) => {
                console.log(error);
                return { success: false }
            })
        return response
    },


}