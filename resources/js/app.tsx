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
            './admin/Pages/**/*.tsx',
        ]);

        let path = `./web/Pages/${name}.tsx`;

        // Check if we are on client side and if strict prefix is needed
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
            path = `./admin/Pages/${name}.tsx`;
        }

        // Fallback or let it fail naturally if the specific file doesn't exist?
        // Usually, resolvePageComponent expects the exact key.
        // We will try to allow cross-access if needed, or just stick to strict.
        // Given the request, strict seems preferred, but if a page is missing it will fail.
        // We can check if it exists in the glob result.

        if (!pages[path]) {
            // Check reverse scenario if not found in expected location
            const otherPath = path.includes('/admin/')
                ? `./web/Pages/${name}.tsx`
                : `./admin/Pages/${name}.tsx`;

            if (pages[otherPath]) {
                return resolvePageComponent(otherPath, pages);
            }
        }

        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App { ...props } />);
    },
    progress: {
        color: "#0066CC",
    },
});
