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

function isOnSale (priceObject) {
    if (!priceObject) {
        return false;
    }

    const price = priceObject.children[0].data;

    console.log(`MD-11 price: ${price}`);

    return price !== "$83.95";
}

async function checkIfAddonIsOnSale (url) {
    return await isOnSale(findPriceObject(await getHtml(url)));
}

async function main () {
    if (await checkIfAddonIsOnSale(MD_11_URL)) {
        console.log("** MD-11 is on sale **");
    } else {
        console.log("XX MD-11 is NOT on sale XX");
    }
}


main();
