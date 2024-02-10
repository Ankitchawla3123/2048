// let div1=document.createElement("div");
// let div2=document.createElement("div");
// a.appendChild(div1);
// a.appendChild(div2);
// div1.classList.add("tile");
// div2.classList.add("tile");
// div1.style.setProperty("--y",0);
let gridfr = document.querySelector(".container");
let boardfr = [[4, 2, 8, 0],
[4, 16, 0, 0],
[0,0 , 0, 0],
[0, 0, 0, 0]];



//testing 
for (let i = 0; i < boardfr.length; i++) {
    for (let j = 0; j < boardfr[i].length; j++) {
        if (boardfr[i][j] != 0) {
            let div = document.createElement("div");
            gridfr.appendChild(div);
            div.classList.add('tile')
            div.classList.add(`${i}${j}`)
            div.style.setProperty("--x", i);
            div.style.setProperty("--y", j);
            div.innerHTML = boardfr[i][j];
        }

    }

}

let event = document.addEventListener('keydown', events)

function tilemovement(changes){
    tiles = document.querySelectorAll('.tile');
    for (let i = 0; i < changes.length; i++) {
        let ind = changes[i].slice(0, 2);
        let nextindex = changes[i].slice(2, 4);
        tiles.forEach(tile => {
            if (tile.classList.contains(ind)) {
                let content = tile.innerHTML;
                tile.classList.remove(ind);
                tile.classList.add(nextindex);
                tile.style.setProperty("--x", parseInt(nextindex[0]));
                tile.style.setProperty("--y", parseInt(nextindex[1]));
                if (changes[i].slice(-1) == 1) {
                    content = parseInt(content) * 2;
                    tile.innerHTML=content;
                }
                else {
                    content = parseInt(content);
                    tile.innerHTML=content;
                }
            }

        });

    }
}

function events(e) {
    if (e.key == "ArrowLeft") {
        let changes = onleftchange();
        tilemovement(changes);
        boardfr=onleft(boardfr);
    }
    else if (e.key == "ArrowRight") {
        let changes = onrightchange();
        tilemovement(changes);
        boardfr=onright(boardfr);
    }
    else if (e.key == "ArrowUp") {
        let changes = ontopchange();
        tilemovement(changes);
        boardfr=ontop(boardfr);
    }
    else if (e.key == "ArrowDown") {
        let changes = onbottomchange();
        tilemovement(changes);
        boardfr=onbottom(boardfr);
    }
}

function startboard(boa) {
    // let board = boa.map(row => row.slice());
    let array2 = [];
    let zeros = zerosindexs(boardfr);
    console.log(zeros)
    let index1 = Math.floor(Math.random() * zeros.length);
    array2.push(zeros[index1]);
    zeros.splice(index1, 1);
    let index2 = Math.floor(Math.random() * zeros.length);
    array2.push(zeros[index2]);
    zeros.splice(index2, 1);
    console.log(array2);
    for (let i = 0; i < array2.length; i++) {
        let div = document.createElement("div");
        gridfr.appendChild(div);
        div.classList.add('tile')
        div.classList.add(`${array2[i][0]}${array2[i][1]}`)
        div.style.setProperty("--x", array2[i][0]);
        div.style.setProperty("--y", array2[i][1]);
        div.innerHTML = 2;
        boardfr[array2[i][0]][array2[i][1]] = 2;
        // div.innerHTML=4;
    }
}

