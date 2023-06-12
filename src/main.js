const { invoke } = window.__TAURI__.tauri;

import { textinputList } from "./wsUpdate.js";
import { imginputList } from "./wsUpdate.js";
import { recievetextUpdate } from "./wsUpdate.js";
import { recieveimgUpdate } from "./wsUpdate.js";

let textNameArr = textinputList.inputs.map(a => a.inputName);
let imgNameArr = imginputList.inputs.map(a => a.inputName);

let textlistNum = 0;
let imglistNum = 0;

$.each(textNameArr, function(val, text) {
    $(`#sourceList`).append( $('<option></option>').val(val).html(text) )
});

$.each(imgNameArr, function(val, text) {
    $(`#imgsourceList`).append( $('<option></option>').val(val).html(text) )
});

$("#addtextRow").click(function (e) { 
    e.preventDefault();
    addtextRow(textlistNum);
    textlistNum++;
});

$("#deletetextRow").click(function (e) { 
    e.preventDefault();
    deletetextRow(textlistNum);
    textlistNum--;
});

$("#addimgRow").click(function (e) { 
    e.preventDefault();
    addimgRow(imglistNum);
    imglistNum++;
});

$("#deleteimgRow").click(function (e) { 
    e.preventDefault();
    deleteimgRow(imglistNum);
    imglistNum--;
});

function addtextRow (textlistNum) {
    $("#textDiv").append(`<label id="selectLabel${textlistNum}">Select Source:</label> <select class="sourceList" id="sourceList${textlistNum}">
    </select> <label id="cellLabel${textlistNum}">Choose Cell:</label> <input class="sourceCell" id="sourceCell${textlistNum}" type="text"><br id="selectorBreak${textlistNum}">`);

    $.each(textNameArr, function(val, text) {
        $(`#sourceList${textlistNum}`).append( $('<option></option>').val(val).html(text) )
    });
}

function deletetextRow (textlistNum) {
    $(`#selectLabel${textlistNum - 1}`).remove();
    $(`#sourceList${textlistNum - 1}`).remove();
    $(`#cellLabel${textlistNum - 1}`).remove();
    $(`#sourceCell${textlistNum - 1}`).remove();
    $(`#selectorBreak${textlistNum - 1}`).remove();
}

function addimgRow (imglistNum) {
    $("#imgDiv").append(`<label id="imgselectLabel${imglistNum}">Select Source:</label> <select class="imgsourceList" id="imgsourceList${imglistNum}">
    </select> <label id="imgcellLabel${imglistNum}">Choose Cell:</label> <input class="imgsourceCell" id="imgsourceCell${imglistNum}" type="text"><br id="imgselectorBreak${imglistNum}">`);

    $.each(imgNameArr, function(val, text) {
        $(`#imgsourceList${imglistNum}`).append( $('<option></option>').val(val).html(text) )
    });
}

function deleteimgRow (imglistNum) {
    $(`#imgselectLabel${imglistNum - 1}`).remove();
    $(`#imgsourceList${imglistNum - 1}`).remove();
    $(`#imgcellLabel${imglistNum - 1}`).remove();
    $(`#imgsourceCell${imglistNum - 1}`).remove();
    $(`#imgselectorBreak${imglistNum - 1}`).remove();
}

$("#update").click(function (e) { 
    e.preventDefault();
    updateWS();
    console.log(globaltextInputArr);
    console.log(globalimgInputArr);
    recievetextUpdate(globaltextInputArr);
    recieveimgUpdate(globalimgInputArr);
});

export let globaltextInputArr = null;
export let globalimgInputArr = null;

function updateWS () {
    let textinputArr = [
        $('.sourceList option:selected').map((_,el) => el.text).get(),
        $('.sourceCell').map((_,el) => el.value).get()
    ]

    let imginputArr = [
        $('.imgsourceList option:selected').map((_,el) => el.text).get(),
        $('.imgsourceCell').map((_,el) => el.value).get()
    ]

    globaltextInputArr = textinputArr;
    globalimgInputArr = imginputArr;

}