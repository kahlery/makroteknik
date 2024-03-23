import React from 'react';
import HomeHero from '../components/home/HomeHero';
import LatestNewsGrid from '../components/home/LatestNewsGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ListingGrid from '../components/content/ListingGrid';

const HomePage = () => {
    const featuredProductsList = [
        {
            title: "Plate Mounted Axial Flow Fan",
            imageUrl: "https://picsum.photos/500/500",
            code: "Product code: HXBR/T Series",
            description: "Plate mounted axial flow fans manufactured from high-grade galvanized steel and provided with a Sickle blade impeller, low sound level, protected against corrosion le blade impeller, low sound level, protected against corrosionle blade impeller, low sound level, protected against corrosionle blade impeller, low sound level, protected against corrosionle blade impeller, low sound level, protected against corrosion"
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "https://picsum.photos/500/501",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "https://picsum.photos/500/502",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "https://picsum.photos/500/503",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
        {
            title: "Low Pressure Cased Axial Fans",
            imageUrl: "https://picsum.photos/500/504",
            code: "Product code: TCBB/T Series",
            description: "Range of cylindrical cased axial flow fans fitted with aluminum impellers and manufactured from high-grade rolled galvanized steel and protected against corrosion..."
        },
    ];

    return (
        <div className='text-center'>
            <HomeHero />
            <LatestNewsGrid />
            <div className="text-start text-white pb-12 mb-12 lg:px-44 bg-primary border-t-2 border-primary">
                <ListingGrid productsList={featuredProductsList} featured={true} />
            </div>
        </div>
    );
};

export default HomePage;