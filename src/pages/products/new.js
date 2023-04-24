import { useState } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

export default function NewProduct(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [goBack, setGoBack] = useState(false);
    const router = useRouter();
    async function createProduct(e){
        e.preventDefault();
        const data = {title,description,price};
        await axios.post('/api/products', data);
        setGoBack(true);
    }
    if(goBack){
        router.push('/products');
    }
    return (
        <Layout>
        <h2>New Product Information</h2>
        <form onSubmit={createProduct}>
        
        <label>Product Name</label>
        <input
          type="text"
          placeholder="ex:mens summer clothing.."
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
        <label>Product Description</label>
        <textarea 
          placeholder="ex:Very comfortable summer collection"
          value={description}
          onChange={e => setDescription(e.target.value)}
          >
        </textarea>
        <label>Product Price in USD</label>
        <input 
          type="number" 
          placeholder="ex:twenty five us dollars"
          value={price}
          onChange={e => setPrice(e.target.value)}
          />

        <button 
          type="submit"
          className="btn-primary">Save
        </button>

        </form>
        
        </Layout>
    )
}