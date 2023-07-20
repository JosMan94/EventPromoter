import { createStore } from "vuex";
export default createStore({
    state: {
        typeUser: null,
        codeUser: null,
        load: {
            status: false,
        },
        loadEvent: {
            status: true
        },
        alert: {
            status: false,
            type: '',
            text: '',
        },
        nav: {
            status: false,
        }
    },
    mutations: {
        signOff: state => {
            state.typeUser = null;
            state.codeUser = null;
        },
    },
    actions: {},
    modules: {},
});