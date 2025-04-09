import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

//Vid 212 
export default function ExpenseList() {
    //Vid 212 ,extraemos el state porque queremos extraer los gastos 
    const { state } = useBudget()
    //Vid 227 
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    //Vid 212 
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">

            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">There are no expenses</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">List of Expenses</p>
                    {filteredExpenses.map(expense => (
                        //Vid 212 
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    )
}
