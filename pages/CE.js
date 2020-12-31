import Head from 'next/head'
import Layout from '../layouts/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>CE</title>
      </Head>
      <section>
        <p>[Your Self Introduction]</p>
        <p>
        Chakra UI is a simple, modular and accessible component library
              that gives you the building blocks you need to build your React
              applications.Chakra UI is a simple, modular and accessible component library
              that gives you the building blocks you need to build your React
              applications.{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}