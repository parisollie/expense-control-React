
//Vid 201, toma una cantidad number
export function formatCurrency(amount: number) {
    //será en ingles y la monea a formatear es dolar
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)
}

//Vid 213 , para poner la fecha en español y debe retornar en string 
export function formatDate(dateStr: string) : string {
    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}