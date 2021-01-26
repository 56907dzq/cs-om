import Head from 'next/head'
import Layout from 'layouts/layout'
import { useState } from 'react';
import { Box, Flex } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";
import QueryServer from 'components/Form/QueryServer'
import QueryCommand from 'components/Form/QueryCommand'
import QueryTarget from 'components/Form/QueryTarget'
import FormRow from 'components/Form/FormRow';
import FormField from 'components/Form/FormField';
import SubmitButton from 'components/Form/SubmitButton'

export default function PE() {

  const [mgmValue, setMgmValue] = useState(null);
  const [peValue, setPeValue] = useState(null);
  const [commandValue, setCommandValue] = useState(null);
  const [targetValue, setTargetValue] = useState(null);
  const { register, handleSubmit, errors, control, formState, setValue } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      'mgm':mgmValue,
      'pe':peValue,
      'command':commandValue,
      'target': targetValue
    }
  });

  const handleChange = (e) => {
    setValue(e.field, e.value);
    e.field === 'mgm'
      ? setMgmValue(e.value)
      : e.field === 'pe'
      ? setPeValue(e.value)
      : e.field === 'command'
      ? setCommandValue(e.value)
      : e.field === 'target'
      ? setTargetValue(e.value)
      : null;
  };
  const onSubmit = data => {
    console.log(data,mgmValue,peValue,commandValue,targetValue);
  }
  return (
    <Layout>
      <Head>
        <title>PE</title>
      </Head>
      <Box 
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        maxW={['100%', '100%', '75%', '75%']}
        w="100%"
        p={0}
        mx="auto"
        my={4}
        textAlign="left"
        >
        <FormRow>
          <FormField
            label="mgm跳板机"
            htmlFor="mgm"
            error={errors.mgm}
            >
            <Controller
              name="mgm"     
              control={control}
              rules={{required: {value:true, message:'Mgm is required'}}}
              render={(
                { name }
              ) => (
                <QueryServer
                  name={name}
                  defaultValue={mgmValue}
                  onChange={handleChange}
                />
              )}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField
            label="P E"
            htmlFor="pe"
            error={errors.pe}
            >
            <Controller
              name="pe"     
              control={control}
              rules={{required: {value:true, message:'Pe is required'}}}
              render={(
                { name }
              ) => (
                <QueryServer
                  name={name}
                  defaultValue={peValue}
                  onChange={handleChange}
                />
              )}
            />
          </FormField>
          <FormField
            label="操作命令"
            htmlFor="command"
            error={errors.command}
            >
            <Controller
              name="command"     
              control={control}
              rules={{required: {value:true, message:'command is required'}}}
              render={(
                { name }
              ) => (
                <QueryCommand
                  name={name}
                  defaultValue={commandValue}
                  onChange={handleChange}
                />
              )}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField
            label="目标地址"
            htmlFor="target"
            error={errors.target}
            >
            <QueryTarget
              name="target"
              register={register}
              onChange={handleChange}
              placeholder="Target"
            />
          </FormField>
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
            <SubmitButton isLoading={formState.isSubmitting} />
          </Flex>
        </FormRow>
      </Box>
    </Layout>
  )
}
