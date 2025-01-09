'use client';


import { useParams } from "next/navigation";

import { useDataStore } from "@/app/lib/data-store/store";
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon";
import { useState } from "react";
import EditProductForm from "./editProduct-form";
import { ProductType } from "@/app/api/products/model";
import { revalidateTag } from "next/cache";

export default function ManageProductByIdPage() {


    const { products, categories } = useDataStore();
    const { id } = useParams();
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [editedProduct, setEditedProduct] = useState<ProductType>();
    const product = products.find((product) => product._id.toString() === id);

    if (!product) {
        return <h1>Product not found</h1>;
    }

    const handleSubmit = (submit: boolean) => {
        console.log('submitting product', editedProduct);
        const update = async () => {
            const res = await fetch(`/api/products?id=${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedProduct)
            });
            const data = await res.json();
            if (data.status === 201) {
                window.location.reload();
            }
            console.log('data', data);

        }
        if (submit) {
            try {
                update();
            } catch (error) {
                console.log('error updating product', error);
            }
        }
    }

    const retrieveData = (productDetails: ProductType) => {
        console.log('retrieving data', productDetails);
        setEditedProduct(productDetails);
    };

    if (!products || !categories || products.length === 0 || categories.length === 0) {
        return <h1>Loading...</h1>;
    }



    return (
        <div>
            <h1>Manage Product</h1>
            <div className="border p-4" >
                {!editProduct && <div>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <p>{product.discount}</p>
                    <p>
                        {
                            product.category.map((id) => {
                                const category = categories.find((category) => category._id === id);
                                return category ? category.title : 'Unknown';
                            }).join(', ')
                        }
                    </p>
                </div>}

                {
                    editProduct &&
                    <div>
                        <EditProductForm product={product} categories={categories}
                            onSubmit={handleSubmit}
                            retrieveProductDetails={retrieveData}
                            onCancel={() => { setEditProduct(false) }} />
                    </div>
                }


                <ButtonWithIcon label={editProduct ? 'Cancel' : 'Edit'} icon={editProduct ? '❌' : '✏️'}
                    onClick={(e) => { e.preventDefault(); setEditProduct(!editProduct) }}
                />



            </div>
        </div>
    );


}