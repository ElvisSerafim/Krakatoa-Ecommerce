"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArray = exports.checkNumber = exports.checkString = void 0;
function checkString(Novo, Antigo) {
    if (typeof Novo === 'string' && Novo !== Antigo)
        return true;
    return false;
}
exports.checkString = checkString;
function checkNumber(Novo, Antigo) {
    if (typeof Novo === 'number' && Novo > 0 && Novo !== Antigo)
        return true;
    return false;
}
exports.checkNumber = checkNumber;
function checkArray(Novo, Antigo) {
    if (typeof Novo !== 'undefined' && Novo.length > 0 && Novo !== Antigo)
        return true;
    return false;
}
exports.checkArray = checkArray;
//# sourceMappingURL=checker.js.map