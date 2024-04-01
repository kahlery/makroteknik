import React from 'react';
import { Call, Mail } from '@mui/icons-material';

const TopBar = () => {
    return (
        <div className="backdrop-blur-sm bg-primary shadow-inner text-gray-400 bg-opacity-100 py-2 px-6 lg:px-64 top-0 text-sx w-full fixed z-50">
            <div className="mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-start text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem]">info@makroteknik.com.uk</div>
                    </div >
                    <div className="flex flex-row gap-2 items-center">
                        <Call sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem]">+44 216 313 08 08</div>
                    </div>
                </div>
                <button className="border-2 border-secondary p-2 text-xs shadow-lg">Get An Offer</button>
            </div>
        </div>
    );
};

export default TopBar;