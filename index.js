const input_arr = [
    [
        [19,25,1],
        [21,29,7],
    ],

    [
        [2,26,27,3],
        [8,30,null,9],
        [13,null,null,14],
    ],

    [
       [4,5],
       [10,11],
       [15,16],
    ],

    [
        [6,28,20],
        [12,null,22],
        [17,null,23],
        [18,null,24],
    ]
]

const arr_shape = [[3,2] , [4,3],[2,3],[3,4]]
const nb_passenger = 30
let current_passenger = 1
const debug = false;
const initial_tensor =debug ? input_arr: createIntialArray(arr_shape)
const max_matrix_rows = max_i(arr_shape);
//filling the aisle seats
for(let i = 0;i<max_matrix_rows;i++){
for( let k=0;k<initial_tensor.length;k++){
    const matrix = initial_tensor[k];
   
        const j_tuple = getJSeat(initial_tensor,k,i)
        if( j_tuple === null) continue;
        j1 = j_tuple.first;
        j2 = j_tuple.second;
        if(j1 !== null){ 
            matrix[i][j1] = current_passenger
            current_passenger++;
        }
        if(j2 !== null){ 
            matrix[i][j2] = current_passenger
            current_passenger++;
        }
         console.log(`i = ${i} ----------------------------------`)
         console.log(`(k,i)=(${k},${i})= `,matrix[i][j1],'with j1 = ',j1)
         console.log(`(k,i)=(${k},${i})= `,matrix[i][j1],'with j2 = ',j2)

    }

   
}
//filling the window seats-------------------------
console.log("filling the window seats-------------------------")
const left_widows_length = arr_shape[0][1]
const right_widows_length = arr_shape[arr_shape.length-1][1]
const max_length = Math.max(left_widows_length,right_widows_length)
const min_length = Math.min(left_widows_length,right_widows_length)
let max_state;
if(left_widows_length > right_widows_length) max_state = "left"
else if(left_widows_length < right_widows_length) max_state = "right"
else max_state = "equal"
console.log(`left_widows_length = ${left_widows_length} , right_widows_length=${right_widows_length} , max_state=${max_state}`)


for(let i = 0 ;i<max_length;i++){
    if( i <= min_length -1 || max_state === "left"){
        initial_tensor[0][i][0] = current_passenger;
        current_passenger++;
    }
    if( i <= min_length -1 || max_state === "right"){
        initial_tensor[initial_tensor.length - 1][i][arr_shape[arr_shape.length-1][0]-1] = current_passenger;
        current_passenger++;
    }

   
}

//filling the middele seats
console.log(initial_tensor)
for(let i = 0;i<max_matrix_rows && (current_passenger <nb_passenger);i++){
for( let k=0;k<initial_tensor.length && (current_passenger <nb_passenger);k++){
    console.log("k---------------------",k,"shape: ",arr_shape[k])
    if(arr_shape[k][0] <=2) continue
    const matrix = initial_tensor[k];
    console.log("matrix",matrix)
   
        if(i >= arr_shape[k][1]) continue
        console.log("i---------------------",i)

       for(j = 1 ;(j<matrix[i].length-1) && (current_passenger <nb_passenger) ;j++){
            matrix[i][j] = current_passenger;
            current_passenger++;
       }

    }

   
}
console.log("final result : -------------------------------------")
console.log(initial_tensor[0])
console.log("**********")
console.log(initial_tensor[1])
console.log("**********")
console.log(initial_tensor[2])
console.log("**********")
console.log(initial_tensor[3])

function getJSeatVal(initial_tensor,k,i){
    if( i <0 || i >= arr_shape[k][1] ) return null
    if( k === 0) return {first: null , second :initial_tensor[k][i][initial_tensor[k][0].length -1] }
    else if ( k === initial_tensor.length -1 ) return {first:initial_tensor[k][i][0] , second:null}

    return {first: initial_tensor[k][i][0] , second :initial_tensor[k][i][initial_tensor[k][0].length -1] }
}
function getJSeat(initial_tensor,k,i){
    if( i <0 || i >= arr_shape[k][1] ) return null
    if( k === 0) return {first: null , second :initial_tensor[k][0].length -1 }
    else if ( k === initial_tensor.length -1 ) return {first:0 , second:null}

    return {first: 0 , second :initial_tensor[k][0].length -1 }
}











//utils
function createIntialArray(arr_shape){
   const tensor = []
   for(let k=0;k<arr_shape.length;k++){

     const rows = arr_shape[k][1]
     const cols = arr_shape[k][0]
     const matrix = []
     for(let i = 0;i<rows;i++){
        const array = []
        for(let j =0;j<cols;j++){
            array.push(null)
        }
        matrix.push(array)
     }
     tensor.push(matrix)

   }

   return tensor
}


function max_i(arr_shape){
    let max_matrix_rows =  -Infinity
    arr_shape.forEach(matrix=>{
        if(matrix[1] > max_matrix_rows) max_matrix_rows = matrix[1]
    })
    return max_matrix_rows
}