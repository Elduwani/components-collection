export function useCreateChartData(maxAmount = 30000, randomize = false) {
    let yAxes = [], count = 5, weeks = 20
    const expenditure = generateExpenditure()

    for (let i = count; i > 0; i--) {
        yAxes.push(Math.floor((maxAmount / count) * i))
    }

    function generateExpenditure() {
        const name = "expenditure"
        const savedCopy = JSON.parse(localStorage.getItem(name))
        const generated = Array(weeks).fill("x").map(() => Math.max(50, Math.random() * maxAmount * 0.9))

        const save = () => localStorage.setItem(name, JSON.stringify(generated))

        if (savedCopy && savedCopy.length === weeks) {
            if (randomize) {
                save()
                return generated
            } else {
                return savedCopy
            }
        } else {
            save()
            return generated
        }
    }

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