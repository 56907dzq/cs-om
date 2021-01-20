
import useSWR, { mutate } from 'swr'
import { createStandaloneToast } from "@chakra-ui/react"

const base_url = process.env.NEXT_PUBLIC_BASE_URL
const toast = createStandaloneToast()

export const fetcher = (url) => fetch(base_url + url).then(res => res.json())
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