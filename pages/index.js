import React from 'react'
import Hero from '../components/Hero'
import FeaturedItems from '../components/FeaturedItems'
import { client } from '../utils/sanityClient';

const Homepage = ({ products, banner }) => {
  console.log(products);
  return (
    <div>
      <Hero bannerData={banner && banner.length && banner[0]} />
      <FeaturedItems products={products} />
    </div>
  )
}
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery)
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery)

  return {
    props: { products, banner }
  }
}
export default Homepage