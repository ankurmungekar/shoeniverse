import '../styles/globals.css'
import Layout from '../components/Layout'
import { StateContext } from '../context/stateContext'

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
