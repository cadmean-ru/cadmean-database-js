class DocumentRequest {
    apiUrl;
    q;

    constructor(apiUrl, q, docName) {
        this.apiUrl = apiUrl;
        this.q = q;
        this.q.path += docName;
    }

    find = async () => {

    }

    update = async () => {

    }

    delete = async () => {

    }
}