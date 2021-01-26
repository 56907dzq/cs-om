import { createContext, useContext, useMemo } from 'react';
import ReactSelect from 'react-select';
import { chakra, useDisclosure } from '@chakra-ui/react';
import {
  useRSTheme,
  useMenuStyle,
  useMenuPortal,
  useOptionStyle,
  useControlStyle,
  useMenuListStyle,
  usePlaceholderStyle,
  useSingleValueStyle,
  useIndicatorSeparatorStyle,
} from './styles';



const SelectContext = createContext(Object());
export const useSelectContext = () => useContext(SelectContext);

const ReactSelectChakra = chakra(ReactSelect);

export const Select = (props) => {
  const { options, multi, onSelect, isError = false, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();


  const defaultOnChange = (changed) => {
    if (!Array.isArray(changed)) {
      changed = [changed];
    }
    if (typeof onSelect === 'function') {
      onSelect(changed);
    }
  };
  const menuPortal = useMenuPortal();
  const rsTheme = useRSTheme();

  return <>
      <ReactSelectChakra
        onChange={defaultOnChange}
        onMenuClose={onClose}
        onMenuOpen={onOpen}
        isClearable={true}
        options={options}
        isMulti={multi}
        theme={rsTheme}
        styles={{
          menuPortal,
          multiValue,
          multiValueLabel,
          multiValueRemove,
          menu: useMenuStyle,
          option: useOptionStyle,
          control: useControlStyle,
          menuList: useMenuListStyle,
          singleValue: useSingleValueStyle,
          placeholder: usePlaceholderStyle,
          indicatorSeparator: useIndicatorSeparatorStyle,
        }}
        {...rest}
      />
      </>
};
