import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import { withSwal } from 'react-sweetalert2';

function Categories({swal}){
    const [editingCategory, setEditingCategory] = useState(null);
    const [name,setName] = useState('');
    const [categoryName,setcategoryName] = useState([]);
    const [propertyName,setPropertyName] = useState([]);

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
        const data = {
            name,
            parentCategoryName,
            propertyName:propertyName.map(p => ({
                name:p.name,
                values:p.values.split(','),
            })),
        }
        if(editingCategory){
            data._id = editingCategory._id;
            await axios.put('/api/categories', data);
            setEditingCategory(null);
        }else{
            await axios.post('/api/categories', data);
        }
        setName('');
        setParentCategoryName('');
        setPropertyName([]);
        fetchCategories();
    }
    function editCategory(category){
        setEditingCategory(category);
        setName(category.name);
        setParentCategoryName(category.parent?._id);
        setPropertyName(
            category.propertyName.map(({name,values}) => ({
                name:name,
                values:values.join(','),
            }
        )));
    }

    function deleteCategory(category){
        swal.fire({
            title: "Are you Sure?",
            text: `Do you want to delete ${category.name}?`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d56',
            reverseButtons: true,
        }).then(async result => {
            if(result.isConfirmed) {
                const {_id} = category;
                await axios.delete('/api/categories?_id='+_id);
                fetchCategories();
                swal.fire({
                    title: 'Deleted!',
                    text: `${category.name} Category has been deleted!`,
                    icon: 'success',
                });
            }
        });
    }

    function addProperty(){
        setPropertyName(prev => {
            return [...prev, {name: '',values:''}];
        });
    }
    function handlePropertyNameChange(index,propertyName,newName){
        setPropertyName(prev => {
            const propertyName = [...prev];
            propertyName[index].name = newName;
            return propertyName;
        })
    }
    function handlePropertyValueChange(index,propertyName,newValue){
        setPropertyName(prev => {
            const propertyName = [...prev];
            propertyName[index].values = newValue;
            return propertyName;
        });
    }
    function removeProperty(index){
        setPropertyName(prev => {
            return [...prev].filter((p,pIndex) => {
                return pIndex !== index;
            });
        });
    }
    return (
        <Layout>
            <h2>Categories</h2>
            <label>
                {editingCategory ? `Editing Category '${editingCategory.name}'` : 'Create new category'}
            </label>
            
            <form onSubmit={saveCategory} >
                <div className="flex gap-1">
                <input 
                    className="mb-2"
                    type="text" 
                    placeholder="Category Name" 
                    onChange={ev => setName(ev.target.value)}
                    value={name}/>
                <select 
                className="mb-2"
                onChange={ev => setParentCategoryName(ev.target.value)}
                value={parentCategoryName}
                >
                    <option value=''>No Parent Category</option>
                    {categoryName.length > 0 && categoryName.map(category => (
                    // eslint-disable-next-line react/jsx-key
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                </div>
                <div>
                    <label className="block">Properties</label>
                    <button 
                    onClick={addProperty}
                    type="button"
                    className="btn-default mb-2"
                    >Add Property</button>
                    {(propertyName.length > 0) && propertyName.map((property,index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="flex gap-1 mb-2">
                          <input
                           type="text" 
                           value={property.name} 
                           className="mb-0"
                           onChange={ev => handlePropertyNameChange(index,property,ev.target.value)}
                           placeholder="name (example: color)" 
                           />
                          <input
                           type="text" 
                           value={property.values} 
                           className="mb-0"
                           onChange={ev => handlePropertyValueChange(index,property,ev.target.value)}
                           placeholder="values, comma separated" 
                           />
                           <button 
                           className="bg-red-600 opacity-90 text-white px-4 py-1 ml-2 rounded-xl"
                           onClick={() => removeProperty(index)}
                           type="button"
                           >Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editingCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingCategory(null);
                                setParentCategoryName('');
                                setName('');
                                setPropertyName([]);

                            }}
                            className="btn-secondary"
                            >Cancel</button>
                    )}
                    <button type="submit" className="btn-primary py-1">Save</button>
                </div>
            </form>
            {!editingCategory && (
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
                            <button 
                            onClick={() => deleteCategory(category)}
                            className="btn-secondary">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            
        </Layout>
    );
}
export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
));
    
