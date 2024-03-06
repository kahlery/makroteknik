import React from 'react';

const LatestNewsGrid = () => {
    return (
        <div className='bg-blue-100'>
            <p className="text-2xl font-bold text-primary mb-4">Latest News</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 lg:px-44 gap-12">
                <div className="bg-white shadow-2xl p-2 h-64">
                    <img src="https://via.placeholder.com/150" alt="placeholder" className="w-full h-40 object-cover mb-2" />
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for business</h3>
                </div>
                <div className="bg-white shadow-2xl p-2 h-64">
                    <img src="https://via.placeholder.com/150" alt="placeholder" className="w-full h-40 object-cover mb-2" />
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for business</h3>
                </div>
                <div className="bg-white shadow-2xl p-2 h-64">
                    <img src="https://via.placeholder.com/150" alt="placeholder" className="w-full h-40 object-cover mb-2" />
                    <h3 className="text-lg font-bold mb-2">Makro Tech LTD is now open for business</h3>
                </div>
            </div >
        </div >
    );
};

export default LatestNewsGrid;