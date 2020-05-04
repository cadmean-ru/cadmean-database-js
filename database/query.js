import {documentFromObject} from "../types/document";

const validQueryTypes = ["find", "count", "create", "update", "delete"];

/**
 * Represents a Cadmean Database query
 *
 * @class Query
 * @classdesc Cadmean Database query
 */
class Query {
    // /**
    //  * The path to the collection document or field
    //  * @name Query#path
    //  * @type string
    //  */
    // path;
    //
    // /**
    //  * Array of filters
    //  * @name Query#filters
    //  * @type {Filter[]}
    //  */
    // filters = [];
    //
    // /**
    //  * @name Query#sort
    //  * @type {SortBy[]}
    //  */
    // sort = [];
    //
    // /**
    //  * The limit of documents in query
    //  * @name Query#limit
    //  * @type number
    //  */
    // limit;
    //
    // /**
    //  * Specifies type of query i.e. 'find', 'count', 'create', 'update' or 'delete'
    //  * @name Query#query_type
    //  * @type string
    //  */
    // query_type;
    //
    // /**
    //  * The data sent to database. Required for create and update queries.
    //  * @name Query#data
    //  * @type *
    //  */
    // data;

    constructor(path) {
        this.path = path;
    }

    /**
     * Determines if the query is valid or not
     * @returns {boolean} If the query is valid or not
     */
    validate() {
        if (!this.path || this.path.split("/").length < 2) {
            return false
        }

        if (this.filters instanceof Array) {
            for (let f of this.filters) {
                if (!f.validate()) {
                    return false;
                }
            }
        }

        if (!this.query_type) {
            return false;
        }

        if ((this.query_type === 'create' || this.query_type === 'update') && !this.data) {
            return false;
        }

        return validQueryTypes.includes(this.query_type);
    }

    /**
     * Prepares the query for sending
     */
    prepare() {
        if (this.data) {
            this.data = documentFromObject(this.data);
        }
        return this;
    }
}

export default Query;
export { validQueryTypes }