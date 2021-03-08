import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { ChakraSelect } from '../Select';
import { components } from 'react-select';
import { Tooltip } from "@chakra-ui/react"
import { useCustomSWR } from 'util/requests'

const Option = props => {
  const { command="" } = props.data
  return (
    <Tooltip 
     label={`检测命令:${command}`}
     placement="left" 
     aria-label="A tooltip" 
     shouldWrapChildren={true}>
      <components.Option {...props} />
    </Tooltip>
  );
};


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
      components={{ Option }}
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