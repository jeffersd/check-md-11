const axios = require("axios"),
    htmlparser2 = require("htmlparser2"),
    cssSelect = require("css-select"),
    STORE_URL = "https://store.x-plane.org/732-TwinJet-V3-Pro_p_739.html";


function getHtml (url) {
    return axios.get(url).then((result) => {
        return result.data;
    });
}

function findTitleObject (html) {
    const dom = htmlparser2.parseDocument(html),
        titleObject = cssSelect.selectOne(".page_headers", dom);


    return titleObject;
}

function getTitle (titleObject) {
    let title;

    titleObject.children.forEach((child) => {
        title = child.data;
    });

    return title;
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
    const html = await getHtml(url);

    return `'${getTitle(findTitleObject(html))}' ${getPrice(findPriceObject(html))}`;
}

async function main () {
    let message = "";

    try {
        message = await checkIfAddonIsOnSale(STORE_URL);
    } catch (error) {
        message = `failed to check price: ${error}`
    }
    return console.log(`${Date.now()} ${message}`);
}


main();
