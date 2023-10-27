status1 = "false";
song2 = "Y2K Song";
song1 = "Peter Pan Song";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scorerightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
    song2 = loadSound("Y2KSong.mp3");
    song1 = loadSound("PeterPanSong.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() 
{
    image(video, 0, 0, 600 ,500);
    fill("#FF0000");
    stroke("#FF0000");

    status1 = song1.isPlaying();


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY,20);
        song2.stop();
        if(status1 == "false")
        {
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Song" + song1;
        }
        song1.play();
    }   

}
function play()
{ 
    song2.play();
}
function modelLoaded() 
{
    console.log('Posenet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristY +"leftWristY = " + leftWristY);

    }
}
