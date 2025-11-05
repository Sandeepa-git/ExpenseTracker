import { Card } from "@/components/ui/card"

interface BalanceCardProps {
  balance: number
  income: number
  expenses: number
}

export default function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  const balanceColor = balance >= 0 ? "text-green-600" : "text-red-600"

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Balance */}
      <Card className="p-6 border-2 border-primary/20 bg-card">
        <p className="text-sm font-medium text-muted-foreground mb-2">Total Balance</p>
        <p className={`text-3xl font-bold ${balanceColor}`}>${balance.toFixed(2)}</p>
      </Card>

      {/* Income */}
      <Card className="p-6 border-2 border-green-500/20 bg-card">
        <p className="text-sm font-medium text-muted-foreground mb-2">Total Income</p>
        <p className="text-3xl font-bold text-green-600">${income.toFixed(2)}</p>
      </Card>

      {/* Expenses */}
      <Card className="p-6 border-2 border-red-500/20 bg-card">
        <p className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</p>
        <p className="text-3xl font-bold text-red-600">${expenses.toFixed(2)}</p>
      </Card>
    </div>
  )
}
