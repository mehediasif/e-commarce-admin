import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);
  return(
    <Layout>
      <Link className="bg-blue-500 text-black rounded-md py-1 px-2" href={'/products/new'}>Add New Product</Link>

      <table className="basic">
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Controls</td>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            // eslint-disable-next-line react/jsx-key
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>
                <Link href={'/products/edit/'+p._id} className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1 hover:-translate-y-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>

                Edit
                </Link>
                <Link href={'/products/delete/'+p._id} className="btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 bg-red-700 border-slate-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>  
  )
}