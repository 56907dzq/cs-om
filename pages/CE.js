import Head from 'next/head'
import Layout from 'layouts/layout'
import { motion, AnimatePresence } from 'framer-motion';
// import CeForm from 'components/From/CeForm'

const url = 's_ce'

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
  const ce_data = await res.json()

  return {
    props: {
      ce_data,
    },
    revalidate: 300, 
  }
}

export default function CE({ce_data}) {
  return (
      

    <Layout>
      <Head>
        <title>CE</title>
      </Head>
      {/* {isSubmitting && formData && (
        <Results
          queryLocation={formData.query_location}
          queryType={formData.query_type}
          queryVrf={formData.query_vrf}
          queryTarget={formData.query_target}
          setSubmitting={setSubmitting}
        />
      )}
      <AnimatePresence>
        {!isSubmitting && (
          <AnimatedForm
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, x: -300 }}
            ce_data={ce_data} 
            isSubmitting={isSubmitting}
            setSubmitting={setSubmitting}
            setFormData={setFormData}
          />
        )}
      </AnimatePresence> */}
    </Layout>
  )
}