import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm(
    {
        _id,
        title:existingTitle,
        description:existingDescription,
        price:existingPrice,
        productImages:existingProductImages,
        category:assingedCategory,
        properties:assingedProperties,
    }
)
{
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [category, setCategory] = useState(assingedCategory || '');
    const [productImages, setProductImages] = useState(existingProductImages || []);
    const [productProperties, setProductProperties] = useState(assingedProperties || {});
    const [goBack, setGoBack] = useState(false);
    const [goBack1, setGoBack1] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
      axios.get('/api/categories').then(res => {
        setCategories(res.data);
      })
    }, [])

    async function saveProduct(e){
      e.preventDefault();
      const data = {title,description,price,productImages,category,properties:productProperties};

      //If Product exists update it or Create a new one
      if(_id) {
          await axios.put('/api/products', {...data,_id});
          setGoBack(true);
      }
      else{
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

    async function upLoadProductImages(ev){
      const files = ev.target.files;
      if(files?.length > 0){
        setIsUploading(true);
        const data = new FormData();

        for (const file of files) {
          data.append('file', file);
        }
        const res = await axios.post('/api/upload', data);
        console.log(res.data);
        setProductImages(old => {
          return [...old, ...res.data.links];
        });
        setIsUploading(false);

      }
    }

    function updateImagesOrder(productImages){
      setProductImages(productImages);
    }

    function changeProductProperties(propName, value){
      setProductProperties(prev => {
        const newProductProperties = {...prev};
        newProductProperties[propName] = value;
        return newProductProperties;
      });
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category){

      let selectedCategoryInfo = categories.find(({_id}) => _id === category);
      propertiesToFill.push(...selectedCategoryInfo.propertyName);
      while(selectedCategoryInfo?.parent?._id){
        const parentCategoryInfo = categories.find(({_id}) => _id === selectedCategoryInfo?.parent?._id);
        propertiesToFill.push(...parentCategoryInfo.propertyName);
        selectedCategoryInfo = parentCategoryInfo;
      }
    }

    return(
      <form onSubmit={saveProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="ex:mens summer clothing.."
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
        <label>Categories</label><br />
        <select
          className="bg-slate-200" 
          value={category}
          onChange={ev => setCategory(ev.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && (categories.map(cat => (
            <option 
            key={cat} 
            value={cat._id}
            >{cat.name}</option>
          )))}
        </select>
        <label>Properties</label>

        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          // eslint-disable-next-line react/jsx-key
          <div className="grid grid-cols-2 gap-2">
            
            <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-md mb-2">{p.name}</div>
            <select
              value={productProperties[p.name]} 
              onChange={(ev) => changeProductProperties(p.name,ev.target.value)}
              className="bg-gradient-to-r from-gray-300 to-gray-400 hover:border-red-700"
              >
              {p.values.map(value => (
                <option key={p.name} value={value}>{value}</option>
              ))}
            </select>
          </div>

        ))}
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable 
          list={productImages}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!productImages?.length && productImages.map(item => (
            <div key={item} className="h-24 max-h-full">
              {// eslint-disable-next-line @next/next/no-img-element
              <img src={item} alt="" />
            }
            </div>
          ))}
          </ReactSortable>

        {isUploading && (
          <div className="h-24 w-24 flex items-center p-1 bg-gray-400 rounded-md">
          <Spinner />
          </div>
        )}

        <label className="w-24 h-24 border-2 cursor-pointer bg-slate-100 flex items-center justify-center text-sm gap-1 text-gray-600 rounded-lg font-serif">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
          Upload
          </div>
          <input type="file" onChange={upLoadProductImages} className="hidden"></input>
        </label>

        {!productImages?.length && (
          <p>No photos for this product yet</p>
        )}

        </div>

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