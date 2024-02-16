import { IProduct } from "../types/IProduct"

export const ProductCard = ({ photo, name, qty, price, category }: IProduct) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md w-64 m-4">
            <img src={photo} alt={name} className="rounded-lg mb-4" />
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-600">Quantity: {qty}</p>
            <p className="text-sm text-gray-600">Price: ${price}</p>
            <p className="text-sm text-gray-600">Category: {category}</p>
        </div>
    )
}