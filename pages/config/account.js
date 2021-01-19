import Head from 'next/head'
import Layout from 'layouts/layout'
import { useMemo } from "react"
import EnhancedTable from 'components/Table/Table'
import AccountDialog from 'components/Dialog/AccountDialog'
import { remoteGet } from 'util/requests'

const url = 's_device_account'

export async function getStaticProps(context) {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
  const originData = await res.json()

  return {
    props: {
      originData
    }
  }
}

export default function Account({ originData }) {
  const data =  remoteGet(`/${url}/search`, useMemo(() => originData, []))
  const columns = useMemo(
    () =>[
          {
            Header: '账号名称',
            accessor: 'name',
          },
          {
            Header: '描述',
            accessor: 'description',
          },
          {
            Header: '设备型号',
            accessor: 'device_model',
          },
          {
            Header: '登录类型',
            accessor: 'login_type',
          },
          {
            Header: '登录端口',
            accessor: 'login_port',
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
            Header: 'enable密码',
            accessor: 'enable_password',
          }
      ],
    []
  )
  return (
    <Layout>
      <Head>
        <title>config/account</title>
      </Head>
      <EnhancedTable 
        url={url}
        data={data}
        columns={columns} 
        tableHeading="CE ACCOUNT" 
        dialog={addHandler => (
          <AccountDialog addHandler={addHandler} />
        )}
      />
    </Layout>
  )
}