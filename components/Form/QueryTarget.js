import * as React from 'react';
import { TargetChakraSelect } from '../Select';

const data = [
  { value: '202.96.209.5', label: '202.96.209.5'},
  { value: '8.8.8.8', label: '8.8.8.8'},
  { value: 'www.baidu.com', label: 'www.baidu.com'}
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