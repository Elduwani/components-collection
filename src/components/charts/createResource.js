export function createChartData(axY = 30000, axX = 6) {
    // let yAxes = ['100', '500', '2500', '5000', '10000', '20000', axY]
    let num = axY, yAxes = [], count = 5

    for (let i = count; i >= 0; i--) {
        yAxes.push(Math.floor((num / count) * i))
    }

    const expenditure = Array(axX).fill("x").map(() => {
        const randomIndex = Math.floor(Math.random() * yAxes.length)

        //Last index of yAxes has value 0, because it goes from highest to lowest amount
        const isZero = randomIndex === count
        const result = Math.floor(Math.random() * yAxes[isZero ? 2 : randomIndex])

        return result
    })

    return { yAxes, expenditure }
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