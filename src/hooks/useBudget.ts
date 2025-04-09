import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

//Vid 198 
export const useBudget = () => {
    //Usamos el context personalizado
    const context = useContext(BudgetContext)
    //Vid 198
    if(!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}