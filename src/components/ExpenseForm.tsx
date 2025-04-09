import { ChangeEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {
    //Vid 207
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })


    //Vid 209
    const [error, setError] = useState('')
    //Vid 223 
    const [previousAmount, setPreviousAmount] = useState(0)
    //Vid 210 y 223 
    const { dispatch, state, remainingBudget } = useBudget()

    //Vid 218 
    useEffect(() => {
        //Siempre se ejecuta al menos una vez 
        if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            //Vid 223 
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    //Vid 208 
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        //Si es amount conviertelo a numero.
        const { name, value } = e.target
        //Retornoa true o falso para saber si es amount
        const isAmountField = ['amount'].includes(name)
        setExpense({
            //Hacemos una copia del expend 
            ...expense,
            // Si es de esta forma lo convertimos a numero , en el caso contrario lo escribimos 
            [name]: isAmountField ? Number(value) : value
        })
    }

    //Vid 208 ,value : Value e sun value personalzado
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    //Vid 209
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // vid 210 , validar, Object.values lo transforma a objeto 
        if (Object.values(expense).includes('')) {
            //Vid 209
            setError('All fields are required')
            return
        }

        //Vid 223, Validar que no me pase del limite
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('That expense is out of budget')
            return
        }


        // Vid 218 Agregar o actualizar el gasto
        if (state.editingId) {
            //Vid 218, recuperamos el id ...toma una copia del gasto 
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        // Vid 211 , reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        //Vid 223
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
            //Vid 220 y sino mostramos Nuevo Gasto 
            >{state.editingId ? 'Updating' : 'New Expense'}</legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >Name of the expense:</label>

                <input
                    type="text"
                    id="expenseName"
                    placeholder="Add the name of the expense"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    //Vid 208
                    onChange={handleChange}
                    //Vid 207
                    value={expense.expenseName}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >Quantiy:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Add the quantity: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    //
                    onChange={handleChange}
                    //Vid 207
                    value={expense.amount}
                />
            </div>


            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >Category:</label>
                <select
                    id="category"
                    //placeholder = "Añade la cantaidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="category"
                    //Vid 208 
                    onChange={handleChange}
                    value={expense.category}
                >

                    <option value="">-- Select --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            //Vid 207 
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"
                >Date of expenditure:</label>

                <DatePicker
                    //Vid 206
                    className="bg-slate-100 p-2 border-0"
                    //Vid 207 
                    value={expense.date}
                    //Vid 208
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-turquesa cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                //className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                //Vid 220 
                value={state.editingId ? 'Save Changes' : 'Record Expense'}
            />
        </form>
    )
}
