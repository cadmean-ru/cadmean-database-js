
const validOperators = ["<", ">", "<=", ">=", "==", "like", "ilike"];

class Filter {
    path;
    operator;
    value;

    /**
     *
     * @param {string} path The field of document to filter by
     * @param operator The operator of comparison
     * @param value The value to compare with
     */
    constructor(path, operator, value) {
        this.path = path;
        this.operator = operator;
        this.value = value;
    }

    validate() {
        return this.path && this.value && validOperators.includes(this.operator);
    }
}