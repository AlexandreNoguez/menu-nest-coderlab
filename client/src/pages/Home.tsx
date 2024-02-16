import { useEffect, useState } from "react"
import { Header } from "../shared/components/Header"
import { addSampleData, getAllProducts } from "../shared/services/products"
import { IProduct, IProductList } from "../shared/types/IProduct";
import { ProductCard } from "../shared/components/ProductCard";

export const Home = () => {
    const [products, setProducts] = useState<IProductList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [products.length]);

    // console.log("products", products);


    return (
        <div>
            <Header />
            <h2 className="text-center text-xl">Lista de Pratos e Sobremesas</h2>
            <ul className="flex flex-wrap items-center justify-center">
                {
                    !products || !products.length ? (
                        <button className="mt-16" onClick={() => addSampleData()}>Adicionar Dados Iniciais</button>
                    ) : null
                }
                {
                    products?.map((product: any) => (
                        <li key={product.id}>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                qty={product.qty}
                                price={product.price}
                                photo={product.photo}
                                category={product.name}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}