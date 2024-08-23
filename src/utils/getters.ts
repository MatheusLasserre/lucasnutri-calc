export const getSexByNumber = (number: 1 | 2) => {
    if (number === 1) {
        return 'Homem'
    }
    if (number === 2) {
        return 'Mulher'
    }
    throw new Error('Invalid number')
}

export const getEtniaByNumber = (number: 1 | 2) => {
    if (number === 1) {
        return 'Negro'
    }
    if (number === 2) {
        return 'Branco'
    }
    throw new Error('Invalid number')
}

export const isIdoso = (number: number) => {
    if(number >= 60) {
        return true
    }
    return false
}