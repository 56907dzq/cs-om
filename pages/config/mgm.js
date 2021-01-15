import React, { useMemo, useState } from "react"
import Head from 'next/head'
import Layout from 'layouts/layout'
import EnhancedTable from 'components/Table/Table'

export async function getStaticProps(context) {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/s_mgm_server/search')
  const originData = await res.json()

  return {
    props: {
      originData
    }
  }
}


export default function Mgm({ originData }) {
  const [data, setData] = React.useState(React.useMemo(() => originData, []))
  const columns = useMemo(
    () =>[
          {
            Header: '服务器名称',
            accessor: 'server_name',
          },
          {
            Header: '描述',
            accessor: 'description',
          },
          {
            Header: '登录用户名',
            accessor: 'login_username',
          },
          {
            Header: '登录密码',
            accessor: 'login_password',
          },
          {
            Header: '服务器IP',
            accessor: 'server_ip',
          },
          {
            Header: '登录密钥',
            accessor: 'key_file',
          }
      ],
    []
  )

  return (
    <Layout>
      <Head>
        <title>config</title>
      </Head>
      <EnhancedTable columns={columns} data={data} setData={setData} tableHeading="MGM"/>
    </Layout>
  )
}
