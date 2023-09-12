declare global {
  interface Window {
    ethereum: any;
    trustWallet: any;
    trustwallet: any;
    tokenpocket: any;
  }
  type Hash = `0x${string}`;
  type Dict<T = any> = Record<string, T>;
}