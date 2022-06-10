const axios = require("axios"),
    htmlparser2 = require("htmlparser2"),
    cssSelect = require("css-select"),
    MD_11_URL = "https://store.x-plane.org/Rotate-MD-11_p_1580.html";


function getHtml (url) {
    return "<html><p>paragraph</p><div><span id=price>$100.00</span></div>some html</html>";
}

function findPriceObject (html) {
    const dom = htmlparser2.parseDocument(html),
        priceObject = cssSelect.selectOne("#price", dom);

    return priceObject;
}

function isOnSale (priceObject) {
    if (!priceObject) {
        return false;
    }

    return true;
}

function checkIfAddonIsOnSale (url) {
    return isOnSale(findPriceObject(getHtml(url)));
}


console.log(`addon is on sale?: ${checkIfAddonIsOnSale(MD_11_URL)}`);
