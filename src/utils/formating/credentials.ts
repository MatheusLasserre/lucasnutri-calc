export const NumberWithoutCommasAndDots = (value: string) => {
    return value.replace(/[^0-9]/g, '')
}


export const FormatNumberMask = (value: number, AppendCurrency?:string) => {
    let mystring = NumberWithoutCommasAndDots(parseFloat((Number(value) * 100).toFixed(2)).toString());
    // const last2digits = mystring.length >= 3 ? [',', mystring.slice(-2)].join('') : [mystring].join('');
    const last2digits = mystring.length >= 3 ? [',', mystring.slice(-2)].join('') : mystring.length === 2 ? ['0,', mystring].join('') : ['0,0', mystring].join('');
    mystring = mystring.slice(0, -2);
    const dotsQuantity = Math.floor((mystring.length - 1) / 3);
    for (let i = 1; i < dotsQuantity + 1; i++) {
        const insertPosition = NumberWithoutCommasAndDots(mystring).length - (3 * i);
        mystring = [mystring.slice(0, insertPosition), '.', mystring.slice(insertPosition)].join('');
    }
    const prefix = Number(value) < 0 ? '-' : '';
    mystring = [prefix, mystring, last2digits].join('');
    if(AppendCurrency) {
        mystring = [AppendCurrency, ' ', mystring].join('');
    }
    return mystring;
}

export const NumberStringToNumber = (value: string) => {
    const strippedNumber = value.replace(/[^0-9]/g, '')
    return Number(strippedNumber)/100
}

export const handleValueInputChange = (stringNumber: string, previousValue: string | number) => {
    if (stringNumber === "-") {
        return ''
    }
    if (stringNumber === "") {
        return ''
    }
    if (!isNumeric(stringNumber) || stringNumber === ' ' || stringNumber.includes(' ')) {
        return typeof previousValue === 'string' ? previousValue : FormatNumberMask(previousValue)
    }
   
    let mystring = NumberWithoutCommasAndDots(stringNumber);
    const stringLength = mystring.length;
    if(stringLength > 3) {
        mystring = parseFloat(mystring).toString()
    }
    const last2digits = mystring.length >= 3 ? [',', mystring.slice(-2)].join('') : mystring.length === 2 ? ['0,', mystring].join('') : ['0,0', mystring].join('');
    
    mystring = mystring.slice(0, -2);
    const dotsQuantity = Math.floor((mystring.length - 1) / 3);
    for (let i = 1; i < dotsQuantity + 1; i++) {
        const insertPosition = NumberWithoutCommasAndDots(mystring).length - (3 * i);
        mystring = [mystring.slice(0, insertPosition), '.', mystring.slice(insertPosition)].join('');
    }

    mystring = [mystring, last2digits].join('');
    
    return mystring;
}

export const padWithLeadingZeros = (num: number | string, totalLength: number) => {
    return String(num).padStart(totalLength, '0');
}

export const isNumeric = (num: number | string) => {
    const NumberWithoutCommasAndDots = String(num).replace(/[^0-9]/g, '')
    const number = Number(NumberWithoutCommasAndDots)
    return !isNaN(number)
}

