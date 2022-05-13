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
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <main className="main-container">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout