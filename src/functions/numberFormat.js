export default function numberFormat(labelValue) {

    //If value is floating point number
    if (String(labelValue).indexOf('.') > -1) return labelValue.toFixed(1)

    // Nine Zeroes for Billions 
    if (Math.abs(Number(labelValue)) >= 1.0e+9) {
        return `${(Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1)}B`;
    }
    // Six Zeroes for Millions 
    if (Math.abs(Number(labelValue)) >= 1.0e+6) {
        return `${(Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1)}M`;
    }
    // Three Zeroes for Thousands 
    if (Math.abs(Number(labelValue)) >= 1.0e+3) {
        return `${(Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1)}K`;
    }
    return Math.abs(Number(labelValue));
}

const usd = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})