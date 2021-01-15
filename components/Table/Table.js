import React from 'react'
import { 
  useTable,
  useSortBy, 
  useGlobalFilter, 
  usePagination, 
  useRowSelect } from 'react-table'
import { 
  Box,
  HStack,
  Flex,
  Spacer,
  Icon,
  Input,
  Button,
  IconButton,
  Tooltip,
  useTheme,
  useColorMode,
  useColorModeValue,
  Table, TableCaption, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react"

import { 
  MdArrowUpward,
  MdArrowDownward,
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
  MdDelete
} from "react-icons/md"
import { remoteDelete, remoteAdd }  from 'util/requests'
import GlobalFilter from './GlobalFilter'
import MGMDialog from './MGMDialog'

//自定义checkbox
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

//自定义更新按钮
const UpdateButton = React.forwardRef(
  ({original}, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    // React.useEffect(() => {
    //   resolvedRef.current.indeterminate = indeterminate
    // }, [resolvedRef, indeterminate])
    const update = () => {
      console.log(original)
    }
    return (
      <>
        <Button colorScheme="teal" onClick={update} ref={resolvedRef} >上传</Button>
      </>
    )
  }
)

//可编辑单元格
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input 
          variant="filled" 
          bgColor = "transparent" 
          value={value} 
          onChange={onChange} 
          onBlur={onBlur}
          _hover={{ background: "transparent" }}
         />
}

//默认可编辑单元格
const defaultColumn = {
  Cell: EditableCell,
}


const EnhancedTable = ({ columns, data, setData, tableHeading }) => {
  // Use the state and functions returned from useTable to build your UI
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])
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
    preGlobalFilteredRows,
    setGlobalFilter,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter},
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData
    },
    useGlobalFilter,
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
        {
          id: 'update',
          Header: () => (
            <Box>
              更新
            </Box>
          ),
          Cell: ({ row }) => (
            <div>
              <UpdateButton {...row}  />
            </div>
          ),
        }
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
  
  let numSelected = Object.keys(selectedRowIds).length

  const removeByIndexs = (array, indexs) => 
    array.filter((_, i) => !indexs.includes(i))
  
  //添加 
  const addHandler = postdata => {
    let upData = new FormData();
    Object.keys(postdata).forEach( key => upData.append(key,postdata[key]))
    remoteAdd('/s_mgm_server/add', upData)
    .then(res => {
      if(res.result=="success!"){
        const newData = data.concat([postdata])
        setData(newData)
      }
    })
    .catch(error => console.error(error))
  }

  //删除
  const deleteHandler = event => {
    let upData = new FormData();
    upData.append("id", selectedFlatRows[0].original.id);
    remoteDelete('/s_mgm_server/delete', upData)
    .then(res => {
      if(res.result=="success!"){
        const newData = removeByIndexs(
          data,
          Object.keys(selectedRowIds).map(x => parseInt(x, 10))
        )
        setData(newData)
      }
    })
    .catch(error => console.error(error))
  }
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
              numSelected
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <Table size='md' {...getTableProps()}
        variant="striped"
        colorScheme="teal"
      >
        <TableCaption fontSize="md" px={0} pb={[2,4]} mt={[0,'1rem']} placement="top" >
          <Box py={[0,2]}>
            {tableHeading}
          </Box>
          <HStack bgColor={numSelected > 0? 'rgb(255, 226, 236)' : "" }>
            <MGMDialog  addHandler={addHandler} />
            {numSelected > 0 ? (
              <>
                <Box as="span" color="tomato">
                  {numSelected} selected
                </Box>
                <Spacer />
                <Tooltip label="Delete">
                  <IconButton
                    isRound
                    fontSize="20px" 
                    variant="ghost"
                    aria-label="delete"
                    bgColor = "transparent"
                    _hover={{ background: "rgba(0, 0, 0, 0.24)" }}
                    icon={<MdDelete />}
                    onClick={deleteHandler}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Spacer />
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </>
            )}
          </HStack>
        </TableCaption>
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
                  whiteSpace="nowrap"
                  >
                  {column.render('Header')}
                  {['selection','update'].includes(column.id) ? null : (
                    <Box as="span" pl={1}>
                    {column.isSorted
                    ? column.isSortedDesc
                        ? <Icon boxSize="1rem" as={MdArrowDownward} />
                        : <Icon boxSize="1rem" as={MdArrowUpward} />
                    : ''}
                  </Box> 
                  )}               
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
                  return <Td textAlign="center" p={1} whiteSpace="nowrap" {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
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
              <input
                type="number"
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
        {/* <select
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
        </select> */}
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
    </>
  )
}

export default EnhancedTable
