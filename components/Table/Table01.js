import React from 'react'
import PropTypes from 'prop-types'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'

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

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
}

// Create an editable cell renderer
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

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  updateMyData: PropTypes.func.isRequired,
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}


const EnhancedTable = ({
  columns,
  data,
  updateMyData
}) => {
  let hiddenColumns = [];

  columns.map(col => {
    if (col.hidden === true) {
      hiddenColumns.push(col.accessor);
    }
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
      defaultColumn,
      autoResetPage: true,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
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
  );


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
      <table {...getTableProps()} style={{ borderSpacing: 0, border: "1px solid black" }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} style={{
              '&lastChild': {
                td: {
                  borderBottom: 0
                }
              }   
          }}>
              {headerGroup.headers.map(column => (
                <th {...(column.id === 'selection'
                ? column.getHeaderProps()
                : column.getHeaderProps(column.getSortByToggleProps()))}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.id !== 'selection' 
                      ? column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''  
                      : ''
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} style={{
                    margin: 0,
                    padding: '0.5rem',
                    borderBottom: '1px solid black',
                    borderRight: '1px solid black',
                    '&lastChild': {
                      borderRight: 0
                    }
                  }}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div style={{padding: '0.5rem'}}>
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
      </div>
    </>
  )
}


EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired
}

export default EnhancedTable

//Table
// export const Table = ({
//   columns,
//   data,
//   tableHeading,
//   initialPageSize = 10,
//   onRowClick,
//   striped = false,
//   bordersVertical = false,
//   bordersHorizontal = false,
//   cellRender = null,
//   rowHighlightProp,
//   rowHighlightBg,
//   rowHighlightColor,
// }) => {
//   const tableColumns = useMemo(() => columns, [columns]);

//   const defaultColumn = useMemo(
//     () => ({
//       minWidth: 100,
//       width: 150,
//       maxWidth: 300,
//     }),
//     [],
//   );

//   let hiddenColumns = [];

//   tableColumns.map(col => {
//     if (col.hidden === true) {
//       hiddenColumns.push(col.accessor);
//     }
//   });

//   const {
//     getTableProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns: tableColumns,
//       defaultColumn,
//       data,
//       initialState: {
//         pageIndex: 0,
//         pageSize: initialPageSize,
//         hiddenColumns: hiddenColumns,
//       },
//     },
//     useSortBy,
//     usePagination,
//   );

//   return (
//     <CardBody>
//       {!!tableHeading && <CardHeader>{tableHeading}</CardHeader>}
//       <TableMain {...getTableProps()}>
//         <TableHead>
//           {headerGroups.map(headerGroup => (
//             <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <TableCell
//                   as="th"
//                   align={column.align}
//                   key={column.id}
//                   {...column.getHeaderProps()}
//                   {...column.getSortByToggleProps()}>
//                   <Text fontSize="sm" fontWeight="bold" display="inline-block">
//                     {column.render('Header')}
//                   </Text>
//                   {column.isSorted ? (
//                     column.isSortedDesc ? (
//                       <Icon name="chevron-down" size={4} ml={1} />
//                     ) : (
//                       <Icon name="chevron-up" size={4} ml={1} />
//                     )
//                   ) : (
//                     ''
//                   )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableHead>
//         <TableBody>
//           {page.map(
//             (row, key) =>
//               prepareRow(row) || (
//                 <TableRow
//                   index={key}
//                   doHorizontalBorders={bordersHorizontal}      
//                   key={key}
//                   highlight={row.values[rowHighlightProp] ?? false}
//                   highlightBg={rowHighlightBg}
//                   highlightColor={rowHighlightColor}
//                   {...row.getRowProps()}>
//                   {row.cells.map((cell, i) => {
//                     return (
                      // <TableCell
                      //   align={cell.column.align}
                      //   cell={cell}
                      //   bordersVertical={[bordersVertical, i]}
                      //   key={cell.row.index}
                      //   {...cell.getCellProps()}>
                      //   {cell.render(cellRender ?? 'Cell')}
                      // </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ),
//           )}
//         </TableBody>
//       </TableMain>
//       <CardFooter>
//         <Flex direction="row">
//           <TableIconButton
//             mr={2}
//             onClick={() => gotoPage(0)}
//             isDisabled={!canPreviousPage}
//             icon={() => <Icon name="arrow-left" size={3} />}
//           />
//           <TableIconButton
//             mr={2}
//             onClick={() => previousPage()}
//             isDisabled={!canPreviousPage}
//             icon={() => <Icon name="chevron-left" size={6} />}
//           />
//         </Flex>
//         <Flex justifyContent="center" alignItems="center">
//           <Text fontSize="sm" mr={4} whiteSpace="nowrap">
//             Page{' '}
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>{' '}
//           </Text>
//           {!(isSm || isMd) && (
//             <TableSelectShow
//               value={pageSize}
//               onChange={e => {
//                 setPageSize(Number(e.target.value));
//               }}
//             />
//           )}
//         </Flex>
//         <Flex direction="row">
//           <TableIconButton
//             ml={2}
//             isDisabled={!canNextPage}
//             onClick={() => nextPage()}
//             icon={() => <Icon name="chevron-right" size={6} />}
//           />
//           <TableIconButton
//             ml={2}
//             onClick={() => gotoPage(pageCount ? pageCount - 1 : 1)}
//             isDisabled={!canNextPage}
//             icon={() => <Icon name="arrow-right" size={3} />}
//           />
//         </Flex>
//       </CardFooter>
//     </CardBody>
//   );
// };
