import React from 'react'
import Hero from '../components/Hero'
import FeaturedItems from '../components/FeaturedItems'
import SaleBanner from '../components/SaleBanner'
import { client } from '../utils/sanityClient'

const Homepage = ({ products, heroBanner, saleBanner }) => {
  return (
    <div>
      <Hero bannerData={heroBanner && heroBanner.length && heroBanner[0]} />
      <FeaturedItems products={products} />
      <SaleBanner bannerData={saleBanner && saleBanner.length && saleBanner[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]{ _id, image, name, details, price, slug, "brand": *[_type == "brand" && _id == ^.brand._ref][0].name }';
  const products = await client.fetch(productsQuery)
  const heroBannerQuery = '*[_type == "banner"]';
  const heroBanner = await client.fetch(heroBannerQuery)
  const saleBannerQuery = '*[_type == "saleBanner"]';
  const saleBanner = await client.fetch(saleBannerQuery)

  return {
    props: { products, heroBanner, saleBanner }
  }
}

export default Homepage