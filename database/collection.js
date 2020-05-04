import DocumentRequest from "./document";
import DatabaseError from "./error";
import {objectFromDocument} from "../types/document";
import Query from "./query";
import Filter from "./filter";
import SortBy from "./sort";

/**
 * Provides functionality to read and write to a collection.
 *
 * @class CollectionRequest
 * @classdesc Class to make requests to a collection
 */
class CollectionRequest {
    /**
     * @name CollectionRequest#db
     * @type Database
     */
    db;

    /**
     * @name CollectionRequest#q
     * @type Query
     */
    q;

    constructor(db, collectionName) {
        this.db = db;
        this.q = new Query(`${db.dbName}/${collectionName}/`);
    }

    /**
     * Finds documents in the collection.
     * If no filters are specified for the query returns all documents in the collection.
     * Throws an error if no documents were found.
     * @return {Promise<[]>} The documents
     */
    findDocs = async () => {
        this.q.query_type = "find";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
        let docs = [];
        for (let docData of res.data) {
            docs.push(objectFromDocument(docData));
        }
        return docs;
    }

    /**
     * Updates documents in the collection.
     * If no filters are specified for the query updates all documents in the collection.
     * @param {*} data The data to be updated
     * @return {Promise<void>}
     */
    updateDocs = async (data) => {
        this.q.data = data;
        this.q.query_type = "update";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
    }

    /**
     * Counts documents in the collection.
     * If no filters are specified for the query counts all documents in the collection.
     * @return {Promise<number>}
     */
    countDocs = async () => {
        this.q.query_type = "count";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
        return parseInt(res.data);
    }

    /**
     * Deletes documents in the collection.
     * If no filters are specified for the query deletes the entire collection.
     * @return {Promise<void>}
     */
    deleteDocs = async () => {
        this.q.query_type = "delete";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
    }

    /**
     * Creates a new document in the collection.
     * @param data The data to be added.
     * @return {Promise<string>} ID of the newly created document.
     */
    createDoc = async (data) => {
        this.q.query_type = "create";
        this.q.data = data;
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
        return res.data;
    }

    /**
     *
     * @param {string} path
     * @param {("=="|"<"|"<="|">"|">="|"like"|"ilike")} operator
     * @param {Object} value
     */
    filter = (path, operator, value) => {
        this.q.filters.push(new Filter(path, operator, value));
    }

    /**
     *
     * @param {string} path Document field path to sort results by
     * @param {("asc"|"desc")} order
     */
    sort = (path, order) => {
        this.q.sort.push(new SortBy(path, order));
    }

    /**
     *
     * @param {number} number The number of documents to limit results to
     */
    limit = (number) => {
        this.q.limit = number;
    }

    /**
     *
     * @param docName The name of document
     * @return {DocumentRequest}
     */
    document = (docName) => {
        return new DocumentRequest(this.db, this.q, docName);
    }
}

export default CollectionRequest