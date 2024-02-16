export interface IProduct {
    id: number;
    name: string;
    qty: number;
    price: number;
    photo: string;
    category: number;
}

export interface IProductList {
    products: IProduct[]
}