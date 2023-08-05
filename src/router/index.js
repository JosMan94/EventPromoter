import { createRouter, createWebHistory } from "vue-router";
import administador from "../middleware/authAdmin";
import promotor from "../middleware/authPromotor";
const routes = [{
        path: "/",
        name: "Home",
        component: () =>
            import ('../views/Cliente/Home.vue'),
    },
    {
        path: "/register/event/:code/:promotor?",
        name: "RegisterEvent",
        component: () =>
            import ('../views/Cliente/DetailEvent.vue'),
    },
    {
        path: "/admin/:viewAdmin",
        name: "Administrador",
        component: () =>
            import ('../views/Administrador/Home.vue'),
        beforeEnter: administador,
    },
    {
        path: "/promotor/:viewPromotor",
        name: "Promotor",
        component: () =>
            import ('../views/Promotor/Home.vue'),
        beforeEnter: promotor,
    },

    {
        path: "/security/verify/entry/:codeClient/:codeEvent/:codePromotor?",

        name: "VerifyTicket",
        component: () =>
            import ('../views/Verificar/VerificarEntrada.vue'),

    },
    {
        path: "/verify/security/regalo/promotor/:codeRegalo/:codePromotor",
        name: "VerifyRegalo",
        component: () =>
            import ('../views/Verificar/VerificarRegalo.vue'),

    },
    {
        path: "/verify/security/regalo/promotor/perzonalizado/:codeRegalo/:codePromotor",
        name: "VerifyRegaloForPromotor",
        component: () =>
            import ('../views/Verificar/VerificarRegaloPromotor.vue'),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),

});

export default router;