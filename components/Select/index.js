import MakeWrap from './MakeWrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';


export const ChakraSelect = MakeWrap(Select)

export const CEChakraSelect = MakeWrap(AsyncCreatableSelect)

export const TargetChakraSelect = MakeWrap(CreatableSelect)
