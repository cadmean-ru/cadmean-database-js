/**
 * Class to represent sorting order
 *
 * @class SortBy
 */
class SortBy {

    /**
     *
     * @param {string} path The path of document to sort by
     * @param {("asc"|"desc")} order The order of sorting
     */
    constructor(path, order) {
        this.path = path;
        this.order = order;
    }
}

export default SortBy