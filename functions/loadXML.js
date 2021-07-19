import xmlFile from "../data/API_CAN_DS2_en_xml_v2_569720"

const parser = new DOMParser();
const xmlData = parser.parseFromString(xmlFile, "text/xml");

export default function getData() {
    const elem = xmlData.getElementsByTagName("record")
    /*
        <data>
            <record>
                <field name="Country or Area" key="CAN">Canada</field>
                <field name="Item" key="ST.INT.XPND.MP.ZS">International tourism, expenditures (% of total imports)</field>
                <field name="Year">1995</field>
                <field name="Value">6.35243156573587</field>
            </record>
        </data>
    */
    const options = []
    const years = new Set()
    const names = new Set()
    const allData = {}
    let lastEntry, size = 0

    for (let i = 0; i < elem.length; i++) {
        const key = elem[i].children[1].attributes[1].nodeValue; // "ST.INT.XPND.MP.ZS"
        const name = elem[i].children[1].textContent; // International tourism, expenditures...
        const value = elem[i].children[3].textContent; // 6.35243156573587
        const year = elem[i].children[2].textContent; // 1995

        //Skip if value is empty
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