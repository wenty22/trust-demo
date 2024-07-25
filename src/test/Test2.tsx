import { useState } from "react"

const provider = (window as any).trustwallet // 4200, 4200
// const provider = (window as any).ethereum // 4902, 4001

function numberToHex(value: number) {
  return `0x` + value.toString(16)
}

export default function App() {
  const [errorCodeMap, setErrorCodeMap] = useState<Record<number, number>>({})

  const onSwitchNetwork = async (chainId: number) => {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: numberToHex(chainId) }],
      })
    } catch (err: any) {
      console.log('error code', err.code)

      setErrorCodeMap((preValue) => ({
        ...preValue,
        [chainId]: err.code
      }))
    }
  }

  return <>
    <div>
      scene 1: The target network has not been added to the wallet
      <br />
      <div>error code: {errorCodeMap[210425]}</div>
      <button onClick={() => onSwitchNetwork(210425)}>Switch chain</button>
    </div>

    <div>
      scene 2: In the pop-up window, the user cancels the switching
      <br />
      <div>error code: {errorCodeMap[1]}</div>
      <button onClick={() => onSwitchNetwork(1)}>Switch chain</button>
    </div>
  </>
}