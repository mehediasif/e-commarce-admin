import { useState } from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function ProductForm(
    {
        _id,
        title:existingTitle,
        description:existingDescription,
        price:existingPrice,
    }
){
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goBack, setGoBack] = useState(false);
    const [goBack1, setGoBack1] = useState(false);

    const router = useRouter();
    async function saveProduct(e){
        e.preventDefault();
        const data = {title,description,price};

        //If Product exists update it or Create a new one
        if(_id) {
            await axios.put('/api/products', {...data,_id});
            setGoBack(true);
        }else{
            //Api call to create a product 
            await axios.post('/api/products', data);
            setGoBack1(true);
        }
    }
    if(goBack){
        router.push('/products');
    }
    if(goBack1){
        router.push('/products');
    }
    const notify = () => toast('Operation Succesful',{
        style: {
            duration: 5000,
            border: '1px solid #713200',
            padding: '16px',
            color: '#00BF00',
          },
    });
    return (
        <form onSubmit={saveProduct}>
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
          className="btn-primary"
          onClick={notify}>Save
        </button>
        <Toaster
            toastOptions={
                {
                style: {
                  duration: 5000,
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#00BF00',
                },
              }}
            />
        </form>
    )
}