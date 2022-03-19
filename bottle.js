Status = "";
bottle_img = "";
objects = [];
function preload(){
    bottle_img = loadImage("bottle.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bottle_img,0,0,640,350);
    if(Status != ""){
        for(i = 0; i < objects.length; i=i+3){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[0].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x - 20, objects[i].y + 15);
            percent = floor(objects[1].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 170, objects[i].y + 15);
            percent = floor(objects[2].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 360, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 30, objects[i].y + 3, objects[i].width + 120, objects[i].height + 75);
            rect(objects[i].x + 160, objects[i].y + 3, objects[i].width + 120, objects[i].height + 75);
            rect(objects[i].x + 350, objects[i].y + 3, objects[i].width + 120, objects[i].height + 75);
        }
    }
}