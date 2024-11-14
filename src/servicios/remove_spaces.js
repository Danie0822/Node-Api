// utils.js
const removeExtraSpaces = (value) => {
    return value.replace(/\s+/g, ' ').trim();
};

module.exports = removeExtraSpaces;
