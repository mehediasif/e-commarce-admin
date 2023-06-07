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
    <h1>Hellow World</h1>
    
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recepient Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Region</th>
            <th>Order Info</th>
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
                <table className="basiC">
                  <thead className="font-[Monaco]">
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
          </tr>
        ))}
        </tbody>
        

      </table>

    </Layout>  
  )
}