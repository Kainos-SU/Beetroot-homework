function parseCSV (string) {
    const firstLineBreack = string.indexOf("\n");
    const header = string.slice(0, firstLineBreack - 1).split(",");
    const body = string.slice(firstLineBreack+1).trim();
    let result = {
        header,
        body: []
    };
    const csvRegEx = /(\,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\,\r\n]*))/gm;
    let temporaryArr;
    for (let i of body.matchAll(csvRegEx)) {
        let j = i[0];
        if (i[0].startsWith(",")) {
            j = i[0].slice(1);
        } else {
            temporaryArr = [];
            result.body.push(temporaryArr);
        }
        temporaryArr.push(j);
        
    }

    return result;

}

function getDOMTable (CSVObj) {
    const table = document.createElement("table");
    table.className = "table table-striped table-bordered table-sm text-center";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    table.append(thead, tbody);
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.style.verticalAlign = "middle"
    let th = document.createElement("th");
    th.style.verticalAlign = "middle"
    th.style.cursor = "pointer"
    th.setAttribute("scope", "col");
    for (const i of CSVObj.header) {
        th.textContent = i;
        tr.append(th);
        th = th.cloneNode();
    }
    thead.append(tr);
    th.setAttribute("scope", "row");
    tr = tr.cloneNode();
    th.style.cursor = "auto"
    
    for (let i of CSVObj.body) {
        let first = true
        for (let j of i) {
            if (first) {
                first = false;
                th.textContent = j;
                tr.append(th);
                th = th.cloneNode();
            } else {
                td.textContent = j;
                tr.append(td);
                td = td.cloneNode();
            }
        }
        tbody.append(tr);
        tr = tr.cloneNode();
    }

    return table;
}

function compareDates (date1, date2) {
    const _date1 = new Date(date1);
    const _date2 = new Date(date2);

    if (_date1 > _date2 || date2 === "-") {
        return 1;
    }

    if (_date1 < _date2 || date1 === "-") {
        return -1;
    }

    return 0;
}

function compareNumbers (num1, num2) {
    const _num1 = Number(num1);
    const _num2 = Number(num2);

    if (num2 === "-" || _num1 > _num2) {
        return 1;
    }

    if (num1 === "-" || _num1 < _num2) {
        return -1;
    }

    return 0;
}

function compareTime (string1, string2) {
    const reg = /\d+ [minhrsec]+/gm;
    const string1Value = Array.from(string1.matchAll(reg)).reduce((acc, value)=>{
        if (value[0].endsWith("hr")) {
            acc += (parseInt(value[0]) * 60)*60;
        } else if (value[0].endsWith("min")) {
            acc += parseInt(value[0]) * 60;
        } else if (value[0].endsWith("sec")) {
            acc += parseInt(value[0]);
        }
        return acc
    }, 0);
    const string2Value = Array.from(string2.matchAll(reg)).reduce((acc, value)=>{
        if (value[0].endsWith("hr")) {
            acc += (parseInt(value[0]) * 60)*60;
        } else if (value[0].endsWith("min")) {
            acc += parseInt(value[0]) * 60;
        } else if (value[0].endsWith("sec")) {
            acc += parseInt(value[0]);
        }
        return acc
    }, 0);

    // console.log(string1Value + "\t" + string2Value);

    if (string1Value > string2Value) {
        return 1;
    }
    if (string2Value > string1Value) {
        return -1;
    }

    return 0;
}

function quickSort(arr, compare) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
      
    for (let i = 1; i < arr.length; i++) {
      if (compare(pivot, arr[i]) === 1) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left, compare).concat(pivot, quickSort(right, compare));
  }


async function render() {

    const CSVString = await fetch("./dataanime.csv").then(response=>response.text());
    const CSV =  parseCSV (CSVString);
    const table = getDOMTable(CSV);
    document.querySelector(".container-fluid").append(table);
    table.rows[0].cells[13].addEventListener("click", (e)=>{
        if (!e.target.dataset.sorted) {
            e.target.dataset.sorted = "acs"
        } else {
            if(e.target.dataset.sorted === "acs") {
                e.target.dataset.sorted = "dec";
            } else {
                e.target.dataset.sorted = "acs";
            }
        }
        const sortedArr = quickSort(table.rows, (a, b) => compareTime(a.cells[13].textContent, b.cells[13].textContent));
        console.log(sortedArr)
        for (let i = 1; i < table.rows.length; ++i) {
            table.rows[i].parentNode.replaceChild(sortedArr[i], table.rows[i]);
        }
    });
}

render();