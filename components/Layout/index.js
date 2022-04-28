import React from 'react'
import Head from 'next/head'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Shoeniverse</title>
      </Head>
      <Navbar />
      <main className="main-container">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout