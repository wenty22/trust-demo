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

  const onConnect = () => {
    provider.request({

    })
  }

  return <>
    <div>info: {info}</div>
    <button onClick={onConnect}>connect</button>
  </>
}