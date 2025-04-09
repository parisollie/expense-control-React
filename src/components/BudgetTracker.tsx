import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {
    //Vid 222
    //En el state , tenemos las actividades y 223
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()
    //Vid 224 , para saber cuanto hemos gastado 
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)






    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">

                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                    })}
                    //Vid 224 
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    //Vid 225 
                    onClick={() => dispatch({ type: 'reset-app' })}
                >
                    Reset App
                </button>

                <AmountDisplay
                    label="Budget"
                    //Vid 222
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Available"
                    //Vid 222
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Spent"
                    //Vid 222
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
