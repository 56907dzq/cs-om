import Select from 'react-select';
import { useCustomSWR } from 'util/requests'
import { ChakraSelect } from 'components/ChakraSelect';
const QueryServer = props  => {
  const { onChange, defaultValue, name } = props;
  const { data, isLoading } = useCustomSWR(`/s_${name}_server/search`)
  function handleChange(e){
    e ? onChange({field: name,value:e.id}):onChange({field: name,value: null});
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
      aria-label={name}
      name={name}
      onChange={handleChange}
    />
  );
};

export default QueryServer