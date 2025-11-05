"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/app/page"
import { Trash2 } from "lucide-react"

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="p-8 border-2 border-primary/20 text-center">
        <p className="text-muted-foreground">No transactions yet. Add one to get started!</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Recent Transactions</h2>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="p-4 border-2 border-primary/10 hover:border-primary/30 transition-colors flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${transaction.type === "income" ? "bg-green-600" : "bg-red-600"}`}
                />
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className={`text-lg font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
