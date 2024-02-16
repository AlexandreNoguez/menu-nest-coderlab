export interface ICategory {
    id: number;
    name: string;
    parent_id: number | null
}

export interface ICategoryList {
    categories: ICategory[]
}