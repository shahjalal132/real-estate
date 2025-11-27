import React from 'react';
import { router } from '@inertiajs/react';

interface Props {
    filters: {
        search?: string;
        type?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
        direction?: string;
    };
}

export default function FilterSidebar({ filters }: Props) {
    const [values, setValues] = React.useState({
        search: filters.search || '',
        type: filters.type || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        router.get(route('properties.index'), values as any, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    return (
        <div className= "bg-white rounded-xl shadow-sm border border-gray-100 p-6" >
        <h3 className="text-lg font-bold text-gray-900 mb-6" > Filters </h3>

            < div className = "space-y-6" >
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" > Search </label>
                    < input
    type = "text"
    name = "search"
    value = { values.search }
    onChange = { handleChange }
    onKeyDown = { handleKeyDown }
    placeholder = "City, address, or keyword"
    className = "w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
        </div>

        < div >
        <label className="block text-sm font-medium text-gray-700 mb-2" > Property Type </label>
            < select
    name = "type"
    value = { values.type }
    onChange = { handleChange }
    className = "w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
        >
        <option value="" > All Types </option>
            < option value = "Land" > Land </option>
                < option value = "Retail" > Retail </option>
                    < option value = "Office" > Office </option>
                        < option value = "Industrial" > Industrial </option>
                            < option value = "Multifamily" > Multifamily </option>
                                </select>
                                </div>

                                < div >
                                <label className="block text-sm font-medium text-gray-700 mb-2" > Price Range </label>
                                    < div className = "grid grid-cols-2 gap-2" >
                                        <input
                            type="number"
    name = "min_price"
    value = { values.min_price }
    onChange = { handleChange }
    placeholder = "Min"
    className = "w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
        <input
                            type="number"
    name = "max_price"
    value = { values.max_price }
    onChange = { handleChange }
    placeholder = "Max"
    className = "w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
        </div>
        </div>

        < button
    onClick = { applyFilters }
    className = "w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm shadow-blue-600/20"
        >
        Apply Filters
            </button>

    {
        (values.search || values.type || values.min_price || values.max_price) && (
            <button
                        onClick={
            () => {
                setValues({ search: '', type: '', min_price: '', max_price: '' });
                router.get(route('properties.index'));
            }
        }
        className = "w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
            >
            Clear All
                </button>
                )
    }
    </div>
        </div>
    );
}
