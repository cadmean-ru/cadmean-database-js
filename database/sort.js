/**
 * Class to represent sorting order
 *
 * @class SortBy
 */
class SortBy {
    // /**
    //  * @name SortBy#path
    //  * @type string
    //  */
    // path;
    //
    // /**
    //  * @name SortBy#order
    //  * @type string
    //  */
    // order;

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