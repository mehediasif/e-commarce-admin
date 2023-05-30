import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import ProductForm from "../../../../components/ProductForm";

export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        });
    }, [id])
    return(
        <Layout>
        <h4 className="text-orange-600 mb-2 text-center text-base font-medium">Edit Product Information..</h4>
        {productInfo && (
            <ProductForm {...productInfo} />
        )}
        </Layout>
    );
}