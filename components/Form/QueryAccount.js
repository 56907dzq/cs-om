import React, { useEffect, useState } from 'react';
import { ChakraSelect } from '../Select';
import { useCustomSWR } from 'util/requests'

const QueryAccount = props => {
  
  const { onChange, ControlChange, defaultValue, name, query } = props;
  const { data,isLoading } = useCustomSWR(`/s_${name}/search?ce_device_name=${query.name}`)
  const [value, setValue] = useState(defaultValue)
  function handleChange(e){
    setValue(e)
    e ? ControlChange(e.id):ControlChange(null)
    e ? onChange({label: name,value: e.name}):onChange({label: name,value: null});
  }
  useEffect(() => {
    handleChange(null)
  },[query.name])

  return (
    <ChakraSelect
      size="lg"
      isClearable 
      isSearchable
      options={data}
      isLoading={isLoading}
      defaultValue={defaultValue}
      value={value}
      getOptionLabel={option => `${option.name}: ${option.description}`}
      getOptionValue={option => option['id']}
      aria-label={name}
      name={name}
      inputId={name}
      onChange={handleChange}
    />
  );
};

export default QueryAccount