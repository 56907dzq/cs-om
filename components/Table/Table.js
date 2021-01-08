import React from 'react'

import { MdArrowUpward, MdArrowDownward } from "react-icons/md"
import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table'
import { Icon, Box, useColorMode, useColorModeValue, useTheme, Table, TableCaption, Thead, Tbody, Tr, Th, Td} from "@chakra-ui/react"

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const EnhancedTable = ({ columns, data, tableHeading }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("whiteAlpha.50", "blackAlpha.50")
  const hoverBg = { dark: 'whiteAlpha.50', light: 'blackAlpha.50' };
  const scrollbar = { dark: 'whiteAlpha.300', light: 'blackAlpha.300' };
  const scrollbarHover = { dark: 'whiteAlpha.400', light: 'blackAlpha.400' };
  const scrollbarBg = { dark: 'whiteAlpha.50', light: 'blackAlpha.50' };
  const theme = useTheme();
  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Table {...getTableProps()}
        variant="striped"
        colorScheme="teal"
      >
      {!!tableHeading && <TableCaption fontSize="md" pb={3} placement="top">{tableHeading}</TableCaption>}
        <Thead >
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}
             _hover={{
              cursor: 'pointer',
                backgroundColor: hoverBg[colorMode],
              }}
              bg={bg}
            >
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  p="1rem"
                  textAlign="center"
                  whiteSpace="nowrap"
                  >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <Box as="span" pl={1}>
                      {column.isSorted
                      ? column.isSortedDesc
                          ? <Icon boxSize="1rem" as={MdArrowDownward} />
                          : <Icon boxSize="1rem" as={MdArrowUpward} />
                      : ''}
                  </Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td textAlign="center" lineHeight='1rem' whiteSpace="nowrap" {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}
      </div>
    </>
  )
}

export default EnhancedTable
