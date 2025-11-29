export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface PropertyLocation {
    id: number;
    address: string;
    city: string;
    county: string | null;
    state_code: string;
    state_name: string;
    zip: string;
    latitude: number | null;
    longitude: number | null;
    full_address: string | null;
}

export interface PropertyDetail {
    id: number;
    zoning: string | null;
    lot_size_acres: number | null;
    price_per_acre: string | null;
    investment_highlights: string | null;
    summary_details: Record<string, any> | null;
}

export interface Brokerage {
    id: number;
    name: string;
    logo_url: string | null;
    website: string | null;
    address: string | null;
    city: string | null;
    state_code: string | null;
    zip: string | null;
}

export interface Broker {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string | null;
    email: string;
    thumbnail_url: string | null;
    licenses: string[] | null;
    badges: string[] | null;
    is_platinum: boolean;
    brokerage?: Brokerage;
}

export interface PropertyImage {
    id: number;
    url: string;
    position: number;
    is_thumbnail: boolean;
}

export interface Property {
    id: number;
    external_id: number;
    name: string;
    description: string | null;
    marketing_description: string | null;
    asking_price: number;
    formatted_price: string;
    status: string;
    types: string[];
    subtypes: string[] | null;
    url_slug: string;
    external_url: string | null;
    thumbnail_url: string | null;
    number_of_images: number;
    has_flyer: boolean;
    has_video: boolean;
    has_virtual_tour: boolean;
    is_in_opportunity_zone: boolean;
    activated_on: string | null;
    external_updated_on: string | null;
    created_at: string;
    updated_at: string;
    location?: PropertyLocation;
    details?: PropertyDetail;
    brokers?: Broker[];
    images?: PropertyImage[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
