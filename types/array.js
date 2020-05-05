import {resolveValueFromJs, resolveValueFromJson, resolveValueTypeFromJs} from "./types";

/**
 * Translates JS array to database array
 * @param {[]} arr The JS array
 * @return {[]} The DB array
 */
function arrayFromJSArray(arr) {
    let dbArr = [];
    for (let el of arr) {
        if (!el)
            continue;
        let t = resolveValueTypeFromJs(el);
        let v = resolveValueFromJs(t, el);
        dbArr.push({
            "type": t,
            "value": v,
        });
    }
    return dbArr;
}

/**
 * Translates database array to js array
 * @param {[]} dbArr The DB array
 * @return {[]} The JS array
 */
function jsArrayFromArray(dbArr) {
    let arr = [];
    for (let el of dbArr) {
        arr.push(resolveValueFromJson(el));
    }
    return arr;
}

export { arrayFromJSArray, jsArrayFromArray };
