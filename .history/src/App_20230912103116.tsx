import { useEffect, useState } from "react"


const provider = (window as any).trustWallet

export default function App() {

  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    const onUpdateInfo = (...params: any) => {
      setInfo({
        ...params
      })
    }

    provider.on('accountsChanged', onUpdateInfo)
    provider.on('chainChanged', onUpdateInfo)
    provider.on('disconnect', onUpdateInfo)

    return () => {
      provider.off('accountsChanged', onUpdateInfo)
      provider.off('chainChanged', onUpdateInfo)
      provider.off('disconnect', onUpdateInfo)
    }
  }, [])

  const onConnect = async () => {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    })

    console.log(accounts, '===')
  }

  return <>
    <div>info: {JSON.stringify(info)}</div>
    <button onClick={onConnect}>connect</button>
  </>
}