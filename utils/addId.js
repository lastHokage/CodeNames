const { v4: uuidv4 } = require("uuid");

exports.addId = (array) => array.map((word) => ({ id: uuidv4(), word }));
