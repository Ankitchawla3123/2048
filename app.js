// let div1=document.createElement("div");
// let div2=document.createElement("div");
// a.appendChild(div1);
// a.appendChild(div2);
// div1.classList.add("tile");
// div2.classList.add("tile");
// div1.style.setProperty("--y",0);
let grid = document.querySelector(".container");
let board = [[0, 2, 2, 2],
[0, 2, 2, 0],
[2, 0, 0, 4],
[2, 2, 2, 2]];


function onleft() {
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
    // console.log(board);
}

function onright(){
    onleft();
    for (let i = 0; i < board.length; i++) {
        board[i]=board[i].reverse();
    }
    // console.log(board);
}

function transpose(){
    let arr=[];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j<i; j++) {
            const temp=board[i][j];
            board[i][j]=board[j][i];
            board[j][i]=temp;
        }
    }
}
function ontop(){
    transpose();
    onleft();
    transpose();
    console.log(board)
}
function onbottom(){
    transpose();
    onright();
    transpose();
    console.log(board);
}

// let finalrow = clearzeros.filter((x) => x !== 0);