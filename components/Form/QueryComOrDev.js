import { ChakraSelect } from '../Select';
import { useCustomSWR } from 'util/requests'

const QueryComOrDev = props => {
  
  const { onChange, ControlChange, defaultValue, name } = props;

  const { data, isLoading } = useCustomSWR(`/s_${name}/search`)
  
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
      inputId={name}
      onChange={handleChange}
    />
  );
};

export default QueryComOrDev