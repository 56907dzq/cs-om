
const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const remoteGet = (url) => fetch(base_url + url).then(res => res.json())

export function remoteDelete(url, fromData) {
  return fetch(base_url + url, {
    body: fromData,
    cache: 'no-cache', 
    method: 'DELETE', 
    mode: 'cors',
    redirect: 'follow', 
    referrer: 'no-referrer', 
  })
  .then(response => response.json())
}

export function remoteAdd(url, formData) {
  return fetch(base_url + url, {
    body: formData,
    cache: 'no-cache', 
    method: 'POST', 
    mode: 'cors',
    redirect: 'follow', 
    referrer: 'no-referrer', 
  })
  .then(response => response.json())
}

export function remoteUpdate(url, formData) {
  return fetch(base_url + url, {
    body: formData,
    cache: 'no-cache', 
    method: 'PUT', 
    mode: 'cors',
    redirect: 'follow', 
    referrer: 'no-referrer', 
  })
  .then(response => response.json())
}