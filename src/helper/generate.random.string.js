import * as crypto from "node:crypto";
function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateRandomFileName(length) {
    return generateRandomString(length);
}

export {generateRandomFileName}