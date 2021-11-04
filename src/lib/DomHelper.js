export let selector = (e) => document.querySelector(e);
export let selectAll = (e) => document.querySelectorAll(e);
export let createElement = (e) => document.createElement(e);

export const validateEmail = (val) => {
    const emailPattern =
        /^[a-zA-Z]+((\d+|_+|\.)?([a-zA-Z]+|\d+)*)+@[a-zA-Z]{3,}\.[a-zA-Z]{2,6}$/;
    try {
        if (String(val.trim()).match(emailPattern)) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};
export const validateName = (val) => {
    const namePattern = /^[a-zA-Z]+(\-+)?([a-zA-Z]+)$/;
    try {
        if (String(val.trim()).match(namePattern)) {
            return {
                name: "Matched",
                value: val.trim(),
            };
        } else {
            throw {
                name: "Please provide a valid name",
                value: null,
            };
        }
    } catch (err) {
        return {
            name: err.name,
            value: err.value,
        };
    }
};
export const validateAccountNumber = (val) => {
    const pattern = /^[0-9]{10}$/;
    try {
        if (String(val).match(pattern)) {
            return {
                name: "Matched",
                value: val.trim(),
            };
        } else {
            throw {
                name: "Please provide a valid account number",
                value: null,
            };
        }
    } catch (err) {
        return {
            name: err.name,
            value: err.value,
        };
    }
};
export const validStructure = (val) => {
    const namePattern = /^([A-Za-z]+\s*)+$/;
    try {
        if (String(val).match(namePattern)) {
            return {
                name: "Matched",
                value: val.trim(),
            };
        } else {
            throw {
                name: "Please provide a valid company name",
                value: null,
            };
        }
    } catch (err) {
        return {
            name: err.name,
            value: err.value,
        };
    }
};
export const validateUserName = (val) => {
    const namePattern = /^[a-zA-Z]+[a-zA-Z0-9]+/;
    try {
        if (String(val).match(namePattern)) {
            return {
                name: "Matched",
                value: val.trim(),
            };
        } else {
            throw {
                name: "Please provide a valid Reg Num",
                value: null,
            };
        }
    } catch (err) {
        return {
            name: err.name,
            value: err.value,
        };
    }
};

export const validateFullName = (val) => {
    const pattern = /^([a-zA-Z]+(\s+)?)+$/;
    try {
        if (String(val).match(pattern)) {
            return {
                name: "Matched",
                value: val.trim(),
            };
        } else {
            throw {
                name: "Please provide a valid Reg Num",
                value: null,
            };
        }
    } catch (err) {
        return {
            name: err.name,
            value: err.value,
        };
    }
};
export const validateMobile = (val) => {
    const firstPattern = /^(\+234|0)[8]{1}[0|1]{1}[0-9]{8}$/;
    const secondPattern = /^(\+234|0)[7 | 9]{1}[0]{1}[0-9]{8}$/;
    const thirdPattern = /^(\+234|0)[8]{1}[0|1]{1}[0-9]{8}$/;
    const fourthPattern = /^(\+234|0)[7 | 9]{1}[0]{1}[0-9]{8}$/;
    try {
        val = val.trim();
        if (
            String(val).match(firstPattern) ||
            String(val).match(secondPattern) ||
            String(val).match(thirdPattern) ||
            String(val).match(fourthPattern)
        ) {
            return true;
        } else {
            throw {
                name: "Please provide a valid name",
                value: null,
            };
        }
    } catch (err) {
        return false;
    }
};
