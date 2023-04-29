import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories(){
    const [editingCategory, setEditingCategory] = useState(null);
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
        const data = {name,parentCategoryName}
        if(editingCategory){
            data._id = editingCategory._id;
            await axios.put('/api/categories', data);
            setEditingCategory(null);
        }else{
            await axios.post('/api/categories', data);
        }
        setName('');
        fetchCategories();
    }
    function editCategory(category){
        setEditingCategory(category);
        setName(category.name);
        setParentCategoryName(category.parent?._id);
    }
    return (
        <Layout>
            <h2>Categories</h2>
            <label>
                {editingCategory ? `Editing Category '${editingCategory.name}'` : 'Create new category'}
            </label>
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
                    <option value=''>No Parent Category</option>
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
                            <button 
                            onClick={() => editCategory(category)}
                            className="btn-primary mr-1"                            
                            >Edit</button>
                            <button className="btn-secondary">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}