//import { dataVal } from './sheetLoader.js';
import { getSheet } from './sheetLoader.js';
const obs = new OBSWebSocket();

//Connect to WS
try {
    const {
      obsWebSocketVersion,
      negotiatedRpcVersion
    } = await obs.connect('ws://127.0.0.1:4455', 'obswsserver', {
      rpcVersion: 1
    });
    console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
} catch (error) {
  console.error('Failed to connect', error.code, error.message);
}

//Grab data from WS
export const textinputList = await obs.call("GetInputList", {
  inputKind: 'text_gdiplus_v2'
})

export const imginputList = await obs.call("GetInputList", {
  inputKind: "image_source"
})

//Update WS LOL
export async function recievetextUpdate (inputArr) {
  console.log("Recieved Text Update")
  
  let dataVal = await getSheet();
  console.log("Recieved Text Spreadsheet Data");

  for (let i = 0; i < inputArr[0].length; i++) { 
      let breakCellData = inputArr[1][i].charAt(0);
      let cellCol = breakCellData.toUpperCase().charCodeAt(0) - 65;
    await obs.call("SetInputSettings", {
      inputName: inputArr[0][i],
      inputSettings: {
          text: dataVal[cellCol][inputArr[1][i].charAt(1) - 1]
      }
    })
  }
  console.log("Sent Text Update");
}

export async function recieveimgUpdate (inputArr) {
  console.log("Recieved Image Update")
  
  //May need to optimize so sheet is called only once per update if performance gets bad
  let dataVal = await getSheet();
  console.log("Recieved Image Spreadsheet Data");

  for (let i = 0; i < inputArr[0].length; i++) { 
      let breakCellData = inputArr[1][i].charAt(0);
      let cellCol = breakCellData.toUpperCase().charCodeAt(0) - 65;
      await obs.call("SetInputSettings", {
        inputName: inputArr[0][i],
        inputSettings: {
            file: dataVal[cellCol][inputArr[1][i].charAt(1) - 1]
        }
      })
  }
  console.log("Sent Image Update");
}

