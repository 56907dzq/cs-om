import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { ChakraSelect } from '../Select';
import { useCustomSWR } from 'util/requests'


const QueryCommand = props => {
  
  const { onChange, ControlChange, defaultValue, name, query, type } = props;
  const { data,isLoading } = useCustomSWR(`/s_${name}/search?ce_device_name=${query.name}`)
  const [value, setValue] = useState(defaultValue)
  const [options, setOptions] = useState(data);
  function handleChange(e){
    setValue(e)
    e ? ControlChange(e.id):ControlChange(null)
    e ? onChange({label: name,value: e.name}):onChange({label: name,value: null});
  }
  useEffect(() => {
    if(!isLoading){
      setOptions(_.filter(data, function(o) { 
        if(type=="CE")
        return !_.startsWith(o.command, 'docker')
        else
        return _.startsWith(o.command, 'docker') 
      }))
    }
  },[type, data]);
  useEffect(() => {
    handleChange(null)
  },[query.name])
  return (
    <ChakraSelect
      size="lg"
      isClearable 
      isSearchable
      options={options}
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

export default QueryCommand