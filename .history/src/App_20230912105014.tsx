import { useCallback, useEffect, useState } from "react"

const provider = (window as any).trustWallet

export default function App() {

  const [account, setAccount] = useState<any>()
  const [chain, setChain] = useState<any>()

  const [log, setLog] = useState<string[]>([])
  const addLog = useCallback((next: string) => {
    setLog((prev) => [...prev, next])
  }, [])
  

  useEffect(() => {
    const onUpdate = async () => {
      addLog('eth_requestAccounts start')
      const account = await provider.request({
        method: 'eth_requestAccounts',
      })
      addLog('eth_requestAccounts end')
  
      addLog('eth_chainId start')
      const chain = await provider.request({
        method: 'eth_chainId',
      })
      addLog('eth_chainId end')

      setAccount(account)
      setChain(chain)
    }

    onUpdate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div>account: {JSON.stringify(account)}</div>
    <div>chain: {JSON.stringify(chain)}</div>
    <br />
    <div>log: {log.map((item, index) => <div key={index}>{item}</div>)}</div>
  </>
}