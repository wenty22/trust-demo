import { useCallback, useEffect, useState } from "react"

const provider = (window as any).trustwallet

// This will print 'undefined'
console.log(provider.request, '===')
setTimeout(() => {
  // This is normal
  console.log(provider.request, '===')
}, 1000)

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

  const onAddChain = async () => {
    await provider.request({
      "method": "wallet_addEthereumChain",
      "params": [
        {
          "chainId": "0xcc",
          "chainName": "opBNB",
          "rpcUrls": [
            "https://opbnb-mainnet-rpc.bnbchain.org"
          ],
          "nativeCurrency": {
            "name": "BNB",
            "symbol": "BNB",
            "decimals": 18
          },
        }
      ]
    })
  }

  const onAddChain5600 = async () => {
    await provider.request({
      "method": "wallet_addEthereumChain",
      "params": [
        {
          "chainId": "0x15e0",
          "chainName": "GF testnet",
          "rpcUrls": [
            "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"
          ],
          "nativeCurrency": {
            "name": "tBNB",
            "symbol": "tBNB",
            "decimals": 18
          },
        }
      ]
    })
  }

  

  return <>
    <div>account: {JSON.stringify(account)}</div>
    <div>chain: {JSON.stringify(chain)}</div>
    <button onClick={onAddChain}>add 204</button>
    <button onClick={onAddChain5600}>add 5600</button>
    <br />
    {/* <div>log: {log.map((item, index) => <div key={index}>{item}</div>)}</div> */}
  </>
}