import {resolveValueFromJs, resolveValueFromJson, resolveValueTypeFromJs} from "./types";
import DatabaseError from "../database/error";

/**
 * Translates JS object to a database document i.e. an array of fields.
 * @param {*} obj
 * @return {[]} A database document
 */
function documentFromObject(obj) {
    let doc = [];
    let i = 0;
    let keys = Object.keys(obj);
    for (let k of keys) {
        let field = obj[k];
        let t = resolveValueTypeFromJs(field);
        let v = resolveValueFromJs(t, field);
        let path = keys[i++];
        doc.push({
           "path": path,
           "type": t,
           "value": v,
        });
    }
    return doc;
}


/**
 * Translates database document to a JS object
 * @param doc
 * @return {*} A JS Object
 */
function objectFromDocument(doc) {
    if (!Array.isArray(doc)) {
        throw new DatabaseError(2, "Translation error")
    }

    let obj = {};
    for (let f of doc) {
        let p = f["path"];
        obj[p] = resolveValueFromJson(f);
    }

    return obj;
}


export { documentFromObject, objectFromDocument }