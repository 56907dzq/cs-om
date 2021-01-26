import Head from 'next/head'
import Layout from 'layouts/layout'
import { useState, useEffect, useMemo, useCallback } from 'react'
import ServerTable from 'components/Table/baseTable'
import { remoteGet } from 'util/requests'


const url = 's_log'

export async function getServerSideProps(context) {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
  const originData = await res.json()

  if (!originData) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      originData
    }
  }
}

export default function Log({ originData }) {
  const [data, setData] = useState(originData)
  // const [loading, setLoading] = useState(false)
  // const [pageCount, setPageCount] = useState(0)
  // const fetchIdRef = React.useRef(0)
  // const fetchData = useCallback(({ pageIndex }) => {
  //   const fetchId = ++fetchIdRef.current
  //   setLoading(true)
  //   if (fetchId === fetchIdRef.current) {
  //     setData()
  //     setPageCount()
  //     setLoading(false)
  //   }
  // }, [])
  return (
    <Layout>
      <Head>
        <title>Log</title>
      </Head>
      {/* <ServerTable
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      /> */}
    </Layout>
  )
}
