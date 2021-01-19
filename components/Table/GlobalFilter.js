import React from 'react'
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { MdSearch } from "react-icons/md"


const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length
  return (
    <InputGroup w="200px">
      <InputLeftElement
        pointerEvents="none"
        px={0}
        children={<MdSearch color="gray.300" />}
      />
      <Input
        value={globalFilter || ""}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined)
        }}
        
        placeholder={`${count} records...`} 
        aria-label="search"
      />
    </InputGroup>
  )
}

GlobalFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
}

export default GlobalFilter
