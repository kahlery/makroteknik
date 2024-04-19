import React from 'react';
import { Call, Mail } from '@mui/icons-material';

const TopBar = () => {
    return (
        <div className="bg-white text-black py-2 px-6 lg:px-64 top-0 text-sx w-full fixed z-50 border-t-[5px] border-secondary shadow-sm border-b-gray-200">
            <div className="mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-black">info@makroteknik.com.uk</div>
                    </div >
                    <div className="flex flex-row gap-2 items-center">
                        <Call sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-black">+44 216 313 08 08</div>
                    </div>
                </div>
                <button className="border-2 border-secondary p-2 text-xs shadow-lg text-black">Get An Offer</button>
            </div>
        </div>
    );
};

export default TopBar;