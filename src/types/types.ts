export interface Product {
    image: string;
    title: string;
    price: string;
}

export interface Category {
    name: string;
    products: Product[]
}

export type Alignment = 'left' | 'center' | 'right';
