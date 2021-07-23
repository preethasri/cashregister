const billAmt = document.querySelector("#billamt");
const nxtBtn = document.querySelector("#nxt-btn");

const cashGivenInput = document.querySelector(".cashGiveninput");
const cashGiven = document.querySelector("#cashGiven");
const checkBtn = document.querySelector("#checkbtn");

const errDiv = document.querySelector(".errMessage");

const changeReturn = document.querySelector(".changeReturn");
const output = document.querySelector("#output");

const noOfNotes = document.querySelectorAll(".NoOfnotes");

const arrayNoteAmt = [2000, 500, 100, 50, 20, 10, 1];



//project is splited into four parts//
//1.we have to create a nxt button and to display the cash given and if error oocurs show the error//

nxtBtn.addEventListener('click', () => {
    hideError();
    if (Number(billAmt.value > 0)) {
        nxtBtn.style.display = "none";
        cashGivenInput.style.display = "block";
    } else {
        showError("put valid bill amount to proceed!")
    }

})

//2.to create a checkBtn and to get the billamt and cash given for calculating the return change//

checkBtn.addEventListener('click', () => {
    clearNoofnotes();
    hideError();
    let billAmtvalue = Number(billAmt.value);
    let cashGivenvalue = Number(cashGiven.value);

    if (billAmtvalue > 0 && cashGivenvalue > 0) {
        if (!Number.isInteger(cashGivenvalue)) {
            showError("enter valid amount in cash given field")
            return;
        }
        if (billAmtvalue > cashGivenvalue) {
            showError("bill is greater than cash given value. enter a valid cash given amount");
            return;
        }
        //if input is valid//
        calculateNotes(billAmtvalue, cashGivenvalue)
    } else {
        showError("enter a valid billamt and cash given to continue");
        return;
    }
})

//3.to calculate the no of notes//
function calculateNotes(bill, cash) {
    let returnAmt = cash - bill;
    if (returnAmt < 1) {
        showError("no amount should be returned");
    }
    changeReturn.style.display = "block";
    for (let i = 0; i < arrayNoteAmt.length; i++) {
        returnAmt = compare(returnAmt, arrayNoteAmt[i], i);

    }
}
//4.to compare the noteamount with the return amount and to diplay the no of notes to be given on the screen//

function compare(remainder, noteamt, index) {
    if (remainder >= noteamt) {
        let notes = Math.floor(remainder / noteamt);
        remainder = remainder - notes * noteamt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}

//if check button is clicked without refreshing the page , clear all the notes on the screen//
function clearNoofnotes() {
    for (let notes of noOfNotes) {
        notes.innerText = "";
    }
}




function showError(text) {
    errDiv.innerText = text;
    errDiv.style.display = "block";
    changeReturn.style.display = "none";
}

function hideError() {
    errDiv.style.display = "none";

}