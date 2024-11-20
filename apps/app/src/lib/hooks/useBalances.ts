import { useApi, useExpensiveState } from "../../context/expensive";
import { useCallback, useEffect } from "react";

export function useBalances() {
  const { balances, setBalances } = useExpensiveState()
  const { balance } = useApi()

  const refresh = useCallback(() => {
    if (balance) {
      balance.get().then((setBalances))
    }
  }, [balance, setBalances]);

  useEffect(() => {
    if (balance) {
      refresh();
    }
  }, [balance])

  return { balances, refresh }
}
