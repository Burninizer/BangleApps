// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);

// define background
var imgBg=
require("heatshrink").decompress(atob("nkqgIFC+AMFh4UG/gSFh/ACQs/AQMDBwQDDBQQDBCwIZDgYlCFAcPCwIRCAAP/CIgEB/4ABIYc/AwJVEAwIVDEoIHBEgYdOCoXzEgv/mAOD/gOG54OEn/8B4JoDBwPPBAIzE/nPGoJCD5hFC//DDwInB+AzBn/PBwvzBAIOEmYsB/4kD/5dB+AzCAgICBDAI7CBwIYCQwYnCPwauBBwZXEBwgGDBwQHEdQYONj4OFgIOMA=="));
var screenH = g.getHeight();
var screenW = g.getWidth();

// position on screen
const X = 140, Y = 110;

function draw() {
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes();
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",4);
  g.setFontAlign(1,1); // align right bottom
  g.drawString(time, X, Y, true /*clear background*/);
  // draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg",2);
  g.drawString(("0"+d.getSeconds()).substr(-2), X+30, Y, true /*clear background*/);
  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0,1); // align center bottom
  // pad the date - this clears the background if the date were to change length
  var dateStr = "    "+require("locale").date(d)+"    ";
  g.drawString(dateStr, g.getWidth()/2, Y+15, true /*clear background*/);
}

// Clear the screen once, at startup
g.clear();
// draw immediately at first
  g.setColor(0,0,0);
  g.drawImage(imgBg,8,screenH-42);
  g.fillRect(0,26,175,29); //These two lines are the top border
  g.fillRect(0,32,175,33);
  g.fillRect(0,175,175,172); //These two lines are the bottom border
  g.fillRect(0,169,175,168);
draw();
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});
// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
