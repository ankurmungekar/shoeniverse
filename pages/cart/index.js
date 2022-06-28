import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useStateContext } from '../../context/stateContext'
import { urlFor } from '../../utils/sanityClient'
import EmptyStateImg from '../../assets/confused-travolta.gif'
import getStripe from '../../utils/getStripe'

const Cart = () => {
  const shippingCharge = 100;
  const { cartItems, cartTotal, removeProduct, updateQuantity } = useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await axios.post('/api/stripe', cartItems);
    console.log(response);
    if (response.statusCode === 500) return;
    const data = await response.data;
    window.open(data.url);
    //stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <>
      {cartItems && cartItems.length === 0 && <div className="text-center mt-6">
        <div className="m-auto w-20" style={{ width: "480px" }}>
          <Image src={EmptyStateImg} width="480px" height="204px" alt="John Travolta confused" className="object-cover w-full h-64 rounded-lg" />
        </div>
        <p className="mt-6 text-gray-500">We cant find anything, add some products.</p>
      </div>}
      {cartItems && cartItems.length !== 0 && <div className="container mx-auto mt-10">
        <div className="flex border my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Cart</h1>
              <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            {cartItems?.map(product => {
              return <div key={product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="rounded-t-lg" src={urlFor(product.image && product.image[0])} alt={product.name} />
                  </div>
                  <div className="flex flex-col ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.name}</span>
                    <span className="text-red-500 text-xs">{product.brand}</span>
                    <a href="#" onClick={() => removeProduct(product)} className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-4">Remove</a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <span className="cursor-pointer w-3" style={{ marginTop: "6px" }} onClick={() => updateQuantity(product._id, 'DECREMENT')}><svg className="fill-current text-gray-600" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" /></svg></span>
                  <input className="mx-2 border text-center w-8" type="text" value={product.quantity} />
                  <span className="cursor-pointer w-3" style={{ marginTop: "6px" }} onClick={() => updateQuantity(product._id, 'INCREMENT')}><svg className="fill-current text-gray-600" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg></span>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">&#x20B9;{product.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm">&#x20B9;{product.price * product.quantity}</span>
              </div>
            })}
            <Link href="/">
              <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Continue Shopping
              </a>
            </Link>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10" style={{ backgroundColor: "#f1f1f1" }}>
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
              <span className="font-semibold text-sm">&#x20B9;{cartTotal}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - &#x20B9;{shippingCharge}</option>
              </select>
            </div>
            <div className="py-10">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm border w-full" />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-lg text-white">Apply</button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-2xl">
                <span>Total</span>
                <span>&#x20B9;{cartTotal + shippingCharge}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-lg text-white w-full" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Cart