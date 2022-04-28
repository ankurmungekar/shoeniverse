import React from 'react'
import styles from './hero.module.css'
import { urlFor } from '../../utils/sanityClient'

const Hero = ({ bannerData }) => {
  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${urlFor(bannerData.image)})` }}>
      <div className="h-full bg-opacity-50 bg-black flex items-center justify-center">
        <div className="mx-2 text-center">
          <h1 className="text-gray-100 font-extrabold text-4xl xs:text-5xl md:text-6xl">
            {bannerData.title}
          </h1>
          <h2 className="text-gray-200 font-extrabold text-1xl xs:text-2xl md:text-3xl">
            {bannerData.desc}
          </h2>
          <div className="inline-flex">
            <button className="px-5 py-2 my-5 mx-2 bg-red-500 hover:bg-red-800 text-white border-2 border-transparent hover:border-indigo-800 shadow-md transition duration-500 md:text-xl">{bannerData.buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero