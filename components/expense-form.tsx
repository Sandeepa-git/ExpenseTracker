"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ExpenseFormProps {
  onAddTransaction: (description: string, amount: number, type: "income" | "expense") => void
}

export default function ExpenseForm({ onAddTransaction }: ExpenseFormProps) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!description.trim() || !amount.trim() || isNaN(Number.parseFloat(amount))) {
      return
    }

    onAddTransaction(description, Number.parseFloat(amount), type)
    setDescription("")
    setAmount("")
    setType("expense")
  }

  return (
    <Card className="p-6 border-2 border-primary/20 sticky top-6">
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description</label>
          <Input
            type="text"
            placeholder="e.g., Salary, Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Amount</label>
          <Input
            type="number"
            placeholder="0.00"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType("income")}
              className={`py-2 px-3 rounded-md font-medium transition-colors ${
                type === "income" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`py-2 px-3 rounded-md font-medium transition-colors ${
                type === "expense" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Add Transaction
        </Button>
      </form>
    </Card>
  )
}
