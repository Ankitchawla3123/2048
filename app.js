// let div1=document.createElement("div");
// let div2=document.createElement("div");
// a.appendChild(div1);
// a.appendChild(div2);
// div1.classList.add("tile");
// div2.classList.add("tile");
// div1.style.setProperty("--y",0);
let gridfr = document.querySelector(".container");
let boardfr = [[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]];

window.onload = function () {
    startboard(boardfr);
};

// testing 
// for (let i = 0; i < boardfr.length; i++) {
//     for (let j = 0; j < boardfr[i].length; j++) {
//         if (boardfr[i][j] != 0) {
//             let div = document.createElement("div");
//             gridfr.appendChild(div);
//             div.classList.add('tile')
//             div.classList.add(`${i}${j}`)
//             div.style.setProperty("--x", i);
//             div.style.setProperty("--y", j);
//             div.innerHTML = boardfr[i][j];
//         }

//     }

// }

// document.

let resetButton = document.querySelector('.Restart');
resetButton.addEventListener('click', (e)=>{
    resetBoard();
    let box = document.querySelector('.box');
    box.classList.remove('active');
    let overlay = document.querySelector('.overlay');
    overlay.classList.remove('overlay1')

});

function resetBoard() {
    for (let i = 0; i < boardfr.length; i++) {
        for (let j = 0; j < boardfr[i].length; j++) {
            boardfr[i][j] = 0;
        }
    }
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.remove();
    });
    startboard(boardfr);   
}



changebackgroundcolor();

let event = document.addEventListener('keydown', function (event) {
    let deupli = events(event);
    // deleteduplicates(); 
    let lc = onleft(boardfr);
    let rc = onright(boardfr);
    let tc = ontop(boardfr);
    let bc = onbottom(boardfr);
    if (areArraysEqual(lc, boardfr) && areArraysEqual(rc, boardfr) && areArraysEqual(tc, boardfr) && areArraysEqual(bc, boardfr)) {
        gameover();
    }
    // deleteduplicates(deupli);
})


function gameover() {
    let box = document.querySelector('.box');
    box.classList.add('active');
    let overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay1')

}

function createrandom() {
    let zeros = zerosindexs(boardfr);
    // console.log(zeros)
    if (zeros.length != 0) {
        let index = Math.floor(Math.random() * zeros.length);
        let arr2 = zeros[index];
        let div = document.createElement("div");
        gridfr.appendChild(div);
        div.classList.add('tile')
        div.classList.add(`${arr2[0]}${arr2[1]}`)
        div.style.setProperty("--x", arr2[0]);
        div.style.setProperty("--y", arr2[1]);
        div.innerHTML = 2;
        boardfr[arr2[0]][arr2[1]] = 2;
    }


}

function deleteduplicates(tilechange) {
    // tilechange=onleftchange();
    let duplicate = [];
    for (let i = 0; i < tilechange.length; i++) {
        const key = tilechange[i].slice(2, 4);
        for (let j = i + 1; j < tilechange.length; j++) {
            if (key == tilechange[j].slice(2, 4)) {
                duplicate.push(tilechange[i])
                break;
            }
        }
    }
    for (let i = 0; i < duplicate.length; i++) {
        let key = duplicate[i].slice(2, 4)
        let tiles = document.querySelectorAll(`.tile`);
        let content = 0;
        let count = 1;
        tiles.forEach(tile => {
            if (tile.classList.contains(key)) {
                if (count != 1) {
                    content = tile.innerHTML;
                    tile.remove();
                }
                count++;

            }
        });
        // let div = document.createElement("div");
        // gridfr.appendChild(div);
        // div.classList.add('tile')
        // div.classList.add(key)
        // div.style.setProperty("--x", parseInt(key[0]));
        // div.style.setProperty("--y", parseInt(key[1]));
        // div.innerHTML = content;
    }
}

// if (count!=1) {
//     content=tile.innerHTML;
//     tile.remove();
// }
// count++;
function tilemovement(changes) {
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
                    tile.innerHTML = content;
                }
                else {
                    content = parseInt(content);
                    tile.innerHTML = content;
                }
            }

        });

    }

    // setTimeout(() => deleteduplicates(changes), 1);

}
function areArraysEqual(arr1, arr2) {
    // Flatten the arrays
    const flatArr1 = arr1.flat();
    const flatArr2 = arr2.flat();

    // Check if the lengths are equal
    if (flatArr1.length !== flatArr2.length) {
        return false;
    }

    // Check if all elements are equal
    for (let i = 0; i < flatArr1.length; i++) {
        if (flatArr1[i] !== flatArr2[i]) {
            return false;
        }
    }

    return true;
}

function changebackgroundcolor() {
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        let content = tile.innerHTML;
        let power = Math.log2(content);
        let BL = 100 - power * 9;
        tile.style.setProperty('--background-lightness', `${BL}%`);
        tile.style.setProperty('--text-lightness', `${BL <= 50 ? 90 : 10}%`)
    });
}

