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