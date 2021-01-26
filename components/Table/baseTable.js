import { 
    MdChevronLeft,
    MdChevronRight,
    MdFirstPage,
    MdLastPage,
  } from "react-icons/md"
import { useEffect } from 'react'
import { 
Box,
HStack,
Spacer,
Input,
IconButton,
Tooltip,
useColorMode,
useColorModeValue,
Table, TableCaption, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react"
import { useTable, usePagination } from 'react-table'

function ServerTable({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
  }) {
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
      // Get the state from the instance
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        manualPagination: true, 
        pageCount: controlledPageCount,
      },
      usePagination
    )
    const { colorMode } = useColorMode();
    const thBg = useColorModeValue("whiteAlpha.50", "blackAlpha.50")
    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
      fetchData({ pageIndex })
    }, [fetchData, pageIndex])
  
    return (
      <>
        <pre>
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
        </pre>
        <Table size='md' {...getTableProps()}
        variant="striped"
        colorScheme="teal"
        >
          <TableCaption fontSize="md" px={0} pb={[2,4]} mt={[0,'1rem']} placement="top" >
            <Box py={[0,2]}>
              {tableHeading}
            </Box>
            <HStack>
              <Spacer />
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </HStack>
          </TableCaption>
          <Thead >
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}
               _hover={{
                cursor: 'pointer',
                  backgroundColor: thBg_hover[colorMode],
                }}
                bg={thBg}
              >
                {headerGroup.headers.map(column => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    p="1rem"
                    whiteSpace="nowrap"
                    >
                    {column.render('Header')}              
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} pr={2} >
                  {row.cells.map(cell => {
                    return <Td p={1} whiteSpace="nowrap" {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  })}
                </Tr>
              )
            })}
            {loading ? (<Tr><Td colSpan="10000">Loading...</Td></Tr>) : null}
          </Tbody>
          <TableCaption fontSize="md" p={2} mt={[0,'1rem']}>
            <HStack>
              <HStack spacing="14px">
                <Tooltip label="First">
                  <IconButton
                    fontSize="20px" 
                    icon={<MdFirstPage />}
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    aria-label="first page"
                  />
                </Tooltip>
                <Tooltip label="Prev">
                  <IconButton
                    fontSize="20px" 
                    icon={<MdChevronLeft />}
                    onClick={() => previousPage()} 
                    disabled={!canPreviousPage}
                    aria-label="previous page"
                  />
                </Tooltip>
                <Tooltip label="Next">
                  <IconButton
                    fontSize="20px" 
                    icon={<MdChevronRight />}
                    onClick={() => nextPage()} 
                    disabled={!canNextPage}
                    aria-label="next page"
                  />
                </Tooltip>
                <Tooltip label="Last">
                  <IconButton
                    fontSize="20px" 
                    icon={<MdLastPage />}
                    onClick={() => gotoPage(pageCount - 1)} 
                    disabled={!canNextPage}
                    aria-label="last page"
                  />
                </Tooltip>
              </HStack>
              <Spacer />
              <HStack>
                <Box>
                  page
                </Box>
                <Box as="strong">
                  {pageIndex + 1} of {pageOptions.length}
                </Box>
              </HStack>
              <Spacer />
              <HStack>
                <Box>
                  Go to page:
                </Box>
                <Input
                  type="number"
                  bgColor={thBg}
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                  }}
                  style={{ width: '60px', marginLeft:'12px' }}
                /> 
              </HStack>
            </HStack>
          </TableCaption>
        </Table>
      </>
    )
  }


export default ServerTable