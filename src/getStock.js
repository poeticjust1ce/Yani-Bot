import { imageSelect } from './imageSelect.js'

const api = 'https://blox-fruits-stock.onrender.com/'

export const getStock = async () => {
        const res = await fetch(api)
        const data = await res.json()

        return data
} 

export const getPrev = async () => {
    const res = await fetch(`${api}prev`)
    const data = await res.json()

    return data
} 

export const getBeforePrev = async () => {
    const res = await fetch(`${api}beforeprev`)
    const data = await res.json()
    
    return data
} 

export const getTimeLeft = async () => {
    const res = await fetch(`${api}timeleft`)
    const data = await res.json()

    return data.timeleft
}

