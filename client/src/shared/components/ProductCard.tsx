import { IProduct } from "../types/IProduct"

export const ProductCard = ({ photo, name, qty, price, category }: IProduct) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md w-64 h-52 m-4">
            <img src={photo} alt={name} className="rounded-lg mb-4 max-w-[120px] h-24 mx-auto" />
            <h2 className="text-lg font-semibold">{name}</h2>
            {/* <p className="text-sm text-gray-600">Quantity: {qty}</p> */}
            <p className="text-sm text-gray-600">Preço: R${price}</p>
            {/* <p className="text-sm text-gray-600">Category: {category}</p> */}
        </div>
    )
}