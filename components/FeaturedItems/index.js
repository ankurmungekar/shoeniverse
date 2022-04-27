import React from 'react'
import Product from '../Product'

const FeaturedItems = ({ products }) => {
  return (
    <div className="md:container md:mx-auto mb-12">
      <div className="mt-12 mb-12">
        <h1 className="mb-2 text-4xl md:text-4xl text-center text-gray-700 font-extrabold">Featured Items</h1>
        <p className="md:text-lg text-center text-gray-500 md:mx-auto mx-4">There are many variations of passages of Lorem Ipsum available</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  )
}

export default FeaturedItems