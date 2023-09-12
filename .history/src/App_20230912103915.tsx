import { useEffect, useState } from "react"


const provider = (window as any).trustWallet

export default function App() {

  const [account, setAccount] = useState<any>()
  const [chain, setChain] = useState<any>()
  

  useEffect(() => {
    const onUpdate = async () => {
      const account = await provider.request({
        method: 'eth_requestAccounts',
      })
  
      const chain = await provider.request({
        method: 'eth_chainId',
      })

      setAccount(account)
      setChain(chain)
    }

    onUpdate()
  }, [])

  return <>
    <div>account: {JSON.stringify(account)}</div>
    <div>chain: {JSON.stringify(chain)}</div>
  </>
}