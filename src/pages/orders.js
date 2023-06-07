import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Orders() {
  const [ orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  return(
    <Layout>
    <h2>Orders</h2>
    <h1>Check Out how Rich you have become!</h1>
    
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recepient Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Region</th>
            <th>Order Info</th>
            <th>Payment Status</th>

          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr key={order._id}>
            <td>{new Date(order.createdAt).toLocaleString()}</td>
            <td>{order.name}</td>
            <td>{order.email}</td>
            <td>{order.firstAddressLine} <br /> {order.secondAddressLine}</td>
            <td>
              {order.city}, {order.country}
            </td>
            <td>
              <>
                <table className="w-full px-2 mx-2 font-[Monaco] bg-blue-500 uppercase">
                  <thead >
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                <tbody>
                {order.line_items.map(product => (
                  <tr key={product.quantity}>
                  <td>
                  {product.price_data?.product_data.name}</td>
                  <td>
                  {product.quantity}
                  </td>
                </tr>
                ))}
                  
                </tbody>
                </table>
              </>
            </td>
            
            {order.paid ?
               (<td>
              <button className="btn-green" disabled>Yes</button>
              </td>) : 
              (<td>
                <button className="btn-secondary" disabled>No</button>
                </td>)
              }
            
          </tr>
        ))}
        </tbody>
        

      </table>

    </Layout>  
  )
}