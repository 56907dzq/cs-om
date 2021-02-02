import Head from 'next/head'
import Layout from 'layouts/layout'
import { useMemo } from "react"
import EnhancedTable from 'components/Table/Table'
import CommandDialog from 'components/Dialog/CommandDialog'
import { remoteGet } from 'util/requests'

const url = 's_check_command'

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

export default function Command({ originData }) {
  const data = remoteGet(`/${url}/search`, useMemo(() => originData, []))
  const columns = useMemo(
    () =>[{
            id:'id',
            Header: 'id',
            accessor: 'id',
          },
          {
            Header: '名称',
            accessor: 'name',
          },
          {
            Header: '描述',
            accessor: 'description',
          },
          {
            Header: '检测命令',
            accessor: 'command',
          }
      ],
    []
  )
  return (
    <Layout>
      <Head>
        <title>config/command</title>
      </Head>
      <EnhancedTable 
        url={url}
        data={data}
        columns={columns} 
        tableHeading="CHECK COMMAND" 
        dialog={addHandler => (
          <CommandDialog addHandler={addHandler} />
        )}
      />
    </Layout>
  )
}