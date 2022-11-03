import { createStore } from "vuex";
export default createStore({
    state: {
        typeUser: null,
        codeUser: null,

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