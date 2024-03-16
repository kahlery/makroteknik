import React from 'react';

const imageUrl = process.env.PUBLIC_URL + `images/no-page/8.png`;

const NoPage = () => {
    return (
        <div className="bg-primary flex flex-col items-center justify-center h-screen text-center px-6 lg:px-44 text-orange-600">
            <img
                src={imageUrl}
                alt="404 Not Found Image"
                className="w-64 mb-4"
            />
            <h1 className="text-4xl font-bold">404 Not Found</h1>
            <p className="">Oops! The page you're looking for doesn't exist.</p>
        </div>
    );
};

export default NoPage;