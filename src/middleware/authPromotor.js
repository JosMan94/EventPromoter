import store from "../store";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default function administador(to, from, next) {
    const existSession = cookies.get('session');
    const existCode = cookies.get('code');
    if (existSession && existCode) {
        store.state.typeUser = existSession;
        store.state.codeUser = existCode;
        if (store.state.typeUser === 'promotor' && existSession === 'promotor') {
            next();
        } else {
            store.state.typeUser = null;
            store.state.codeUser = null;
            next("/");
        }

    } else {
        store.state.typeUser = null;
        store.state.codeUser = null;
        next("/");
    }
}