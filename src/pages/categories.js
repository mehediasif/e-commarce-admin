import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories(){
    const [name,setName] = useState('');
    const [categoryName,setcategoryName] = useState([]);
    const [parentCategoryName,setParentCategoryName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories(){
        axios.get('/api/categories').then(result =>{
            setcategoryName(result.data);
        });
    }

    async function saveCategory(ev){
        ev.preventDefault();
        await axios.post('/api/categories', {name,parentCategoryName});
        setName('');
        fetchCategories();
    }
    return (
        <Layout>
            <h2>Categories</h2>
            <label>Save New Category</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input 
                    className="mb-0"
                    type="text" 
                    placeholder="Category Name" 
                    onChange={ev => setName(ev.target.value)}
                    value={name}/>
                <select 
                className="mb-0"
                onChange={ev => setParentCategoryName(ev.target.value)}
                value={parentCategoryName}
                >
                    <option value={0}>No Parent Category</option>
                    {categoryName.length > 0 && categoryName.map(category => (
                    // eslint-disable-next-line react/jsx-key
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary py-1">Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                
                {categoryName.length > 0 && categoryName.map(category => (
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                            <button className="btn-primary mr-1">Edit</button>
                            <button className="btn-secondary">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}