const axios = require("axios"),
    htmlparser2 = require("htmlparser2"),
    cssSelect = require("css-select"),
    MD_11_URL = "https://store.x-plane.org/Rotate-MD-11_p_1580.html";


function getHtml (url) {
    return axios.get(url).then((result) => {
        return result.data;
    });
}

function findPriceObject (html) {
    const dom = htmlparser2.parseDocument(html),
        priceObject = cssSelect.selectOne("#price", dom);

    return priceObject;
}

function getPrice (priceObject) {
    return priceObject.children.map((child) => {
        return child.data;
    });
}

async function checkIfAddonIsOnSale (url) {
    return getPrice(findPriceObject(await getHtml(url)));
}

async function main () {
    return console.log(`${Date.now()} ${await checkIfAddonIsOnSale(MD_11_URL)}`);
}


main();
