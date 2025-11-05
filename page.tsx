"use client"

import { useState, useEffect } from "react"
import ExpenseForm from "@/components/expense-form"
import BalanceCard from "@/components/balance-card"
import TransactionList from "@/components/transaction-list"

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  date: string
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("transactions")
    if (saved) {
      try {
        setTransactions(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load transactions:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions, isLoaded])

  const addTransaction = (description: string, amount: number, type: "income" | "expense") => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount,
      type,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }
    setTransactions([newTransaction, ...transactions])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // Calculate totals
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-5xl space-y-10">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Track your income and expenses with ease
          </p>
        </header>

        {/* Balance Cards */}
        <div className="w-full">
          <BalanceCard balance={balance} income={income} expenses={expenses} />
        </div>

        {/* Form + Transactions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Expense Form */}
          <div className="lg:col-span-1 bg-card p-4 sm:p-6 rounded-2xl shadow-md border border-border">
            <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
              Add Transaction
            </h2>
            <ExpenseForm onAddTransaction={addTransaction} />
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2 bg-card p-4 sm:p-6 rounded-2xl shadow-md border border-border">
            <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
              Recent Transactions
            </h2>
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </section>
      </div>
    </main>
  )
}