function events(e) {

    // let changes=[];
    let lc = onleft(boardfr);
    let rc = onright(boardfr);
    let tc = ontop(boardfr);
    let bc = onbottom(boardfr);
    if (areArraysEqual(lc, boardfr) && areArraysEqual(rc, boardfr) && areArraysEqual(tc, boardfr) && areArraysEqual(bc, boardfr)) {
        gameover();
        return [];
    }
    else {
        if (e.key == "ArrowLeft") {
            let changes = onleftchange();
            if (changes.length != 0) {
                tilemovement(changes);
                // deleteduplicates(changes);
                boardfr = lc;
                createrandom();
                changebackgroundcolor();
                return changes;
                // deleteduplicates(changes);
            }

        }
        else if (e.key == "ArrowRight") {
            let changes = onrightchange();
            if (changes.length != 0) {
                tilemovement(changes);
                // deleteduplicates(changes);
                boardfr = rc;
                createrandom();
                changebackgroundcolor();
                return changes;
            }
        }

        else if (e.key == "ArrowUp") {
            let changes = ontopchange();
            if (changes.length != 0) {
                tilemovement(changes);
                // deleteduplicates(changes);
                boardfr = tc;
                createrandom();
                changebackgroundcolor();
                return changes;

            }
        }
        else if (e.key == "ArrowDown") {
            let changes = onbottomchange();
            if (changes.length != 0) {
                tilemovement(changes);
                // deleteduplicates(changes);
                boardfr = bc;
                createrandom();
                changebackgroundcolor();
                return changes;
            }

        }


    }

    // deleteduplicates(changes);

}

function startboard(boa) {
    // let board = boa.map(row => row.slice());
    let array2 = [];
    let zeros = zerosindexs(boardfr);
    // console.log(zeros)
    let index1 = Math.floor(Math.random() * zeros.length);
    array2.push(zeros[index1]);
    zeros.splice(index1, 1);
    let index2 = Math.floor(Math.random() * zeros.length);
    array2.push(zeros[index2]);
    zeros.splice(index2, 1);
    // console.log(array2);
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
    changebackgroundcolor();
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
                a[n + 1] = a[n] * 2;
                a[n] = 0;
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


// Define variables to keep track of touch start and end positions
// let touchStartX = 0;
// let touchStartY = 0;
// let touchEndX = 0;
// let touchEndY = 0;
// let touchThreshold = 10; // Adjust this threshold as needed

// // Get the container element
// let containerElement = document.querySelector('.container');

// // Add touch event listeners to the container element
// containerElement.addEventListener('touchstart', function (event) {
//     touchStartX = event.touches[0].clientX;
//     touchStartY = event.touches[0].clientY;
// });

// containerElement.addEventListener('touchmove', function (event) {
//     event.preventDefault(); // Prevent scrolling while swiping
//     touchEndX = event.touches[0].clientX;
//     touchEndY = event.touches[0].clientY;
// });

// containerElement.addEventListener('touchend', function (event) {
//     let deltaX = touchEndX - touchStartX;
//     let deltaY = touchEndY - touchStartY;

//     // Calculate the absolute distance traveled
//     let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     // Determine if the interaction is a swipe or a tap
//     if (distance > touchThreshold) {
//         // Swipe
//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//             // Horizontal swipe
//             if (deltaX > 0) {
//                 // Swipe right
//                 handleSwipe('ArrowRight');
//             } else {
//                 // Swipe left
//                 handleSwipe('ArrowLeft');
//             }
//         } else {
//             // Vertical swipe
//             if (deltaY > 0) {
//                 // Swipe down
//                 handleSwipe('ArrowDown');
//             } else {
//                 // Swipe up
//                 handleSwipe('ArrowUp');
//             }
//         }
//     } else {
//         // Tap (Do nothing or handle tap behavior)
//     }
// });

// // Function to handle swipe events
// function handleSwipe(direction) {
//     let event = new KeyboardEvent('keydown', { 'key': direction });
//     document.dispatchEvent(event);
// }



let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchThreshold = 10; // Adjust this threshold as needed
let tapDurationThreshold = 350; // in milliseconds

// Get the container element
let containerElement = document.querySelector('.container');

// Add touch event listeners to the container element
containerElement.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    event.touches[0].startTime = new Date().getTime(); // Store start time of touch
});

containerElement.addEventListener('touchmove', function (event) {
    event.preventDefault(); // Prevent scrolling while swiping
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;
});

containerElement.addEventListener('touchend', function (event) {
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    // Calculate the absolute distance traveled
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the touch duration
    let touchDuration = new Date().getTime() - event.changedTouches[0].startTime;

    // Determine if the interaction is a swipe or a tap based on distance and duration
    if (distance > touchThreshold && touchDuration < tapDurationThreshold) {
        // Tap
        // Handle tap behavior here
        console.log("Tap detected");
    } else if (distance > touchThreshold) {
        // Swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                // Swipe right
                handleSwipe('ArrowRight');
            } else {
                // Swipe left
                handleSwipe('ArrowLeft');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                // Swipe down
                handleSwipe('ArrowDown');
            } else {
                // Swipe up
                handleSwipe('ArrowUp');
            }
        }
    } else {
        // Tap (Do nothing or handle tap behavior)
        console.log("No swipe or tap detected");
    }
});

// Function to handle swipe events
function handleSwipe(direction) {
    let event = new KeyboardEvent('keydown', { 'key': direction });
    document.dispatchEvent(event);
}
