import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"


type BudgetContextProps = {
    //Vid 196, state y dispatch es lo que va a manejar.Sus variables las savamos de visual.
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    //Vid 223
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    //Vid 196
    children: ReactNode
}

//Vid 196, creamos el context ,le ponemos null!
export const BudgetContext = createContext<BudgetContextProps>(null!)

//Vid 196, siempre es un arrow function y siempre retornoa algo.Es de donde vienen los datos 
export const BudgetProvider = ({children} : BudgetProviderProps) => {
    //Lo instancias ,toma dos parametros (budgetReducer, initialState) 
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    //Vid 223  y 222
    const totalExpenses = useMemo( () => state.expenses.reduce((total, expense) => expense.amount + total, 0) , [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        //Vid 196,accedemos al state y dispatch,children hace referencia a los hijos de un componente.
        <BudgetContext.Provider
        //Vid 196,Provider siempre tiene este Value
            value={{
                state,
                dispatch,
                //Vid 223
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}