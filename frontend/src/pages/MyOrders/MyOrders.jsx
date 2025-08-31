// import React from 'react'
// import "../MyOrders/MyOrders.css"
// import { useState } from 'react'
// import { useContext } from 'react'
// import { StoreContext } from '../../Context/StoreContext'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { assets } from '../../assets/frontend_assets/assets'
// const MyOrders = () => {
//   const {url,token}=useContext(StoreContext);
//   const [data,setData]=useState([]);

//   const fetchOrders=async ()=>{
//     const response=await axios.post(url+"/api/order/userorders",{},{headers:token});
//     setData(response.data.data);
//     console.log(response.data.data);
//   }

//   useEffect(()=>{
//     if(token){
//     fetchOrders();
//     }
//   },[token]);

//   return (
//     <div>
//     <div className='my-orders'>
//       <h2>My Orders</h2>
//       <div className='container'>
//         {
//           data.map((order,index)=>{
//             return(
//               <div key={index} className='my-orders-order'>
//                 <img src={assets.parcel_icon} alt="" />
//                 <p>{order.items.map((item,index)=>{
//                   if(index===order.item.length-1){
//                     return item.name+" x "+item.quantity
//                   }
//                   else
//                   {
//                     return item.name+" x "+item.quantity+" , "
//                   }
//                 })}</p>
//                 <p>${order.amount}.00</p>
//                 <p>{order.items.length}</p>
//                 <p><span>&#x25cf</span><b>{order.status}</b></p>
//                 <button onClick={fetchOrders}>Track Order</button>
//               </div>
//             )
//           })
//         }
//       </div>
//     </div>
//     </div>
//   )
// }

// export default MyOrders


import React, { useState, useContext, useEffect } from 'react';
import "../MyOrders/MyOrders.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders", 
        {}, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        setData(response.data.data || []);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("Error fetching orders. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="error">
          {error}
          <button onClick={fetchOrders}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          data.map((order, index) => (
            <div key={order._id || index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="Parcel icon" />
              <p>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} × {item.quantity}
                    {idx !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span className={`status-dot ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  &#x25cf;
                </span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders; 