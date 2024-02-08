// let div1=document.createElement("div");
// let div2=document.createElement("div");
// a.appendChild(div1);
// a.appendChild(div2);
// div1.classList.add("tile");
// div2.classList.add("tile");
// div1.style.setProperty("--y",0);
let gridfr = document.querySelector(".container");
let boardfr = [[0, 2, 2, 2],
[0, 2, 2, 0],
[2, 0, 0, 4],
[2, 2, 2, 2]];


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
            if (a[i]!=0) {
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
        console.log(a);
        let extra=[];
        for (let i = 0; i < a.length; i++) {
            if (a[i]!=0) {
                extra.push(a[i]);
            }
        }
        let b=extra.length;
        while (b!=4) {
            extra.push(0);
            b++;            
        }

        board[r] = extra; // Update the board with the modified row
    }
    return board;
}

function onright(boa){
    let board =boa.map(row => row.slice());
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
            if (a[i]!=0) {
                i++;
            }
            j++;
        }
        let n = a.length-2;
        while (n >=0) {
            if (a[n + 1] === a[n]) {
                a[n] = a[n] * 2;
                a[n+1] = 0;
            }
            n--;
        }
        console.log(a);
        let extra=[];
        for (let i = 0; i < a.length; i++) {
            if (a[i]!=0) {
                extra.push(a[i]);
            }
        }
        let b=extra.length;
        while (b!=4) {
            extra.push(0);
            b++;            
        }

        board[r] = extra; // Update the board with the modified row
    }
    for (let i = 0; i < board.length; i++) {
        let dummy=[];
        let dummy2=[];
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j]==0) {
                dummy.push(0);
            }
            else{
                dummy2.push(board[i][j])
            }
        }
        board[i]=dummy.concat(dummy2);
    }
    return board;
}

function transpose(boa){
    let board = boa.map(row => row.slice());;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j<i; j++) {
            const temp=board[i][j];
            board[i][j]=board[j][i];
            board[j][i]=temp;
        }
    }
    return board;
}
function ontop(boa){
    let board=transpose(boa);
    board=onleft(board);
    board=transpose(board);
    return board;
}
function onbottom(boa){
    let board=transpose(boa);
    board=onright(board);
    board=transpose(board);
    return board;
}

let div1=document.createElement("div");
let div2=document.createElement("div");
gridfr.appendChild(div1);
gridfr.appendChild(div2);
div1.classList.add("tile");
div2.classList.add("tile");
// div1.style.setProperty("--y",0);
div1.style.setProperty("--x",0);
div1.style.setProperty("--y",0);
div2.style.setProperty("--x",1);
div2.style.setProperty("--y",0); 
let arrray=[]
arrray.push(div1);
arrray.push(div2);

function checkingmultipleanimation(){
    for (let i = 0; i < arrray.length; i++) {
        let element = arrray[i];
        element.style.setProperty("--y",3)

    }
}

function generaterandomstarts(arr) {
    let row1 = Math.floor(Math.random() * 4);
    let col1 = Math.floor(Math.random() * 4);
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    while (row1 == row && col1== col ) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }


    arr[row1][col1] = 2;
    arr[row][col] = 2;
}