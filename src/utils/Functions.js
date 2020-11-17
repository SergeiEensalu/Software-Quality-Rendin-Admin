import database from "./Database";
import firebase from 'firebase/app'

export function getFormattedDate(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp.seconds * 1000);
        return ('0' + date.getDate()).slice(-2) + '.'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '.'
            + date.getFullYear();
    } else {
        return '';
    }
}

export function getFormattedDateTime(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp.seconds * 1000);
        return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    } else {
        return '';
    }
}

export async function findCollection(collectionName, searchValue, operator, seacrhData) {
    try {
        const db = database.firestore();
        let data = [];

        if (searchValue === "id" && seacrhData !== null ) {
            await db.collection(collectionName)
                .where(firebase.firestore.FieldPath.documentId(), '==', seacrhData)
                .get()
                .then(querySnapshot => {
                    data = querySnapshot.docs.map(doc => {
                        let newOject = doc.data();
                        newOject.id = doc.id;
                        return newOject;
                    });
                });
            return data;
        } else {
            await db
                .collection(collectionName)
                .where(searchValue, operator, seacrhData)
                .get()
                .then(querySnapshot => {
                    data = querySnapshot.docs.map(doc => {
                        let newOject = doc.data();
                        newOject.id = doc.id;
                        return newOject;
                    });
                });
            return data;
        }
    } catch (err) {
        console.log('Opps, an error occurred', err);
    }
}


export async function findFullCollection(collectionName) {
    try {
        const db = database.firestore();
        let data = null;
        await db
            .collection(collectionName)
            .get()
            .then(querySnapshot => {
                data = querySnapshot.docs.map(doc => {
                    let newOject = doc.data();
                    newOject.id = doc.id;
                    return newOject;
                });
            });
        return data;
    } catch (err) {
        console.log('Opps, an error occurred', err);
    }
}

export const isNumber = string => [...string].every(c => '0123456789'.includes(c));

export async function updateDataInCollection(collection, id, data) {
    console.log("new data in updated", data);
    database.firestore().doc(collection + '/' + id).update(data);
}

export async function addIdToCollecton(promise, collectionName, data) {
    await Promise.resolve(promise).then(resolve => {
        data.id = resolve.id;
        updateDataInCollection(collectionName, resolve.id, data);
    })
}

export async function addHistory(collectionName, actorProfileId, description, entityId, type, actorUserId) {
    if (collectionName === "tasks") {
        let task = {
            actorProfileId: actorProfileId,
            created: new Date(Date.now()),
            description: description,
            entityId: entityId,
            type: type,
            actorUserId: actorUserId,
            email: JSON.parse(localStorage.getItem("authUser")).email,
            status: "open",
            currentOwner: JSON.parse(localStorage.getItem("authUser")).email,
            closed: null
        };
        let promise = database.firestore().collection(collectionName).add(task);
        await addIdToCollecton(promise, collectionName, task);

    } else if (collectionName === "auditlog") {
        let log = {
            actorProfileId: actorProfileId,
            created: new Date(Date.now()),
            description: description,
            entityId: entityId,
            type: type,
            actorUserId: actorUserId,
            email: JSON.parse(localStorage.getItem("authUser")).email
        };
        let promise = database.firestore().collection(collectionName).add(log);
        await addIdToCollecton(promise, collectionName, log);
    }
}

export default function checkData(newData, oldData, isEmpty, isNum, isString, isEmail, isBoolean) {
    //If data not changed and not null/undefined
    if (newData === oldData && newData !== "" && newData !== "undefined"
        && newData !== "null" && newData !== null && newData !== undefined) {
        return null;
    }
    if (isEmpty) {
        if (newData === "" || !newData) {
            return "Can't be empty";
        }
    }
    if (isNum) {
        if (!isNumber(newData)) {
            return "Must be a number";
        }
    }

    if (isString) {
        var isContainNumber = /\d/;
        if (isContainNumber.test(newData)) {
            return "Can't contains numbers";
        }
    }

    if (isEmail) {
        const validator = require("email-validator");
        if (!validator.validate(newData)) {
            return "Must be email"
        }
    }

    if (isBoolean) {
        if (newData === "true" || newData === "false" || newData === "TRUE" || newData === "FALSE" || newData === true || newData === false) {
            if (newData === "true" || newData === true || newData === "TRUE") {
                return true;
            } else {
                return false
            }
        } else {
            return "Can be true or false";
        }
    }
    return null;
}




