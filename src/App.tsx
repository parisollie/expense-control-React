import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  //Vid 198 
  const { state } = useBudget()
  //Vid 200,le decimos u es mayor
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  //Vid 221 
  useEffect(() => {
    //tostring, es un numero,por eso se lo ponemos 
    localStorage.setItem('budget', state.budget.toString())
    //Un arreglo lo ponemos en string 
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-turquesa py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Expense Planner
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">

        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBudget && (
        //Vid 202
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
