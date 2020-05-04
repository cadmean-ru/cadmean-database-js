class Database {
    apiUrl;
    dbName;
    tokensProvider;

    /**
     *
     * @param {string} apiUrl The URL of the database API server
     * @param {string} dbName The name of your database
     */
    constructor(apiUrl, dbName) {
        this.apiUrl = apiUrl;
        this.dbName = dbName;

        this.tokensProvider = new TokensProvider();
        this.tokensProvider.loadTokens();
    }

    /**
     *
     * @param {string} collectionName The name of collection
     * @return {CollectionRequest}
     */
    collection = (collectionName) => {
        return new CollectionRequest(this.apiUrl, this, collectionName);
    }
}