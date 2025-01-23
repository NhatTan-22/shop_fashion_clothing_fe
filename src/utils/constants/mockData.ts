import { IOrder } from '../interfaces/interfaceOrder';
import { IProduct } from '../interfaces/interfaceProduct';

const products: IProduct[] = [
    {
        _id: '63e4a1c9f5a10a0012aabc01',
        productCode: 'P001',
        productName: 'Áo Thun Nam',
        productImage: 'https://example.com/product1.jpg',
        description: 'Áo thun nam chất liệu cotton thoáng mát, phù hợp cho mùa hè.',
        supplierCode: 'SUP001',
        status: true,
        price: {
            sellingPrice: 200000,
            importPrice: 150000,
            promotionPrice: 180000,
        },
        variants: [
            {
                image: 'https://example.com/variant1_1.jpg',
                productColor: 'Blue',
                productSize: 'M',
                storeQuantity: 20,
                importQuantity: 50,
                sellingQuantity: 15,
            },
            {
                image: 'https://example.com/variant1_2.jpg',
                productColor: 'Blue',
                productSize: 'L',
                storeQuantity: 10,
                importQuantity: 30,
                sellingQuantity: 8,
            },
        ],
        category: 'Thời trang nam',
    },
    {
        _id: '63e4a1c9f5a10a0012aabc02',
        productCode: 'P002',
        productName: 'Quần Jeans Nữ',
        productImage: 'https://example.com/product2.jpg',
        description: 'Quần jeans nữ co giãn, thiết kế thời trang phù hợp cho nhiều dịp.',
        supplierCode: 'SUP002',
        status: true,
        price: {
            sellingPrice: 350000,
            importPrice: 250000,
            promotionPrice: 320000,
        },
        variants: [
            {
                image: 'https://example.com/variant2_1.jpg',
                productColor: 'Black',
                productSize: 'S',
                storeQuantity: 15,
                importQuantity: 40,
                sellingQuantity: 12,
            },
            {
                image: 'https://example.com/variant2_2.jpg',
                productColor: 'Black',
                productSize: 'M',
                storeQuantity: 25,
                importQuantity: 60,
                sellingQuantity: 20,
            },
        ],
        category: 'Thời trang nữ',
    },
    {
        _id: '63e4a1c9f5a10a0012aabc03',
        productCode: 'P003',
        productName: 'Giày Thể Thao',
        productImage: 'https://example.com/product3.jpg',
        description: 'Giày thể thao nhẹ nhàng, phù hợp cho các hoạt động ngoài trời.',
        supplierCode: 'SUP003',
        status: true,
        price: {
            sellingPrice: 500000,
            importPrice: 400000,
            promotionPrice: 450000,
        },
        variants: [
            {
                image: 'https://example.com/variant3_1.jpg',
                productColor: 'White',
                productSize: '41',
                storeQuantity: 30,
                importQuantity: 70,
                sellingQuantity: 25,
            },
            {
                image: 'https://example.com/variant3_2.jpg',
                productColor: 'White',
                productSize: '42',
                storeQuantity: 40,
                importQuantity: 100,
                sellingQuantity: 35,
            },
        ],
        category: 'Giày dép',
    },
    {
        _id: '63e4a1c9f5a10a0012aabc04',
        productCode: 'P004',
        productName: 'Túi Xách Tay',
        productImage: 'https://example.com/product4.jpg',
        description: 'Túi xách tay thời trang, chất liệu cao cấp, phù hợp cho các bữa tiệc.',
        supplierCode: 'SUP004',
        status: true,
        price: {
            sellingPrice: 700000,
            importPrice: 550000,
            promotionPrice: 650000,
        },
        variants: [
            {
                image: 'https://example.com/variant4_1.jpg',
                productColor: 'Pink',
                productSize: 'One Size',
                storeQuantity: 25,
                importQuantity: 50,
                sellingQuantity: 20,
            },
        ],
        category: 'Phụ kiện',
    },
    {
        _id: '63e4a1c9f5a10a0012aabc05',
        productCode: 'P005',
        productName: 'Áo Khoác Dù',
        productImage: 'https://example.com/product5.jpg',
        description: 'Áo khoác dù chống nước, phù hợp cho các chuyến đi phượt.',
        supplierCode: 'SUP005',
        status: true,
        price: {
            sellingPrice: 450000,
            importPrice: 350000,
            promotionPrice: 420000,
        },
        variants: [
            {
                image: 'https://example.com/variant5_1.jpg',
                productColor: 'Gray',
                productSize: 'L',
                storeQuantity: 35,
                importQuantity: 70,
                sellingQuantity: 30,
            },
        ],
        category: 'Thời trang nam',
    },
];

