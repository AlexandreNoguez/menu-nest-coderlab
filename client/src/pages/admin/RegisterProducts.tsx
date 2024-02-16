import { useForm } from "react-hook-form";
import { Header } from "../../shared/components/Header";
import { useEffect, useState } from "react";
import { createNewProduct, getAllProducts } from "../../shared/services/products";
import { IProduct } from "../../shared/types/IProduct";
import { ICategoryList } from "../../shared/types/ICategory";
import { getAllCategories } from "../../shared/services/categories";

export const RegisterProcucts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
    const [chooseAction, setChooseAction] = useState<string>("");
    const [editData, setEditData] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategoryList[]>([]);
    const [productToEdit, setProductToEdit] = useState<IProduct>();

    const onSubmit = async (data: IProduct) => {
        console.log('Dados do produto:', data);
        await createNewProduct(data);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const data: any = await getAllProducts();
            setEditData(data)
        }
        const fetchCategories = async () => {
            const data: any = await getAllCategories();
            setCategories(data)
        }
        fetchProducts();
        fetchCategories();
    }, [])

    useEffect(() => {
        // handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>)
    }, [productToEdit])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProductId = parseInt(event.target.value);
        const selectedProduct = editData.find(product => product.id === selectedProductId);
        setProductToEdit(selectedProduct);
    };

    console.log(editData);
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center gap-4 my-4">
                <h1 className="text-xl">Gerenciar produtos</h1>
                <div className="flex gap-4">
                    <button className="w-28" onClick={() => setChooseAction("add")}>Adicionar</button>
                    <button className="w-28" onClick={() => setChooseAction("edit")}>Editar</button>
                    <button className="w-28" onClick={() => setChooseAction("delete")}>Excluir</button>
                </div>
            </div>
            {chooseAction === "add" ?
                <div className="w-3/4 mx-auto mt-10 p-6 bg-white rounded shadow-md mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Cadastro de Produto</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome do Produto
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: 'Este campo é obrigatório' })}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                                Quantidade
                            </label>
                            <input
                                type="number"
                                id="qty"
                                {...register('qty', { required: 'Este campo é obrigatório' })}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                            {errors.qty && <p className="text-red-500 text-sm">{errors.qty.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Preço
                            </label>
                            <input
                                type="number"
                                id="price"
                                {...register('price', { required: 'Este campo é obrigatório' })}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                URL da Foto
                            </label>
                            <input
                                type="text"
                                id="photo"
                                {...register('photo')}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Categoria
                            </label>
                            <select name="category" id="category" className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                {categories ? categories.map((category: any) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )) : null}
                            </select>
                            {/* <input
                                type="number"
                                id="category"
                                {...register('category', { required: 'Este campo é obrigatório' })}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            /> */}
                            {/* {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>} */}
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Cadastrar Produto
                            </button>
                        </div>
                    </form>
                </div>

                : chooseAction === "edit" ?
                    <div className="flex flex-col items-center justify-center gap-4 my-4">
                        {editData ? (
                            <select name="edit" id="edit" onChange={handleSelectChange}>
                                {editData.map((product: any) => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        ) : <select name="edit" id="edit">
                            <option hidden>Não foi encontrado produtos</option>
                        </select>
                        }
                        {productToEdit ? (
                            <div className="w-3/4 mx-auto mt-10 p-6 bg-white rounded shadow-md">
                                <h2 className="text-2xl font-bold mb-6 text-slate-900">Editar Produto</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Nome do Produto
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register('name', { required: 'Este campo é obrigatório' })}
                                            defaultValue={productToEdit.name} // Preenche com o valor atual do nome do produto
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                        {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                                            Quantidade
                                        </label>
                                        <input
                                            type="number"
                                            id="qty"
                                            {...register('qty', { required: 'Este campo é obrigatório' })}
                                            defaultValue={productToEdit.qty} // Preenche com o valor atual da quantidade do produto
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                        {/* {errors.qty && <p className="text-red-500 text-sm">{errors.qty.message}</p>} */}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Preço
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            {...register('price', { required: 'Este campo é obrigatório' })}
                                            defaultValue={productToEdit.price} // Preenche com o valor atual do preço do produto
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                        {/* {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>} */}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                            URL da Foto
                                        </label>
                                        <input
                                            type="text"
                                            id="photo"
                                            {...register('photo')}
                                            defaultValue={productToEdit.photo} // Preenche com o valor atual da URL da foto do produto
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                            Categoria
                                        </label>
                                        <input
                                            type="number"
                                            id="category"
                                            {...register('category', { required: 'Este campo é obrigatório' })}
                                            defaultValue={productToEdit.category} // Preenche com o valor atual da categoria do produto
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                        {/* {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>} */}
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                        >
                                            Salvar Alterações
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : null}
                    </div>
                    : chooseAction === "delete" ?
                        <div>
                        </div>
                        : null


            }

        </>
    )
}