export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    user_type: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
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
    investment_type: string | null;
    investment_sub_type: string | null;
    class: string | null;
    lease_type: string | null;
    tenancy: string | null;
    lease_expiration: string | null;
    ground_lease: boolean | null;
    net_rentable_sqft: number | null;
    cap_rate: number | null;
    pro_forma_noi: number | null;
    price_per_unit: number | null;
    occupancy_date: string | null;
    parking_spaces: number | null;
    ceiling_height: string | null;
    ownership: string | null;
    sale_condition: string | null;
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
    asking_price: string;
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

export interface TennentCompany {
    id: number;
    tenant_name: string;
    industry: string | null;
    territory: string | null;
    hq_market: string | null;
    locations: number | null;
    sf_occupied: string | null;
    highest_use_by_sf: string | null;
    employees: number | null;
    growth: string | null;
    revenue: string | null;
    credit_rating: string | null;
    established: number | null;
    parent_company: string | null;
    website: string | null;
    hq_phone: string | null;
    hq_city: string | null;
    hq_state: string | null;
    hq_postal_code: string | null;
    hq_country: string | null;
    naics: string | null;
    sic: string | null;
    created_at: string;
    updated_at: string;
}

export interface TennentLocation {
    id: number;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    tenant_name: string;
    company_id?: number | null;
    sf_occupied: string | null;
    floor: string | null;
    space_use: string | null;
    moved_in: string | null;
    commencement: string | null;
    expiration: string | null;
    percent_of_building: string | null;
    occupancy_type: string | null;
    rent_per_sf_year: string | null;
    rent_type: string | null;
    employees: number | null;
    sf_per_employee: string | null;
    industry: string | null;
    star_rating: number | null;
    green_rating: string | null;
    building_name: string | null;
    building_park: string | null;
    center_name: string | null;
    property_type: string | null;
    secondary_type: string | null;
    center_type: string | null;
    market: string | null;
    submarket: string | null;
    location_type: string | null;
    landlord: string | null;
    landlord_representative: string | null;
    tenant_representative: string | null;
    best_tenant_contact: string | null;
    best_tenant_phone: string | null;
    location_phone: string | null;
    website: string | null;
    future_move: string | null;
    future_move_type: string | null;
    signed: string | null;
    suite: string | null;
    zip: string | null;
    time_in_building: string | null;
    store_type: string | null;
    naics: string | null;
    sic: string | null;
    property_id: number | null;
    created_at: string;
    updated_at: string;
}
