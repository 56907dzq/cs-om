import * as React from 'react';
import { forwardRef, useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useForm} from 'react-hook-form';
import format from 'string-format';
import FormField from './FormField';
import SubmitButton from './SubmitButton'
import QueryCE from './QueryCE'

format.extend(String.prototype, {});

const FormRow = ({ children, ...props }) => (
  <Flex
    flexDirection="row"
    flexWrap="wrap"
    w="100%"
    justifyContent={['center', 'center', 'space-between', 'space-between']}
    {...props}>
    {children}
  </Flex>
);


const CeFrom = forwardRef(
  ({ ce_data, isSubmitting, setSubmitting, setFormData, ...props }, ref) => {
  const { register, handleSubmit, setValue, watch, errors } = useForm();
  const [query_ce, setQuery_ce] = useState('');
  const [query_pe, setQuery_pe] = useState('');

  const handleChange = e => {
    setValue(e.field, e.value);
      e.field === 'query_ce'
      ? setQuery_ce(e.value)
      : e.field === 'query_pe'
      ? setQuery_pe(e.value)
      : null;
  };
  // const onSubmit = values => {
  //     setFormData(values);
  //     setSubmitting(true);
  //   }
  const onSubmit = data => console.log(data);
  useEffect(() => {
    register({ name: 'query_ce'},{required: true });
  }, [register]);
  console.log(watch("query_ce"));
  Object.keys(errors).length >= 1 && console.error(errors);
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      maxW={['100%', '100%', '75%', '75%']}
      w="100%"
      p={0}
      mx="auto"
      my={4}
      textAlign="left"
      ref={ref}
      {...props}>
      <FormRow>
        <FormField
          label="Customer Edge"
          name="query_ce"
          error={errors.query_ce}>
          <QueryCE
            onChange={handleChange}
            ce_data={ce_data}
            label="Customer Edge"
          />
        </FormField>
        {/* <FormField
          label="Provider Edge"
          name="query_ce"
          error={errors.query_ce}>
          <QueryCE
            locations={config.networks}
            label={config.web.text.query_location}
          />
        </FormField> */}
      </FormRow>
      <FormRow mt={0} justifyContent="flex-end">
        <Flex
          w="100%"
          maxW="100%"
          ml="auto"
          my={2}
          mr={[0, 0, 2, 2]}
          flexDirection="column"
          flex="0 0 0">
          <SubmitButton isLoading={false} />
        </Flex>
      </FormRow>
    </Box>
  );
})


export default CeFrom