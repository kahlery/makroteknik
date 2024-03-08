import React from 'react';
import HomeHero from '../components/home/HomeHero';
import LatestNewsGrid from '../components/home/LatestNewsGrid';

const HomePage = () => {
    return (
        <div className='text-center'>
            <HomeHero className="" />
            <LatestNewsGrid className="" />
        </div>
    );
};

export default HomePage;