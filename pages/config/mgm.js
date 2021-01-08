import React from "react"
import { useMemo } from 'react';
import Head from 'next/head'
import Layout from '../../layouts/layout'
import EnhancedTable from '../../components/Table/Table'
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import { makeData } from '../../util'


export async function getStaticProps(context) {
  // const res = await fetch(`https://api.tvmaze.com/search/shows?q=marvel`)
  // const originData = await res.json()
  
  const originData = makeData(200)

  return {
    props: {
      originData
    }
  }
}


export default function Mgm({ originData }) {
  const data = useMemo(
    () =>originData,
    []
  )

  const columns = useMemo(
    () => [
            {
              Header: 'First Name',
              accessor: 'firstName',
            },
            {
              Header: 'Last Name',
              accessor: 'lastName',
            },
            {
              Header: 'Age',
              accessor: 'age',
            },
            {
              Header: 'Visits',
              accessor: 'visits',
            },
            {
              Header: 'Status',
              accessor: 'status',
            },
            {
              Header: 'Profile Progress',
              accessor: 'progress',
            }
          ],
    []
  )

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    console.log(rowIndex, columnId, value)
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  return (
    <Layout>
      <Head>
        <title>config</title>
      </Head>
      <EnhancedTable columns={columns} data={data} tableHeading="MGM" />

      {/* <table {...getTableProps()} style={{ borderSpacing: 0, border: "1px solid black" }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    margin: 0,
                    padding: '0.5rem',
                    borderBottom: '1px solid black',
                    borderRight: '1px solid black',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        margin: 0,
                        padding: '0.5rem',
                        borderBottom: '1px solid black',
                        borderRight: '1px solid black',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </Layout>
  )
}
