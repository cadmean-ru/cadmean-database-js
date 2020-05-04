const validQueryTypes = ["find", "count", "create", "update", "delete"];

class Query {
    path;
    filters = [];
    sort = [];
    limit;
    query_type;
    data;
    access_token;

    constructor(path) {
        this.path = path;
    }

    /**
     *
     * @returns {boolean} If the query is valid or not
     */
    validate() {
        if (!path || path.split("/").length < 2) {
            return false
        }

        for (let f of this.filters) {
            if (!f.validate()) {
                return false;
            }
        }

        return validQueryTypes.includes(this.query_type);
    }
}