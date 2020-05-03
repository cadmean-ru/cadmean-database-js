class SortBy {
    path;
    order;

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