import MakeWrap from './MakeWrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

export const ChakraSelect = MakeWrap(Select)

export const QuerySelect = MakeWrap(AsyncSelect)

export const CEChakraSelect = MakeWrap(AsyncCreatableSelect)

export const TargetChakraSelect = MakeWrap(CreatableSelect)
