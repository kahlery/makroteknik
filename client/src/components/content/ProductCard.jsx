import React from 'react';
import AdjustCartProduct from './AdjustCartProduct';

// stores
import { useCartStore } from '../../stores/CartStore';

const ProductCard = ({
    product, isHorizontalNorVertical,
    setSelectedProduct, setIsModalOpen
}) => {
    // stores
    const isCartProduct = useCartStore((state) => state.cartProducts[product.productId]);

    return (
        <div
            key={product.productId}
            className={`bg-white relative flex flex-col text-sm duration-1000 h-90 border shadow-md pb-4
            hover:scale-100 hover:cursor-pointer hover:border-black
            ${isHorizontalNorVertical ? 'w-48' : ''} ${isCartProduct ? ' shadow-[_5px_5px_rgba(0,_98,_90,_0.2),_10px_10px_rgba(0,_98,_90,_0.1),_15px_15px_rgba(0,_98,_90,_0.05)]' : ' '}`}
            onClick={() => {
                // show product detail in a modal
                console.log('product detail:', product.productId);
                setSelectedProduct(product);
                setIsModalOpen(true);
            }}
        >
            <img
                src={process.env.PUBLIC_URL + product.imageUrl}
                alt={product.title}
                className="h-32 object-scale-down p-4 min-h-32"
            />
            <hr className="border-gray-200 shadow-md my-3 mx-4" />
            <div className="px-3 md:px-4 flex flex-col h-full">
                <h2 className="text-xs mb-2 text-black font-bold line-clamp-1">{product.title}</h2>
                <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                <p className="text-xs text-gray-500 line-clamp-4">{product.description}</p>
                <hr className="border-gray-200 shadow-md my-3" />
                <div className="font-extrabold text-xs flex">
                    <p className="text-black pt-[1.5px]">£ 33.00</p>
                </div>
            </div>
            <div className="mt-3 px-3 md:px-4"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <AdjustCartProduct productId={product.productId} />
            </div>
        </div>
    );
}

export default ProductCard;
