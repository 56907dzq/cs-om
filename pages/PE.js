import Head from 'next/head'
import Layout from 'layouts/layout'
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedDiv } from 'components/animated.tsx';
import { Flex } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";
import QueryServer from 'components/Form/QueryServer'
import QueryCommand from 'components/Form/QueryCommand';
import QueryTarget from 'components/Form/QueryTarget'
import FormRow from 'components/Form/FormRow';
import FormField from 'components/Form/FormField';
import SubmitButton from 'components/Form/SubmitButton';
import { Results } from 'components/results/index.ts'
import { AnimatedResetButton } from 'components/results/ResetButton';


export default function PE() {

  const [mgmValue, setMgmValue] = useState({});
  const [peValue, setPeValue] = useState({});
  const [commandValue, setCommandValue] = useState({});
  
  const [formData, setFormData] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const { handleSubmit, errors, control, formState } = useForm({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      'mgm':'',
      'pe':'',
      'check_command':'',
      'target': ''
    }
  });

  const handleChange = (e) => {
    e.label === 'mgm'
      ? setMgmValue(e)
      : e.label === 'pe'
      ? setPeValue(e)
      : e.label === 'check_command'
      ? setCommandValue(e)
      : null;
  };
  const onSubmit = data => {
    // console.log(data);
    setFormData(data)
    setSubmitting(true)
  }

  return (
    <Layout>
      <Head>
        <title>PE</title>
      </Head>
      {isSubmitting && formData && (
        <>
          <AnimatedResetButton 
            onClick={()=>setSubmitting(false)} />
          <Results
            formData={formData}
            mgmValue={mgmValue}
            peValue={peValue}
            commandValue={commandValue}
          />
        </>
      )}
      <AnimatePresence key="PE">
        {!isSubmitting && (
          <AnimatedDiv 
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          maxW={['100%', '100%', '75%', '75%']}
          w="100%"
          p={0}
          mx="auto"
          py={[4,6,10]}
          textAlign="left"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, x: -300 }}
          initial={{ opacity: 0, y: 300 }}
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
                  { name, onChange, defaultValue }
                ) => (
                  <QueryServer
                    name={name}
                    ControlChange={onChange}
                    defaultValue={defaultValue}
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
                  { name, onChange, defaultValue }
                ) => (
                  <QueryServer
                    name={name}
                    ControlChange={onChange}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                  />
                )}
              />
            </FormField>
            <FormField
              label="操作命令"
              htmlFor="check_command"
              error={errors.check_command}
              >
              <Controller
                name="check_command"     
                control={control}
                rules={{required: {value:true, message:'command is required'}}}
                render={(
                  { name, onChange, defaultValue }
                ) => (
                  <QueryCommand
                    name={name}
                    type="PE"
                    query={{name:''}}
                    ControlChange={onChange}
                    defaultValue={defaultValue}
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
               <Controller
                name="target"     
                control={control}
                rules={{
                  validate: {
                    maxLength: value => {
                      if(value){
                        if(value.length<=3){
                          return true
                        }else{
                          return "max support 3"
                        }
                      }
                      return true
                    }
                  }
                }}
                render={(
                  { name, onChange, defaultValue }
                ) => (
                  <QueryTarget
                    name={name}
                    defaultValue={defaultValue}
                    ControlChange={onChange}
                  />
                )}
              />
            </FormField>
          </FormRow>
          <FormRow mt={2} justifyContent="flex-end">
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
        </AnimatedDiv>
        )}
      </AnimatePresence> 
    </Layout>
  )
}
