import { useMemo } from "react"
import {
    //Vid 215 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

//Vid 212 
type ExpenseDetailProps = {
    expense: Expense
}
//Vid 212 
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
    //Vid 216
    const { dispatch } = useBudget()

    //Vid 214 ,nos traera un arreglo, por eso le ponemos [0]
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    //Vid 215 
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                //Vid 215 y 217 
                onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )
    //Vid 215 
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                //Vid 216 
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        //Vid 215 
        <SwipeableList>

            <SwipeableListItem
                maxSwipe={1}
                //Vid 215 
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img
                            //Vid 214,muestra la ruta de la imagen
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className=" text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>

                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
