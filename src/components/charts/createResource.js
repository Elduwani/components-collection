export function createChartData(maxNumber = 30000, axX = 6) {
    // let yAxes = ['100', '500', '2500', '5000', '10000', '20000', maxNumber]
    let num = maxNumber, yAxes = [], count = 5

    for (let i = count; i >= 0; i--) {
        yAxes.push(Math.floor((num / count) * i))
    }

    const expenditure = generateExpenditure()

    function generateExpenditure() {
        const name = "expenditure"
        const saved = JSON.parse(localStorage.getItem(name))
        if (saved) {
            return saved
        } else {
            const generated = Array(axX).fill("x").map(() => Math.floor(Math.random() * maxNumber))
            localStorage.setItem(name, JSON.stringify(generated))
            return generated
        }
    }

    return { yAxes, expenditure, generateExpenditure }
}


export function formatNumber(number, compact) {
    if (compact) {
        return new Intl.NumberFormat(
            'en-GB',
            { notation: "compact", compactDisplay: "short" }
        ).format(number)
    } else {
        return new Intl.NumberFormat(
            'en-US',
            {
                // style: 'currency',
                // currency,
                minimumFractionDigits: 0
            }).format(number)
    }

}