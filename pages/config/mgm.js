import Head from 'next/head'
import Layout from 'layouts/layout'
import { useMemo } from "react"
import EnhancedTable from 'components/Table/Table'
import MGMDialog from 'components/Dialog/MGMDialog'
import { remoteGet } from 'util/requests'

const url = 's_mgm_server'

export async function getServerSideProps() {

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


export default function Mgm({ originData }) {
  
  const data = remoteGet(`/${url}/search`,useMemo(() => originData, []))
  // const [data, setData] = useState(useMemo(() => originData, []))
  const columns = useMemo(
    () =>[
          {
            id:'id',
            Header: 'id',
            accessor: 'id',
          },
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
        <title>config/mgm</title>
      </Head>
      <EnhancedTable 
        url={url}
        data={data}
        columns={columns} 
        tableHeading="MGM SERVER" 
        dialog={addHandler => (
          <MGMDialog addHandler={addHandler} />
        )}
      />
    </Layout>
  )
}
