const axios = require("axios"),
    htmlparser2 = require("htmlparser2"),
    cssSelect = require("css-select"),
    fs = require("fs"),
    urlsFilePath = "/Users/dillonjeffers/scripts/check-md-11/urls.txt";


function log (message) {
    console.log(`${Date.now()} ${message}`);
}

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
        const urls = fs.readFileSync(urlsFilePath, "utf8").split("\n");

        urls.pop();
        urls.forEach((singleUrl) => {
            return checkIfAddonIsOnSale(singleUrl).then((message) => {
                return log(message);
            }).catch((getUrlError) => {
                return log(`checkIfAddonIsOnSale() failed - url: ${singleUrl} - error: ${getUrlError}`);
            });
        });
    } catch (error) {
        log(error);
    }
}


main();
