
import useSWR from 'swr'
import { createStandaloneToast } from "@chakra-ui/react"
import { fetchWithTimeout } from './fetchWithTimeout.ts';
import { useEffect } from 'react';

const base_url = process.env.NEXT_PUBLIC_BASE_URL
const toast = createStandaloneToast()

export const fetcher = (url) => fetch(base_url + url).then(res => {
  if (!res.ok) {
    const error = new Error('request failed')
    throw error
  }
  return res.json()
})

//PE/CE
export function useCustomSWR (url){ 
  const { data, error } = useSWR(url, fetcher, {revalidateOnFocus: false, dedupingInterval: 30*60*1000})
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useQuerySWR(query){
  const { 
    mgm = "", 
    pe = "", 
    ce_host_ip = "",
    target = "",
    device_account = "",
    check_command = ""
  } = query
  const controller = new AbortController();

  async function runQuery(...params) {

    // console.log('mgm__id', params)
    let upData = new FormData();
    upData.append('mgm_id',params[0])
    upData.append('check_command_id',params[1])
    upData.append('host_ip',params[2])
    upData.append('pe_id',params[3])
    upData.append('ce_host_ip',params[4])
    upData.append('ce_account_id',params[5])

    return await fetchWithTimeout(
      base_url+'/s_network_check/add',
      {
        method: 'POST',
        body: upData,
        cache: 'no-cache', 
        mode: 'cors',
        redirect: 'follow', 
        referrer: 'no-referrer', 
      },
      20 * 1000,
      controller,
    ).then(res => {
      if (!res.ok) {
        const error = new Error('request failed')
        throw error
      }
      return res.json()
    })
    
  }

  // Cancel any still-running queries on unmount.
  useEffect(
    () => () => {
      controller.abort();
    },
    [],
  );

  return useSWR([mgm,check_command,target,pe,ce_host_ip,device_account],
    runQuery,
    {revalidateOnFocus: false, errorRetryCount:1, dedupingInterval:0}
    )
}


export const nocacheFetcher = (url,formData,method) => 
            fetch(base_url + url, {
              method, 
              body: formData,
              cache: 'no-cache', 
              mode: 'cors',
              redirect: 'follow', 
              referrer: 'no-referrer', 
            }).then(res => {
              return res.json()
            }).catch(() => {
              toast({
                title: "error",
                description: "Network response was not ok.",
                status: "error",
                duration: 6000,
                position: "bottom-right",
                isClosable: true,
              })
            })

//增删改查
export function remoteGet(url, originData){
  const { data } = useSWR(url, fetcher, {initialData: originData, revalidateOnFocus: false})
  return data
}

export async function remoteDelete(url, formData) {
  await nocacheFetcher(`/${url}/delete`, formData, 'DELETE')
  .then(res => {
    if(res.result=="success!"){
      toast({
        title: `an ${url.slice(2)} deleted.`,
        status: "success",
        description: res.result,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }else{
      console.log(res.errors)
      toast({
        title: "An error occurred.",
        status: "error",
        description: res.message,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }
  })
}

export async function remoteAdd(url, formData) {
  await nocacheFetcher(`/${url}/add`, formData, 'POST')
  .then(res => {
    if(res.result=="success!"){
      toast({
        title: `an ${url.slice(2)} created.`,
        status: "success",
        description: res.result,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }else{
      console.log(res.errors||res.command)
      toast({
        title: "An error occurred.",
        status: "error",
        description: res.message||res.command,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }
  })
}


export async function remoteUpdate(url, formData) {
  await nocacheFetcher(`/${url}/modify`, formData, 'PUT')
  .then(res => {
    if(res.result=="success!"){
      toast({
        title: `an ${url.slice(2)} updated.`,
        status: "success",
        description: res.result,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }else{
      console.log(res.errors||res.command)
      toast({
        title: "An error occurred.",
        status: "error",
        description: res.message||res.command,
        duration: 6000,
        position: "bottom-right",
        isClosable: true,
      })
    }
  })
}