import axios from 'axios'
export const eventoService = {
    createEvent(data) {
        let response
        let url = 'http://ec2-3-18-103-143.us-east-2.compute.amazonaws.com/api/create-event'
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