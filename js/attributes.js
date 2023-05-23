class attributes {
    constructor(attributes) {
        if (attributes) {
            this.attributes = attributes
        } else {
            this.attributes = []
        }
    }

    concat(attributesObject) {
        for (let i = 0; i < attributesObject.length; i++) {
            if (this.attributes.find(function (property) { // This part of the code must be optimized
                return attributesObject[i].name == property.name
            })) {
                let index = this.attributes.findIndex(function (property) {
                    return attributesObject[i].name == property.name
                })
                this.attributes[index].values = this.attributes[index].values.concat(attributesObject[i].values) // This method does not consider when there is the same value in both arrays.
            } else {
                this.attributes.push({ "name": attributesObject[i].name, "values": attributesObject[i].values })
            }
        }
    }

    renderHTML() {
        let finalResult = " "
        for (let i = 0; i < this.attributes.length; i++) {
            finalResult += this.attributes[i].name + "=\""
            let attributesValuesResult = ""
            for (let j = 0; j < this.attributes[i].values.length; j++) {
                if (attributesValuesResult != "") {
                    attributesValuesResult += " "
                }
                attributesValuesResult += this.attributes[i].values[j]
            }
            finalResult += attributesValuesResult + "\""
        }
        return finalResult
    }
}
