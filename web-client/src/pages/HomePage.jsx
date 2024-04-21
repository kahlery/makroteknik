import React, { useState, useEffect } from 'react';
import HomeHero from '../components/home/HomeHero';
import LatestNewsGrid from '../components/home/LatestNewsGrid';
import ListingGrid from '../components/content/ListingGrid';

const productsListUrl = process.env.PUBLIC_URL + '/data/products.json';
const videoUrl = process.env.PUBLIC_URL + '/videos/hero.mp4';

const HomePage = () => {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        // Ürünleri yükle
        fetch(productsListUrl)
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.error('Error loading products:', error));
    }, []);


    return (
        <div className='text-start flex flex-col gap-8 mb-8'>
            <HomeHero />
            <div className="text-white pb-12 mx-4 lg:mx-0 lg:px-64">
                <ListingGrid productsList={productsList} isFeatured={true} />
            </div>
            <video autoPlay loop muted className='overflow-hidden flex mx-auto h-[450px] lg:h-[500px] w-full bg-black shadow-lg'>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <LatestNewsGrid />
        </div >
    );
};

export default HomePage;