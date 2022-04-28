import React from 'react'
import Link from 'next/link';

import { urlFor } from '../../utils/sanityClient';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className="rounded-mg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={urlFor(image && image[0])} alt={name} />
      <div className="p-5">
        <h5 className="text-m font-semibold tracking-tight text-gray-900" style={{ minHeight: "60px" }}>{name}</h5>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900">&#x20B9;{price}</span>
          <Link href={`/product/${slug.current}`}><span href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center">Add to cart</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Product