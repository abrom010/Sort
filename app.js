let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 1280;
const NUMBER_OF_BOXES = 200;

canvas.setAttribute("width",CANVAS_WIDTH);
canvas.setAttribute("height",CANVAS_HEIGHT);

class Box {
  constructor(place) {
    this.place = place;

    this.height = Math.random()*CANVAS_HEIGHT;
    this.width = CANVAS_WIDTH/NUMBER_OF_BOXES;

    this.y = CANVAS_HEIGHT-this.height;

    this.draw();
  }

  x() {
    return this.place*CANVAS_WIDTH/NUMBER_OF_BOXES;
  }

  draw() {
    ctx.fillRect(this.x(),this.y,this.width,this.height);
  }

  erase() {
    ctx.clearRect(this.x(),this.y-1,this.width,this.height);
  }

  green() {
    this.erase();
    ctx.fillStyle = "green";
    this.draw();
    ctx.fillStyle = "black";
  }

  red() {
    this.erase();
    ctx.fillStyle = "red";
    this.draw();
    ctx.fillStyle = "black";
  }

}

let array = []
for(let i=0; i<NUMBER_OF_BOXES-1; i++) {
  array.push(new Box(i));
}

function swich(array,i) {
  let temp = array[i];
  array[i] = array[i+1];
  array[i+1] = temp;
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

// now we have array of boxes with 'height' property as the number to compare with
// we can change the 'place' property of the box, and redraw to replace it

async function bubbleSort(array) {
  let sorted = false;
  while(!sorted)
  {
    let count = 0;
    for(let i=0; i<array.length-1; i++)
    {
      if(array[i].height>array[i+1].height)
      {
        array[i].green();
        if(i%2==0){
          await sleep(4);
        }

        array[i].erase();
        array[i+1].erase();

        array[i].place ++;
        array[i+1].place --;
        swich(array,i);

        array[i].draw();
        array[i+1].draw();

        count++;
      }
    }
    if(count==0)
    {
      sorted = true;
    }
  }
}

// async function bubbleSort(array) {
//   let sorted = false;
//   while(!sorted)
//   {
//     let count = 0;
//     for(let i=0; i<array.length-1; i++)
//     {
//       if(array[i].height>array[i+1].height)
//       {
//         array[i].green();
//         await sleep(2);

//         array[i].erase();
//         array[i+1].erase();

//         array[i].place ++;
//         array[i+1].place --;

//         array[i].draw();
//         array[i+1].draw();

//         let temp = array[i];
//         array[i] = array[i+1];
//         array[i+1] = temp;

//         count++;
//       }
//       else if(count==0)
//       {
//         array[i].green();
//         array[i+1].green();
//       }
//     }
//     if(count==0)
//     {
//       sorted = true;
//     }
//   }
// }

bubbleSort(array);









// const red = async () => {
//   for(box of array) {
//     await delay(50);
//     box.green();
//   }
//   for(box of array) {
//     await delay(50);
//     box.red();
//   }
// }