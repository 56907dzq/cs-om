import Head from 'next/head'
import Layout from 'layouts/layout'

export default function PE() {
  return (
    <Layout>
      <Head>
        <title>PE</title>
      </Head>
      <section>
        <p>[Your Self Introduction]</p>
        <p>
            ilding blocks you need to build your React
            applications.{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}