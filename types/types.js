import DatabaseError from "../database/error";
import {documentFromObject, objectFromDocument} from "./document";
import {arrayFromJSArray, jsArrayFromArray} from "./array";

/**
 * Translates JSON received from API
 * @param field The data received from API
 * @return {null|Date|*} Resolved value to be put in JS object
 */
function resolveValueFromJson(field) {
    if (!field || !field.type || !field.value)
        return null;

    switch (field.type) {
        case "ObjectID":
            if (typeof field.value === "string") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Int32":
            if (typeof field.value === "number") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Int64":
            if (typeof field.value === "number") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Double":
            if (typeof field.value === "number") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "String":
            if (typeof field.value === "string") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Boolean":
            if (typeof field.value === "boolean") {
                return field.value;
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "DateTime":
            if (typeof field.value === "number") {
                return new Date(field.value * 1000);
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Object":
            return objectFromDocument(field.value);
        case "Array":
            return jsArrayFromArray(field.value);
        default:
            throw new DatabaseError(1, "Invalid type");
    }
}

/**
 * Resolves the type of JS object
 * @param value The JS value
 * @return {string} The type of value to be send to API
 */
function resolveValueTypeFromJs(value) {
    if (value instanceof Date) {
        return "DateTime";
    }
    switch (typeof value) {
        case "number":
            if (Number.isNaN(value)) {
                throw new DatabaseError(1, "Invalid type");
            } else if (Number.isInteger(value)) {
                return "Int64";
            } else {
                return "Double";
            }
        case "string":
            return "String";
        case "boolean":
            return "Boolean";
        case "object":
            if (Array.isArray(value)) {
                return "Array";
            } else {
                return "Object";
            }
    }
}

/**
 * Translates JS value to JSON value
 * @param {string} valueType
 * @param value
 * @return The JSON value to be sent to API
 */
function resolveValueFromJs(valueType, value) {
    switch (valueType) {
        case "DateTime":
            if (value instanceof Date) {
                return value.getTime();
            } else {
                throw new DatabaseError(1, "Invalid type");
            }
        case "Object":
            return documentFromObject(value);
        case "Array":
            return arrayFromJSArray(value);
        default:
            return value;
    }
}

export { resolveValueFromJson, resolveValueFromJs, resolveValueTypeFromJs }