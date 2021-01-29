import Head from 'next/head'
import Layout from 'layouts/layout'
import { motion, AnimatePresence } from 'framer-motion';

const url = 's_ce'

// export async function getStaticProps() {
//   const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
//   const ce_data = await res.json()

//   return {
//     props: {
//       ce_data,
//     },
//     revalidate: 300, 
//   }
// }

export default function CE() {
  return (
    <Layout>
      <Head>
        <title>CE</title>
      </Head>
      <p>ce</p>
        {/* <Results
          queryLocation={formData.query_location}
          queryType={formData.query_type}
          queryVrf={formData.query_vrf}
          queryTarget={formData.query_target}
          setSubmitting={setSubmitting}
        /> */}
    </Layout>
  )
}