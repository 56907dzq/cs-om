import * as React from 'react';
import { TargetChakraSelect } from '../Select';

const data = [
  { value: 'access.fashion-tele.com', label: 'access.fashion-tele.com'},
  { value: 'accesszp.fashion-tele.com', label: 'accesszp.fashion-tele.com'},
  { value: '222.73.198.139', label: '222.73.198.139'},
  { value: '61.151.249.2', label: '61.151.249.2'}
];

const QueryTarget = props => {
  
  const { ControlChange, defaultValue, name } = props;

  return (
    <TargetChakraSelect
      size="lg"
      isMulti
      isClearable 
      isSearchable
      options={data}
      defaultValue={defaultValue}
      aria-label={name}
      name={name}
      inputId={name}
      onChange={ControlChange}
    />
  );
};


export default QueryTarget