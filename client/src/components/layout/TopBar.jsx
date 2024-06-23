import React from 'react';
import { Call, Mail } from '@mui/icons-material';

const TopBar = () => {
    const logo = process.env.PUBLIC_URL + '/logo.svg';

    return (
        <div className="flex flex-row bg-black bg-opacity-80 text-secondary py-[8px] px-2 lg:px-64 top-0 text-sx w-full fixed z-[1000]">
            <div className="ml-4 flex flex-row items-center w-full">
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-white">info@makroteknik.com.uk</div>
                    </div >
                    <div className="flex flex-row gap-2 items-center">
                        <Call sx={{ fontSize: '1.3rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-white">+44 216 313 08 08</div>
                    </div>
                </div>
                <button className="flex ml-auto border-white border px-3 py-1 text-xs shadow-md text-white">Get An Offer</button>
            </div>
        </div>
    );
};

export default TopBar;