import { useEffect, useState } from "react"


const provider = (window as any).trustWallet

export default function App() {

  const [account, setAccount] = useState<any>()
  const [chain, setChain] = useState<any>()
  const [info, setInfo] = useState<any>(null)

  useEffect(() => {
    const onAccountsChanged = (...params: any) => {
      setAccount({
        ...params
      })
    }

    const onChainChanged = (...params: any) => {
      setChain({
        ...params,
      })
    }

    provider.on('accountsChanged', onAccountsChanged)
    provider.on('chainChanged', onChainChanged)

    return () => {
      provider.off('accountsChanged', onAccountsChanged)
      provider.off('chainChanged', onChainChanged)
    }
  }, [])

  const onConnect = async () => {
    const account = await provider.request({
      method: 'eth_requestAccounts',
    })

    const chain = await provider.request({
      method: 'eth_chainId',
    })

    console.log(account, chain)
  }

  return <>
    <div>account: {JSON.stringify(info)}</div>
    <div>chain: {JSON.stringify(info)}</div>
    <button onClick={onConnect}>connect</button>
  </>
}