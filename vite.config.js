import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: {
            // tinymce の package.json main は tinymce.js（tinymce/tinymce というファイルは無い）
            tinymce: path.resolve(__dirname, "node_modules/tinymce"),
        },
    },
    optimizeDeps: {
        include: ["tinymce"],
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js"
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: true,
        origin: "https://vite.localhost",
        hmr: {
            host: "vite.localhost",
        },
        watch: {
            usePolling: true,
        },
        allowedHosts: [
            "dev.localhost",
            "vite.localhost",
            "sb.localhost"
        ],
        cors: {
            origin: [
                "https://dev.localhost",
                "https://vite.localhost",
                "https://sb.localhost",
            ],
            credentials: true,
        },
    },
});
