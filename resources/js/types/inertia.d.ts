import { AxiosInstance } from 'axios';

declare global {
    interface Window {
        axios: AxiosInstance;
    }
}

declare module '@inertiajs/react' {
    interface PageProps {
        [key: string]: unknown;
    }
}

