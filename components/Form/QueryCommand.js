import { ChakraSelect } from 'components/ChakraSelect';
import { useCustomSWR } from 'util/requests'


const QueryCommamd = props => {
  
  const { onChange, ControlChange, defaultValue, name } = props;
  const { data, isLoading } = useCustomSWR(`/s_check_${name}/search`)
  
  function handleChange(e){
    e ? ControlChange(e.id):ControlChange(null)
    e ? onChange({label: name,value: e.name}):onChange({label: name,value: null});
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
      getOptionValue={option => option['id']}
      aria-label={name}
      name={name}
      onChange={handleChange}
    />
  );
};

export default QueryCommamd