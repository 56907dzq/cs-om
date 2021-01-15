import Head from 'next/head'
import Layout from 'layouts/layout'
import { remoteGet }  from 'util/requests'



export default function Home() {
  return (
    <Layout>
      <Head>
        <title>config</title>
      </Head>
    </Layout>
  )
}