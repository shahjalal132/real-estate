import "../css/app.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = "TENANTS HQ";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob([
            './web/Pages/**/*.tsx',
            './Pages/**/*.tsx',
        ]);

        // Try to match the page in prioritized order
        const variations = [
            `./web/Pages/${name}.tsx`,
            `./Pages/${name}.tsx`,
        ];

        for (const path of variations) {
            if (pages[path]) {
                return resolvePageComponent(path, pages);
            }
        }

        // Fallback or let it fail naturally
        return resolvePageComponent(`./web/Pages/${name}.tsx`, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App { ...props } />);
    },
    progress: {
        color: "#0066CC",
    },
});
