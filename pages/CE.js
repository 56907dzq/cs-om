import Head from 'next/head';
import Layout from 'layouts/layout';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedDiv } from 'components/animated.tsx';
import { Flex } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import QueryServer from 'components/Form/QueryServer';
import QueryCE from 'components/Form/QueryCE';
import QueryComOrDev from 'components/Form/QueryComOrDev';
import QueryTarget from 'components/Form/QueryTarget'
import FormRow from 'components/Form/FormRow';
import FormField from 'components/Form/FormField';
import SubmitButton from 'components/Form/SubmitButton';
import { Results } from 'components/results/index.ts';
import { AnimatedResetButton } from 'components/results/ResetButton';


const url = 's_ce'
export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/${url}/search`)
  const ce_data = await res.json()

  return {
    props: {
      ce_data,
    },
    revalidate: 3600, 
  }
}

export default function CE({ce_data}) {

  const [mgmValue, setMgmValue] = useState({});
  const [ceValue, setCeValue] = useState({});
  const [commandValue, setCommandValue] = useState({});
  const [ceAccountValue, setceAccountValue] = useState({});
  
  const [formData, setFormData] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const { handleSubmit, errors, control, formState } = useForm({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      'mgm':'',
      'ce_host_ip':'',
      'device_account':'',
      'check_command':'',
      'target': ''
    }
  });

  const handleChange = (e) => {
    e.label === 'mgm'
      ? setMgmValue(e)
      : e.label === 'ce_host_ip'
      ? setCeValue(e)
      : e.label === 'device_account'
      ? setceAccountValue(e)
      : e.label === 'check_command'
      ? setCommandValue(e)
      : null;
  };
  const onSubmit = data => {
    setFormData(data)
    setSubmitting(true)
  }
  return (
    <Layout>
      <Head>
        <title>CE</title>
      </Head>
      {isSubmitting && formData && (
        <>
          <AnimatedResetButton 
            onClick={()=>setSubmitting(false)} />
          <Results
            formData={formData}
            mgmValue={mgmValue}
            ceValue={ceValue}
            commandValue={commandValue}
          />
        </>
      )}
      <AnimatePresence key="CE">
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
              label="CE"
              htmlFor="ce_host_ip"
              error={errors.ce_host_ip}
              >
              <Controller
                name="ce_host_ip"     
                control={control}
                rules={{
                    // required: {
                    //   value: true, 
                    //   message: 'Ce is required'
                    // }, 
                    pattern: {
                      value: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
                      message: 'this is not an ip address'
                    }
                  }}
                render={(
                  { name, onChange, defaultValue }
                ) => (
                  <QueryCE
                    name={name}
                    ControlChange={onChange}
                    defaultValue={defaultValue}
                    ce_data={ce_data}
                    onChange={handleChange}
                  />
                )}
              />
            </FormField>
          </FormRow>
          <FormRow>
            <FormField
              label="CE 账号"
              htmlFor="device_account"
              error={errors.device_account}
              >
              <Controller
                name="device_account"     
                control={control}
                rules={{required: {value:true, message:'Ce account is required'}}}
                render={(
                  { name, onChange, defaultValue }
                ) => (
                  <QueryComOrDev
                    name={name}
                    defaultValue={defaultValue}
                    ControlChange={onChange}
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
                  <QueryComOrDev
                    name={name}
                    defaultValue={defaultValue}
                    ControlChange={onChange}
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
