import Select from 'react-select';
import { ChakraSelect } from 'components/ChakraSelect';
import { useCustomSWR } from 'util/requests'


const QueryCommamd = props => {
  const { onChange, defaultValue, name } = props;
  const { data, isLoading } = useCustomSWR(`/s_check_${name}/search`)
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
      getOptionLabel={option => `${option.name}: ${option.description}`}
      aria-label={name}
      name={name}
      onChange={handleChange}
    />
  );
};

export default QueryCommamd