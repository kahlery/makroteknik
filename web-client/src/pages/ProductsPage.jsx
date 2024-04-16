// ProductsPage.jsx

import React, { useEffect, useState } from 'react';
import ListingGrid from "../components/content/ListingGrid";
import FilterSection from "../components/content/FilterSection";

const ProductsPage = () => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        // products.json dosyasını yükle
        fetch(process.env.PUBLIC_URL + '/data/products.json')
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.error('Error loading products:', error));
    }, []);

    return (
        <div>
            <FilterSection />
            <div className="w-screen mt-4 px-0 md:px-64 pt-[130px] pb-10 min-h-screen">
                <div className="mx-4">
                    <ListingGrid productsList={productsList} />
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
