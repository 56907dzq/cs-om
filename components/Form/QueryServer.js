import { ChakraSelect } from '../Select';
import { useCustomSWR } from 'util/requests'


const QueryServer = props  => {
  
  const { onChange, ControlChange, defaultValue, name } = props;
  const { data, isLoading } = useCustomSWR(`/s_${name}_server/search`)

  function handleChange(e){
    e ? ControlChange(e.id):ControlChange(null)
    e ? onChange({label: name,value:e.server_name}):onChange({label: name,value: null});
  }
  return (
    <ChakraSelect
      size="lg"
      isClearable 
      isSearchable
      options={data}
      isLoading={isLoading}
      defaultValue={defaultValue}
      getOptionLabel={option => `${option.server_name}: ${option.server_ip}`}
      getOptionValue={option => option['id']}
      aria-label={name}
      name={name}
      onChange={handleChange}
    />
  );
};

export default QueryServer