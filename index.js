const axios = require("axios"),
    parse5 = require("parse5"),
    url = "https://store.x-plane.org/Rotate-MD-11_p_1580.html";

function getHtml (url) {
    return "";
}

function findPriceObject (html) {
    return {};
}

function isOnSale (price) {
    return false;
}

function checkIfAddonIsOnSale (url) {
    return isOnSale(findPriceObject(getHtml(url)));
}


console.log(`addon is on sale?: ${checkIfAddonIsOnSale(url)}`);
