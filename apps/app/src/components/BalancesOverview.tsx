import { CurrencyBalance } from "../lib/expensive/balance";

interface BalancesOverviewProps {
  balances: Array<CurrencyBalance>;
}

export function BalancesOverview({ balances }: BalancesOverviewProps) {
  if (balances.length === 0) {
    return <h3>No Records Added</h3>;
  }

  const overviewBoxes = balances.map((balance) => {
    return (
      <div>
        <h2>{balance.symbol}</h2>
        <h3>{balance.balance.toLocaleString()}</h3>
      </div>
    );
  });

  return <div>{overviewBoxes}</div>;
}
