import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    //Vid 192, le ponemos para que inice en cero.
    const [budget, setBudget] = useState(0)
    //Vid 199,extraemos dispatch
    const { dispatch } = useBudget()

    //Vid 192 ,le ponemos el valor de Visual e : React.ChangeEvent<HTMLInputElement>
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
        //console.log(e.target.value)
    }
    //Vid 193, para validar que sea mayor a cero. 
    const isValid = useMemo(() => {
        //Vid 193, usamos useMemo para cada vez que el usario escribe algo y cambie.
        return isNaN(budget) || budget <= 0
    }, [budget])

    //Vid 199
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Define Budget
                </label>
                <input
                    //Vid 192 
                    id="budget"
                    type="number"
                    className="w-full bg-white border bordger-gray-200 p-2"
                    placeholder="Define Budget"
                    name="budget"
                    //Vid 192, el valor de nuestro formulario inicia en cero.
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value='Define Budget'

                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
