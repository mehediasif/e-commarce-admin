import { useRouter } from "next/router";
import Layout from "../../../../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const {id} = router.query;

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        })
    }, [id]);
    function goBack() {
        router.push('/products');
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id);
        goBack();
    }
    return(
        <Layout>
        <h2>Are you Sure you want to Delete this?</h2>
        <h3>Name: &nbsp; {productInfo?.title} </h3>

        <div className="flex gap-2 justify-center">

        <button className="btn-secondary" onClick={deleteProduct}>Yessss
        </button>

        <button 
        className="btn-primary"
        onClick={goBack}>No</button>

        </div>
        
        </Layout>
        )
}