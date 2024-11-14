"use client";
import React, { useState } from 'react';
import { DialogDemo } from '@/components/ProductDialog';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import UpdateProduct from '@/components/UpdateProduct';

type Product = {
    name: string;
    category: string;
};

const Products: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const products: Product[] = [
        { name: 'Iphone 14 Pro Black', category: 'Smartphone' },
        { name: 'Iphone 14 Black', category: 'Smartphone' },
        { name: 'Samsung Galaxy S22', category: 'Smartphone' },
        { name: 'Sony VH1000XM4', category: 'Headphones' },
        { name: 'Apple AirPods', category: 'Headphones' },
        { name: 'Macbook 14 Pro', category: 'Laptop' },
        { name: 'ASUS Rog Gaming Laptop', category: 'Laptop' },
        { name: 'MSI Laptop LED', category: 'Laptop' },
        { name: 'Xiaomi Redmi Note 11', category: 'Smartphone' },
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-row justify-between items-center p-3">
                <div className="text-2xl ml-2">Products</div>
                <DialogDemo />
                {/* <Button variant="outline" className="mt-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:border-black shadow-md">Add Product</Button> */}
            </div>
            <div className="p-4 w-full">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-black shadow-sm"
                    />
                </div>
            </div>
            <div className="p-4">
                <div className="overflow-y-auto h-[calc(100vh-200px)] border border-gray-300 rounded-xl shadow-lg">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-gray-100 shadow-sm">
                            <tr>
                                <th className="px-6 py-3 text-gray-600 font-semibold">Product Name</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold">Category</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-6 py-2">{product.name}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <UpdateProduct />
                                                <button className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600">
                                                    <FaTrashAlt className="mr-1" />
                                                    
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
