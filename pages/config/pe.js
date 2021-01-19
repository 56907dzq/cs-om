import Head from 'next/head'
import Layout from 'layouts/layout'
import { useMemo } from "react"
import EnhancedTable from 'components/Table/Table'
import PEDialog from 'components/Dialog/PEDialog'
import { remoteGet } from 'util/requests'

const url = 's_pe_server'

export async function getStaticProps(context) {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
  const originData = await res.json()

  return {
    props: {
      originData
    }
  }
}


export default function Pe({ originData }) {
  const data =  remoteGet(`/${url}/search`, useMemo(() => originData, []))
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
        <title>config/pe</title>
      </Head>
      <EnhancedTable 
        url={url}
        data={data}
        columns={columns} 
        tableHeading="PE SERVER" 
        dialog={addHandler => (
          <PEDialog addHandler={addHandler} />
        )}
      />
    </Layout>
  )
}
