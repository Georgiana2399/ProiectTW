function myFunction() {
  var x = document.getElementById("myNavbar");
  if (x.className === "navbar") {
    x.className += " responsive";
    document.getElementByClassName('close').style.display = "block";
  } else {
    document.getElementsByClassName('close').style.display = "none";
    x.className = "navbar";
  }
}

function myCloseFunction() {
  var x = document.getElementById("myNavbar");
  if (x.className === "navbar responsive") {
    x.className = "navbar";
    document.getElementByClassName('close').style.display = "block";
  } else {
    document.getElementsByClassName('close').style.display = "none";
    x.className = "navbar";
  }
}

function myFunctionS() {
  var x = document.getElementById('show').style.display;
  if (x === 'none') {
    document.getElementById('show').style.display = 'block';
  }
  else {
    document.getElementById('show').style.display = 'none';

  }
}

function Show1() {
  var x = document.getElementById('hide1').style.display;
  if (x === 'none') {
    document.getElementById('hide1').style.display = 'block';
  }
  else {
    document.getElementById('hide1').style.display = 'none';

  }
}
function Show2() {
  var x = document.getElementById('hide2').style.display;
  if (x === 'none') {
    document.getElementById('hide2').style.display = 'block';
  }
  else {
    document.getElementById('hide2').style.display = 'none';

  }
}
function Show3() {
  var x = document.getElementById('hide3').style.display;
  if (x === 'none') {
    document.getElementById('hide3').style.display = 'block';
  }
  else {
    document.getElementById('hide3').style.display = 'none';

  }
}
function Show4() {
  var x = document.getElementById('hide4').style.display;
  if (x === 'none') {
    document.getElementById('hide4').style.display = 'block';
  }
  else {
    document.getElementById('hide4').style.display = 'none';

  }
}
function Show5() {
  var x = document.getElementById('hide5').style.display;
  if (x === 'none') {
    document.getElementById('hide5').style.display = 'block';
  }
  else {
    document.getElementById('hide5').style.display = 'none';

  }
}
