import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

//Vid 194,
export type BudgetActions = 
//Vid 194
    { type: 'add-budget', payload: {budget: number} } |
    //Vid 203
    { type: 'show-modal' } |
    //Vid 204
    { type: 'close-modal' } |
    //Vid 210
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    //Vid 216
    { type: 'remove-expense', payload: {id: Expense['id']} } |
    //Vid 217
    { type: 'get-expense-by-id', payload: {id: Expense['id'] } } |
    //Vid 218
    { type: 'update-expense', payload: { expense: Expense} } |
    //Vid 225 
    { type: 'reset-app' } |
    //Vid 227
    { type: 'add-filter-category', payload: {id: Category['id'] } }


//Vid 194
export type BudgetState = {
    //Vid 194
    budget: number
    modal: boolean
    //Vid 210
    expenses: Expense[]
    //Vid 217 
    editingId: Expense['id']
    currentCategory: Category['id']
}

//Vid 221
const initialBudget = () : number => {
    
    const localStorageBudget = localStorage.getItem('budget')
    //Retorna ese local ese local  pero conviertelo a numero , en caso contrario inicia en cero 
    return localStorageBudget ? +localStorageBudget : 0
}
//Vid 221
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    //El lovalstorage tiene algo sino regresa ese arreglo vacio 
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}
//Vid 194,
export const initialState : BudgetState = {
    //Vid 221
    budget: initialBudget(),
    //Vid 203
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

//Vid 210 
const createExpense = (draftExpense: DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}

//Vid 194
export const budgetReducer = (
        state: BudgetState = initialState,
        //Vid 194, para que tengamos el autocompletado.
        action: BudgetActions
    ) => {

    //Vid 194,
    if(action.type === 'add-budget') {
        return {
            //copia del estado
            ...state,
            // Ya lo validamos en el componente y escribiremos lo que llegue en el .
            budget: action.payload.budget
        }
    }
    //Vid 203
    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    //Vid 204
    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            //Vid 218, siempre que se cierre 
            editingId: ''
        }
    }

    //Vid 210
    if(action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            // Vid 210
            expenses: [...state.expenses, expense],
            //Vid 211
            modal: false
        }
    }

    //Vid 216 
    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter( expense => expense.id !== action.payload.id)
        }
    }

    // Vid 217 
    if(action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
     //Vid 218
    if(action.type === 'update-expense') {
        return {
            ...state,
            //Identificamos cual gasto estamos actualizando 
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense ),
            modal: false,
            editingId: ''
        }
    }

    //Vid 225 
    if(action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }
    //Vid 227 

    if(action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }
    
    //Vid 194, siempre debemos tener un return a state.
    return state
}