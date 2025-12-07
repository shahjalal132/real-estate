/**
 * Cookie utility functions for storing and retrieving saved filters
 */

export interface SavedFilter {
    id: string;
    name: string;
    duration: string;
    filters: any;
    createdAt: string;
}

const COOKIE_NAME = "saved_filters";
const MAX_COOKIES = 10; // Maximum number of saved filters

/**
 * Get all saved filters from cookies
 */
export function getSavedFilters(): SavedFilter[] {
    if (typeof document === "undefined") return [];

    const cookies = document.cookie.split(";");
    const savedFilters: SavedFilter[] = [];

    cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split("=");
        if (name.startsWith(`${COOKIE_NAME}_`)) {
            try {
                const decoded = decodeURIComponent(value);
                const filter = JSON.parse(decoded);
                savedFilters.push(filter);
            } catch (error) {
                console.error("Error parsing saved filter:", error);
            }
        }
    });

    return savedFilters.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Save a filter to cookies
 */
export function saveFilter(
    name: string,
    duration: string,
    filters: any
): string {
    const id = `filter_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    const savedFilter: SavedFilter = {
        id,
        name,
        duration,
        filters,
        createdAt: new Date().toISOString(),
    };

    // Get existing filters
    const existingFilters = getSavedFilters();

    // Remove oldest if we're at max capacity
    if (existingFilters.length >= MAX_COOKIES) {
        const oldest = existingFilters[existingFilters.length - 1];
        deleteFilter(oldest.id);
    }

    // Set cookie (expires in 1 year)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    const cookieValue = encodeURIComponent(JSON.stringify(savedFilter));
    document.cookie = `${COOKIE_NAME}_${id}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    return id;
}

/**
 * Delete a saved filter
 */
export function deleteFilter(id: string): void {
    if (typeof document === "undefined") return;

    document.cookie = `${COOKIE_NAME}_${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Get a specific saved filter by ID
 */
export function getSavedFilter(id: string): SavedFilter | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === `${COOKIE_NAME}_${id}`) {
            try {
                const decoded = decodeURIComponent(value);
                return JSON.parse(decoded);
            } catch (error) {
                console.error("Error parsing saved filter:", error);
            }
        }
    }
    return null;
}

/**
 * Update a saved filter
 */
export function updateFilter(
    id: string,
    updates: Partial<Pick<SavedFilter, "name" | "duration">>
): boolean {
    const existing = getSavedFilter(id);
    if (!existing) return false;

    const updated: SavedFilter = {
        ...existing,
        ...updates,
    };

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    const cookieValue = encodeURIComponent(JSON.stringify(updated));
    document.cookie = `${COOKIE_NAME}_${id}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    return true;
}
