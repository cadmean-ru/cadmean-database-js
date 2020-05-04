function DatabaseError(code, text) {
    Error.call(this);
    this.name = "DatabaseError";
    this.code = code;
    this.message = text;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DatabaseError);
    } else {
        this.stack = (new Error()).stack;
    }
}

DatabaseError.prototype = Object.create(Error.prototype);

export default DatabaseError