export const subBanners = [
    {
        image: 'https://example.com/images/banner1.jpg',
        title: 'New Winter Collection',
        name: 'Cozy Knit Sweater',
        price: 49.99,
        discountPrice: 39.99,
    },
    {
        image: 'https://example.com/images/banner2.jpg',
        title: 'Elegant Evening Wear',
        name: 'Velvet Maxi Dress',
        price: 89.99,
        discountPrice: 74.99,
    },
    {
        image: 'https://example.com/images/banner3.jpg',
        title: 'Everyday Essentials',
        name: 'Classic Denim Jacket',
        price: 59.99,
        discountPrice: 49.99,
    },
    {
        image: 'https://example.com/images/banner4.jpg',
        title: 'Athleisure Styles',
        name: 'Sporty Tracksuit Set',
        price: 69.99,
        discountPrice: 59.99,
    },
    {
        image: 'https://example.com/images/banner5.jpg',
        title: 'Luxury Accessories',
        name: 'Leather Crossbody Bag',
        price: 129.99,
        discountPrice: 109.99,
    },
    {
        image: 'https://example.com/images/banner2.jpg',
        title: 'Elegant Evening Wear',
        name: 'Velvet Maxi Dress',
        price: 89.99,
        discountPrice: 74.99,
    },
    {
        image: 'https://example.com/images/banner3.jpg',
        title: 'Everyday Essentials',
        name: 'Classic Denim Jacket',
        price: 59.99,
        discountPrice: 49.99,
    },
    {
        image: 'https://example.com/images/banner4.jpg',
        title: 'Athleisure Styles',
        name: 'Sporty Tracksuit Set',
        price: 69.99,
        discountPrice: 59.99,
    },
];

export const orders: IOrder[] = [
    {
      _id: "63e4b1c9f5a10a0012aabc01",
      _idProduct: "63e4a1c9f5a10a0012aabc01",
      productImage: "https://example.com/images/banner1.jpg",
      productName: "Áo Thun Nam",
      productColor: "Blue",
      productSize: "M",
      sellingPrice: 200000,
      quantity: 2
    },
    {
      _id: "63e4b1c9f5a10a0012aabc02",
      _idProduct: "63e4a1c9f5a10a0012aabc02",
      productImage: "https://images.unsplash.com/photo-1544957992-20514f595d6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
      productName: "Quần Jeans Nữ",
      productColor: "Black",
      productSize: "L",
      sellingPrice: 350000,
      quantity: 1
    },
    {
      _id: "63e4b1c9f5a10a0012aabc03",
      _idProduct: "63e4a1c9f5a10a0012aabc03",
      productImage: "https://example.com/product3.jpg",
      productName: "Giày Thể Thao",
      productColor: "White",
      productSize: "42",
      sellingPrice: 500000,
      quantity: 3
    },
    {
      _id: "63e4b1c9f5a10a0012aabc04",
      _idProduct: "63e4a1c9f5a10a0012aabc04",
      productImage: "https://example.com/product4.jpg",
      productName: "Túi Xách Tay",
      productColor: "Pink",
      productSize: "One Size",
      sellingPrice: 700000,
      quantity: 1
    },
    {
      _id: "63e4b1c9f5a10a0012aabc05",
      _idProduct: "63e4a1c9f5a10a0012aabc05",
      productImage: "https://example.com/product5.jpg",
      productName: "Áo Khoác Dù",
      productColor: "Gray",
      productSize: "L",
      sellingPrice: 450000,
      quantity: 2
    }
  ];
  
