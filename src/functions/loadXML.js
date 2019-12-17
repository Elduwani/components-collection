import xmlFile from "../data/API_CAN_DS2_en_xml_v2_569720"

const parser = new DOMParser();
const xmlData = parser.parseFromString(xmlFile, "text/xml");

export default function getData() {
    const elem = xmlData.getElementsByTagName("record")
    const options = []
    const years = new Set()
    const names = new Set()
    const allData = {}
    let lastEntry, size = 0

    for (let i = 0; i < elem.length; i++) {
        const key = elem[i].children[1].attributes[1].nodeValue;
        const name = elem[i].children[1].textContent;
        const value = elem[i].children[3].textContent;
        const year = elem[i].children[2].textContent;

        if (value) {
            const data = { year, value, index: i }
            if (!allData[key]) allData[key] = []
            allData[key].push(data)

            names.add(name)
            years.add(year)

            if (lastEntry !== key) {
                options.push({ value: key, label: name })
                lastEntry = key
                size += 1
            }
        }
    }

    //Sets must be spread into an Array for use
    return { data: allData, years: [...years], names: [...names], options, size }
}