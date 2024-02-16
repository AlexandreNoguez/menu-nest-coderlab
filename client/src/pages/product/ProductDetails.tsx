import { useLocation } from "react-router-dom";
import { Header } from "../../shared/components/Header";

export const ProductDetails = () => {
    const { state } = useLocation();


    return (
        <div>
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={state.photo} alt={state.name} className="w-full h-64 object-cover object-center" />
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{state.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">ID: {state.id}</p>
                        <p className="text-lg text-gray-700 mb-4">{state.description}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-gray-900 font-bold">${state.price}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Adicionar ao carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}