function onleftchange() {
    let compare = onleft(boardfr);
    let arr3 = [];
    for (let m = 0; m < boardfr.length; m++) {
        let arr2 = compare[m];
        let arr1 = boardfr[m];
        let i = 0;
        let j = 0;
        while (i <= 3) {
            if (arr1[i] != arr2[j] && arr1[i] == 0) {
                i = i + 1;
            }
            else if (arr1[i] == 0) {
                i = i + 1;
            }
            else if (arr1[i] == arr2[j]) {
                if (i != j) {
                    arr3.push(`${m}${i}${m}${j}0`);
                    i = i + 1;
                    j = j + 1;

                }
                else {
                    i = i + 1;
                    j = j + 1;
                }

            }

            else if (arr1[i] * 2 == arr2[j]) {
                arr3.push(`${m}${i}${m}${j}1`);
                i = i + 1;
                while (arr1[i] * 2 != arr2[j]) {
                    i = i + 1;
                }
                arr3.push(`${m}${i}${m}${j}1`);
                j = j + 1;
                i = i + 1;
            }
        }
    }
    return arr3;
}



function onrightchange() {
    let compare = onright(boardfr);
    let arr3 = [];
    for (let m = 0; m < boardfr.length; m++) {
        let arr2 = compare[m];
        let arr1 = boardfr[m];
        let i = 3;
        let j = 3;
        while (i >= 0) {
            if (arr1[i] != arr2[j] && arr1[i] == 0) {
                i = i - 1;
            }
            else if (arr1[i] == 0) {
                i = i - 1;
            }
            else if (arr1[i] == arr2[j]) {
                if (i != j) {
                    arr3.push(`${m}${i}${m}${j}0`);
                    i = i - 1;
                    j = j - 1;

                }
                else {
                    i = i - 1;
                    j = j - 1;
                }

            }

            else if (arr1[i] * 2 == arr2[j]) {
                arr3.push(`${m}${i}${m}${j}1`);
                i = i - 1;
                while (arr1[i] * 2 != arr2[j]) {
                    i = i - 1;
                }
                arr3.push(`${m}${i}${m}${j}1`);
                j = j - 1;
                i = i - 1;
            }
        }
    }
    return arr3;
}

function ontopchange() {
    let compare = ontop(boardfr);
    compare = transpose(compare);
    let bcopy = transpose(boardfr);
    let arr3 = [];
    for (let m = 0; m < boardfr.length; m++) {
        let arr2 = compare[m];
        let arr1 = bcopy[m];
        let i = 0;
        let j = 0;
        while (i <= 3) {
            if (arr1[i] != arr2[j] && arr1[i] == 0) {
                i = i + 1;
            }
            else if (arr1[i] == 0) {
                i = i + 1;
            }
            else if (arr1[i] == arr2[j]) {
                if (i != j) {
                    arr3.push(`${i}${m}${j}${m}0`);
                    i = i + 1;
                    j = j + 1;

                }
                else {
                    i = i + 1;
                    j = j + 1;
                }

            }

            else if (arr1[i] * 2 == arr2[j]) {
                arr3.push(`${i}${m}${j}${m}1`);
                i = i + 1;
                while (arr1[i] * 2 != arr2[j]) {
                    i = i + 1;
                }
                arr3.push(`${i}${m}${j}${m}1`);
                j = j + 1;
                i = i + 1;
            }
        }
    }
    return arr3;
}

function onbottomchange() {
    let compare = onbottom(boardfr);
    compare = transpose(compare);
    let bcopy = transpose(boardfr);
    let arr3 = [];
    for (let m = 0; m < boardfr.length; m++) {
        let arr2 = compare[m];
        let arr1 = bcopy[m];
        let i = 3;
        let j = 3;
        while (i >= 0) {
            if (arr1[i] != arr2[j] && arr1[i] == 0) {
                i = i - 1;
            }
            else if (arr1[i] == 0) {
                i = i - 1;
            }
            else if (arr1[i] == arr2[j]) {
                if (i != j) {
                    arr3.push(`${i}${m}${j}${m}0`);
                    i = i - 1;
                    j = j - 1;

                }
                else {
                    i = i - 1;
                    j = j - 1;
                }

            }

            else if (arr1[i] * 2 == arr2[j]) {
                arr3.push(`${i}${m}${j}${m}1`);
                i = i - 1;
                while (arr1[i] * 2 != arr2[j]) {
                    i = i - 1;
                }
                arr3.push(`${i}${m}${j}${m}1`);
                j = j - 1;
                i = i - 1;
            }
        }
    }
    return arr3;
}

