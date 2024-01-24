function set_board() {
    let arr = [
        [2, 4, 4, 0],
        [0, 2, 0, 2],
        [0, 2, 0, 2],
        [2, 2, 2, 2],
    ];

    // generaterandomstarts(arr);
    move(arr);
    console.log(arr);

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
function move(arr){
    let left=true;
    if(left){
        for (let i = 0; i < arr.length; i++) {
            let clearzeros=[];
            for (let j= 0; j < arr[i].length; j++) {
                if (arr[i][j]!=0) {
                    clearzeros.push(arr[i][j]);
                }
            }
            console.log(clearzeros);
            for (let k = 0; k< clearzeros.length; k++) {
                if (k+1!=clearzeros.length) {
                    if (clearzeros[k]==clearzeros[k+1]) {
                        clearzeros[k]=2*clearzeros[k];
                        clearzeros[k+1]=0;
                    }
                }
            }
            let finalrow = clearzeros.filter((x) => x !== 0);

            while(finalrow.length!=4){
                finalrow.push(0);
            }
            arr[i]=finalrow;
        }
    }
}


set_board();
