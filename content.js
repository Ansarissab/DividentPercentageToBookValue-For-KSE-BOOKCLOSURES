let table = document.querySelector("table#payo");
let tableRows = table.querySelectorAll("tr.bcrow.data-tr");
let rows = Array.from(table.querySelectorAll("tr.bcrow.data-tr"));
let tableHeaderRow = table.querySelector("tr.titlerow");

let dividendPc = document.querySelectorAll(
  "table#payo tr.bcrow.data-tr td:last-child"
);
let lastClosePrice = document.querySelectorAll(
  "table#payo tr.bcrow.data-tr td:nth-child(4)"
);

let divArr = [];
let lcArr = [];

dividendPc.forEach((element) => {
  divArr.push(
    Number(element.textContent.trim().split("=")[1].split("%")[0]) / 10
  );
});

lastClosePrice.forEach((element) => {
  lcArr.push(Number(element.textContent.trim()));
});

let dividendToPriceRatio = [];

if (divArr.length === lcArr.length) {
  for (let i = 0; i < divArr.length; i++) {
    dividendToPriceRatio.push(divArr[i] / lcArr[i]);
  }
} else {
  console.log("Arrays have different lengths");
}

let newHeadingTD = document.createElement("td");
newHeadingTD.textContent = "Dividend to Price Ratio";
tableHeaderRow.appendChild(newHeadingTD);

for (let i = 0; i < tableRows.length; i++) {
  let newTD = document.createElement("td");
  newTD.textContent = dividendToPriceRatio[i];
  tableRows[i].appendChild(newTD);
}

let ascending = true;
function sortRows(columnIndex) {
  rows.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex].textContent.trim();
    let cellB = rowB.cells[columnIndex].textContent.trim();

    let valueA = parseFloat(cellA);
    let valueB = parseFloat(cellB);
    if (ascending) {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  rows.forEach((row) => {
    table.appendChild(row);
  });
}

let headerRow = table.querySelector("tr.titlerow");
headerRow.addEventListener("click", (event) => {
  if (event.target.tagName === "TD") {
    let columnIndex = Array.from(headerRow.cells).indexOf(event.target);
    ascending = !ascending;
    sortRows(columnIndex);
  }
});
