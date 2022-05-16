import React from 'react'
import Link from 'next/link';
import { urlFor } from '../../utils/sanityClient';
import { useStateContext } from '../../context/stateContext'

const Product = ({ product }) => {
  const { image, name, slug, price } = product;
  const { addProduct } = useStateContext();
  return (
    <Link href={`/product/${slug.current}`}>
      <div className="rounded-mg shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <img className="rounded-t-lg" src={urlFor(image && image[0])} alt={name} />
        <div className="p-5">
          <h5 className="text-m font-semibold tracking-tight text-gray-900" style={{ minHeight: "60px" }}>{name}</h5>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900">&#x20B9;{price}</span>
            <span className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center" onClick={(e) => { e.stopPropagation(), addProduct(product, 1) }}>Add to cart</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product