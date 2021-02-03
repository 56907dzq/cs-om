import {CEChakraSelect} from '../Select';
import { useState, useMemo } from 'react';


const createOption = (visible_name) => ({
  label: visible_name,
  visible_name: visible_name,
  ce_host_ip: visible_name,
});

const QueryCE = props  => {

  const {defaultValue, name, ce_data, ControlChange, onChange } = props;

  const [data, setData] = useState(useMemo(() => ce_data, []))
  const [value, setValue] = useState(defaultValue)
  const filterData = (inputValue) => {
    return data.filter(i =>
      i.visible_name.toLowerCase().includes(inputValue.toLowerCase())||
      i.ce_host_ip.includes(inputValue)
    ).slice(0,100);
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterData(inputValue));
    }, 800);
  };

  function handleChange(e){
    setValue(e)
    e ? ControlChange(e.ce_host_ip):ControlChange(null)
    e ? onChange({label: name,value:e.ce_host_ip}):onChange({label: name,value: null});
  }
  const handleCreate = (inputValue) => {
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setData([...data, newOption]);
      handleChange(newOption)
    }, 800);
  };

  return (
    <CEChakraSelect
      size="lg"
      name={name}
      aria-label={name}
      defaultValue={value}
      value={value}
      isClearable 
      defaultOptions
      onCreateOption={handleCreate}
      getOptionLabel={option => option.visible_name||option.label}
      getOptionValue={option => option['ce_host_ip']}
      loadOptions={loadOptions}
      onChange={handleChange}

    />
  );
};

export default QueryCE