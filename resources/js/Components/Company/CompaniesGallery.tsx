import React from "react";
import CompanyCard from "./CompanyCard";

interface CompaniesGalleryProps {
    companies: any[];
}

const CompaniesGallery: React.FC<CompaniesGalleryProps> = ({ companies }) => {
    return (
        <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20" >
        {
            companies.map((company) => (
                <CompanyCard key= { company.id } company = { company } />
            ))
        }
        </div>
    );
};

export default CompaniesGallery;
