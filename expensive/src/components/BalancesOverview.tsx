import { CurrencyBalance } from "../lib/expensive/balance";

interface BalancesOverviewProps {
  balances: Array<CurrencyBalance>
}

export function BalancesOverview({ balances }: BalancesOverviewProps) {

  const overviewBoxes = balances.map((balance) => {
    return (
      <div>
        <h2>{balance.symbol}</h2>
        <h3>{balance.balance}</h3>
      </div>
    )
  })


  return (
    <div>
      {overviewBoxes}
    </div>
  );
}
