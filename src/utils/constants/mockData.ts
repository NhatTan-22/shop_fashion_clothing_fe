import { IProduct } from '../interfaces/interfaceProduct';

export const mockData: IProduct[] = [
    {
        productCode: 'P001',
        productName: 'T-shirt Basic',
        productImage: 'https://example.com/images/tshirt-basic.jpg',
        description: 'A basic and comfortable T-shirt for everyday use.',
        supplierCode: 'SUP001',
        status: true,
        price: {
            sellingPrice: 20,
            importPrice: 10,
            promotionPrice: 18,
        },
        variants: [
            {
                image: [''],
                color: 'White',
                sizes: [
                    { size: 'S', storeQuantity: 50, importQuantity: 100, sellingQuantity: 20 },
                    { size: 'M', storeQuantity: 30, importQuantity: 80, sellingQuantity: 15 },
                    { size: 'L', storeQuantity: 20, importQuantity: 70, sellingQuantity: 10 },
                ],
            },
            {
                image: [''],
                color: 'Black',
                sizes: [
                    { size: 'S', storeQuantity: 60, importQuantity: 120, sellingQuantity: 25 },
                    { size: 'M', storeQuantity: 40, importQuantity: 90, sellingQuantity: 20 },
                    { size: 'L', storeQuantity: 30, importQuantity: 60, sellingQuantity: 15 },
                ],
            },
            {
                image: [''],
                color: 'White',
                sizes: [
                    { size: 'S', storeQuantity: 50, importQuantity: 100, sellingQuantity: 20 },
                    { size: 'M', storeQuantity: 30, importQuantity: 80, sellingQuantity: 15 },
                    { size: 'L', storeQuantity: 20, importQuantity: 70, sellingQuantity: 10 },
                ],
            },
            {
                image: [''],
                color: 'Black',
                sizes: [
                    { size: 'S', storeQuantity: 60, importQuantity: 120, sellingQuantity: 25 },
                    { size: 'M', storeQuantity: 40, importQuantity: 90, sellingQuantity: 20 },
                    { size: 'L', storeQuantity: 30, importQuantity: 60, sellingQuantity: 15 },
                ],
            },
            {
                image: [''],
                color: 'White',
                sizes: [
                    { size: 'S', storeQuantity: 50, importQuantity: 100, sellingQuantity: 20 },
                    { size: 'M', storeQuantity: 30, importQuantity: 80, sellingQuantity: 15 },
                    { size: 'L', storeQuantity: 20, importQuantity: 70, sellingQuantity: 10 },
                ],
            },
            {
                image: [''],
                color: 'Black',
                sizes: [
                    { size: 'S', storeQuantity: 60, importQuantity: 120, sellingQuantity: 25 },
                    { size: 'M', storeQuantity: 40, importQuantity: 90, sellingQuantity: 20 },
                    { size: 'L', storeQuantity: 30, importQuantity: 60, sellingQuantity: 15 },
                ],
            },
        ],
        category: 'Clothing',
    },
    {
        productCode: 'P002',
        productName: 'Running Shoes',
        productImage: 'https://example.com/images/running-shoes.jpg',
        description: 'Lightweight and durable running shoes for all terrains.',
        supplierCode: 'SUP002',
        status: false,
        price: {
            sellingPrice: 50,
            importPrice: 30,
            promotionPrice: 45,
        },
        variants: [
            {
                image: [''],
                color: 'Blue',
                sizes: [
                    { size: '8', storeQuantity: 20, importQuantity: 50, sellingQuantity: 10 },
                    { size: '9', storeQuantity: 15, importQuantity: 40, sellingQuantity: 8 },
                ],
            },
            {
                image: [''],
                color: 'Red',
                sizes: [
                    { size: '8', storeQuantity: 25, importQuantity: 60, sellingQuantity: 12 },
                    { size: '9', storeQuantity: 20, importQuantity: 50, sellingQuantity: 10 },
                ],
            },
            {
                image: [''],
                color: 'Blue',
                sizes: [
                    { size: '8', storeQuantity: 20, importQuantity: 50, sellingQuantity: 10 },
                    { size: '9', storeQuantity: 15, importQuantity: 40, sellingQuantity: 8 },
                ],
            },
            {
                image: [''],
                color: 'Red',
                sizes: [
                    { size: '8', storeQuantity: 25, importQuantity: 60, sellingQuantity: 12 },
                    { size: '9', storeQuantity: 20, importQuantity: 50, sellingQuantity: 10 },
                ],
            },
        ],
        category: 'Footwear',
    },
];

export const discountContent = [
    {
        label: 'Classic Exclusive',
        title: "Women's Collection",
        discount: 'UPTO 40% OFF',
    },
    {
        label: 'Summer Special',
        title: "Men's Summer Collection",
        discount: 'UPTO 50% OFF',
    },
    {
        label: 'Festive Sale',
        title: "Kids' Wear",
        discount: 'Flat 30% OFF',
    },
    {
        label: 'Winter Deals',
        title: 'Outerwear & Jackets',
        discount: 'UPTO 60% OFF',
    },
];
