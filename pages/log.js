import Head from 'next/head'
import Layout from 'layouts/layout'
import { useState, useEffect, useMemo, useCallback } from 'react'
import ServerTable from 'components/Table/baseTable'
import { remoteGet } from 'util/requests'


// const url = 's_log'

// export async function getServerSideProps(context) {

//   const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
//   const originData = await res.json()

//   if (!originData) {
//     return {
//       notFound: true,
//     }
//   }
  
//   return {
//     props: {
//       originData
//     }
//   }
// }
function notifyMe() {
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === "granted") {
         var notification = new Notification("Hi there!");
      }
    });
  }
}
export default function Log() {
  // const [data, setData] = useState(originData)
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
      <button onClick={notifyMe}>Notify me!</button>
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
