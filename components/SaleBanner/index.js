import React from 'react'
import styles from './hero.module.css'
import { urlFor } from '../../utils/sanityClient'

const Hero = ({ bannerData }) => {
  return (
    <div className={styles.wrapper}>
      <div className="md:container md:mx-auto mb-12 py-12 h-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-12">
          <div className="sale-banner-img">
            <img src={urlFor(bannerData.image)} />
          </div>
          <div className="sale-banner-content">
            <h4 className="text-red-500 text-4xl">{bannerData.offerText}</h4>
            <h2 className="font-extrabold text-6xl">{bannerData.title}</h2>
            <p className="mb-10">{bannerData.desc}</p>
            <a className="inline-block text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 text-3xl px-10 py-5 text-center" href="#">{bannerData.buttonText}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero