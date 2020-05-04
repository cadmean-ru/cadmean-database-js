class CollectionRequest {
    apiUrl;
    db;
    q;

    constructor(apiUrl, db, collectionName) {
        this.apiUrl = apiUrl;
        this.db = db;
        this.q = new Query(`${db.dbName}/${collectionName}/`);
    }

    findDocs = async () => {

    }

    updateDocs = async () => {

    }

    countDocs = async () => {

    }

    deleteDocs = async () => {

    }

    createDoc = async () => {

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
        return new DocumentRequest(this.apiUrl, this.q, docName);
    }
}