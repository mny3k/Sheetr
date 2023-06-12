import config from "./config.json" assert { type: 'json' };

const spreadsheetLink = (id, tabname, range, apikey, dimension) => `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${tabname}!${range}?key=${apikey}&majorDimension=${dimension}`

/* let data = await fetch(spreadsheetLink(config.spreadsheetID, config.tabname, config.range, config.apiKey, config.dimension));
let readData = await data.json();
export let dataVal = readData.values;
console.log(dataVal); */

export async function getSheet() {
    let data = await fetch(spreadsheetLink(config.spreadsheetID, config.tabname, config.range, config.apiKey, config.dimension));
    let readData = await data.json();
    let dataVal = readData.values;
    return dataVal;
}