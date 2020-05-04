import CollectionRequest from "./collection";
import DatabaseError from "./error";

/**
 * The main class to interact with Cadmean Database.
 *
 * @class Database
 * @classdesc Class to make requests to Cadmean Database.
 */
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
     * Creates a new collection request
     * @param {string} collectionName The name of collection
     * @return {CollectionRequest}
     */
    collection = (collectionName) => {
        return new CollectionRequest(this.apiUrl, this, collectionName);
    }


    sendRequest = async (q) => {
        let req = {}
        if (this.tokensProvider.accessToken) {
            req["access_token"] = this.tokensProvider.accessToken;
        }
        if (!q.validate()) {
            throw new DatabaseError(3, "Query is invalid");
        }
        req["query"] = q.prepare();
        let res = await fetch(`${this.apiUrl}/api/v1`, {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
        });
        if (!res.ok) {
            throw new DatabaseError(4, "Connection error");
        }
        return await res.json();
    }
}

export default Database;