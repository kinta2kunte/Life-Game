const size = 5;
const width = 100;
const height = 100;

let field = [];
let nextField = [];

let ctx = null;
let isStart = false;

// 生物フィールドクリア
const clear = () =>{
    for( let y=0; y<height+2; y++)
    {
        field[y]=[];
        nextField[y]=[];
        
        for( let x=0; x<width+2; x++)
        {
            field[y][x]=0;
            nextField[y][x]=0;
        }
    }
}
// ランダムに生物を置く
const random = () =>{
    for( let y=0; y<height+1; y++)
    {
        for( x=0; x<width+1; x++)
        {
            field[y][x] = Math.random()<0.2 ? field[y][x] = 1 : field[y][x] = 0;
        }
    }
}
// 生物フィールド描画
const drawField = () => {
    for( let y=1; y<height; y++)
    {
        for( let x=1; x<width; x++)
        {
            ctx.fillStyle = field[y][x] ? '#0f0' : '#000';
            ctx.fillRect((x-1)*size, (y-1)*size, size, size);
        }
    }
}

// 生物フィールド演算
const step = () => {
    for( let y=1; y<height+1; y++)
    {
        for( let x=1; x<width+1; x++)
        {
            let cnt = 0;
            for( let dy=-1; dy<=1; dy++)
            {
                for(let dx=-1; dx<=1; dx++)
                {
                    if( field[y + dy][x + dx] == 1 )
                    {
                        cnt++;
                    }
                }
            }
            if( 
            (field[y][x] == 1 && (cnt == 3 || cnt == 4)) ||
            (field[y][x] == 0 && cnt == 3))
            {
                nextField[y][x] = 1;
            }
            else
            {
                nextField[y][x] = 0;
            }
        }
    }
    // 値交換
    [field, nextField] = [nextField, field];
}

// 初期化
//const init = () => {
function init()
{
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = size * width;
    canvas.height = size * height;

    document.getElementById("start").onclick = () =>{
        isStart = true;
    }
    document.getElementById("stop").onclick = () =>{
        isStart = false;    
    }
    document.getElementById("init").onclick = () =>{
        random();    
        drawField();
    }
    
    clear();
    random();
    drawField();
}

window.onload = () =>{
    init();
    console.log("script start!")
    const tick = () =>{
        setTimeout(tick, 300);
        if( isStart )
        {
            step();
            drawField();
        }
    }
    tick();
}