function onleft(boa) {
    let board = boa.map(row => row.slice());
    for (let r = 0; r < board.length; r++) {
        let a = board[r].slice(); // Copy the array elements to avoid referencing the same array object
        let i = 0;
        let j = 1;
        while (j < a.length) {
            if (a[i] === 0 && a[j] !== 0) {
                a[i] = a[j];
                a[j] = 0;
                i++;
            }
            if (a[i] != 0) {    
                i++;
            }
            j++;
        }
        let n = 1;
        while (n < a.length) {
            if (a[n - 1] === a[n]) {
                a[n - 1] = a[n] * 2;
                a[n] = 0;
            }
            n++;
        }
        let extra = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i] != 0) {
                extra.push(a[i]);
            }
        }
        let b = extra.length;
        while (b != 4) {
            extra.push(0);
            b++;
        }

        board[r] = extra; // Update the board with the modified row
    }
    return board;
}

function onright(boa) {
    let board = boa.map(row => row.slice());
    for (let r = 0; r < board.length; r++) {
        let a = board[r].slice(); // Copy the array elements to avoid referencing the same array object
        let i = 0;
        let j = 1;
        while (j < a.length) {
            if (a[i] === 0 && a[j] !== 0) {
                a[i] = a[j];
                a[j] = 0;
                i++;
            }
            if (a[i] != 0) {
                i++;
            }
            j++;
        }
        let n = a.length - 2;
        while (n >= 0) {
            if (a[n + 1] === a[n]) {
                a[n] = a[n] * 2;
                a[n + 1] = 0;
            }
            n--;
        }
        let extra = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i] != 0) {
                extra.push(a[i]);
            }
        }
        let b = extra.length;
        while (b != 4) {
            extra.push(0);
            b++;
        }

        board[r] = extra; // Update the board with the modified row
    }
    for (let i = 0; i < board.length; i++) {
        let dummy = [];
        let dummy2 = [];
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 0) {
                dummy.push(0);
            }
            else {
                dummy2.push(board[i][j])
            }
        }
        board[i] = dummy.concat(dummy2);
    }
    return board;
}

function transpose(boa) {
    let board = boa.map(row => row.slice());;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < i; j++) {
            const temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
    return board;
}
function ontop(boa) {
    let board = transpose(boa);
    board = onleft(board);
    board = transpose(board);
    return board;
}
function onbottom(boa) {
    let board = transpose(boa);
    board = onright(board);
    board = transpose(board);
    return board;
}



function zerosindexs(boardcopy) {
    let zerosindex = [];
    for (let i = 0; i < boardcopy.length; i++) {
        for (let j = 0; j < boardcopy[i].length; j++) {
            if (boardcopy[i][j] == 0) {
                let newarry = [i, j];
                zerosindex.push(newarry);
            }
        }
    }
    return zerosindex;
}


function generaterandomstarts(arr) {
    let row1 = Math.floor(Math.random() * 4);
    let col1 = Math.floor(Math.random() * 4);
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    while (row1 == row && col1 == col) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }


    arr[row1][col1] = 2;
    arr[row][col] = 2;
}




// let div1=document.createElement("div");
// let div2=document.createElement("div");
// gridfr.appendChild(div1);
// gridfr.appendChild(div2);
// div1.classList.add("tile");
// div2.classList.add("tile");
// // div1.style.setProperty("--y",0);
// div1.style.setProperty("--x",0);
// div1.style.setProperty("--y",0);
// div2.style.setProperty("--x",1);
// div2.style.setProperty("--y",0);
// let arrray=[]
// arrray.push(div1);
// arrray.push(div2);

// function checkingmultipleanimation(){
//     for (let i = 0; i < arrray.length; i++) {
//         let element = arrray[i];
//         element.style.setProperty("--y",3)

//     }
// }