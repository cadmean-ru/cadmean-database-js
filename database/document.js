import DatabaseError from "./error";
import {objectFromDocument} from "../types/document";

/**
 * Provides functionality to read and write to a document
 *
 * @class DocumentRequest
 * @classdesc Class to read and write to documents
 */
class DocumentRequest {

    constructor(db, q, docName) {
        this.db = db;
        this.q = q;
        this.q.path += docName;
    }

    /**
     * Reads the data from a document.
     * Throws an error if the document was not found.
     * @return {Promise<*>}
     */
    async find() {
        this.q.query_type = "find";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
        return objectFromDocument(res.data);
    }

    /**
     * Updates a document.
     * @param data The data to be written.
     * @return {Promise<void>}
     */
    async update(data) {
        this.q.data = data;
        this.q.query_type = "update";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
    }

    /**
     * Deletes a document.
     * @return {Promise<void>}
     */
    async delete() {
        this.q.query_type = "delete";
        let res = await this.db.sendRequest(this.q);
        if (!res.ok) {
            throw new DatabaseError(res["error_code"], res["error_desc"]);
        }
    }
}

export default DocumentRequest