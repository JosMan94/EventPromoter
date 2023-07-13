import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default ({ mode }) => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
    };
    return defineConfig({
        server: {
            port: 8080
        },
        // server: {
        //     port: process.env.VITE_PORT,
        //     proxy: {
        //         "/api": {
        //             changeOrigin: true,
        //             target: process.env.VITE_PROXY_URI,
        //             secure: true,
        //             ws: true,
        //         },
        //     },
        // },
        plugins: [vue()],
    });
}