window.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
}

  const container = document.getElementById('text');
  const text = container.textContent;
  container.textContent = '';

  const speed = 50;
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      container.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});

function openNav() {
  document.getElementById('myNav').style.width = '100%';
  document.querySelector('.content').classList.add('overlay-active');
}

function closeNav() {
  document.getElementById('myNav').style.width = '0%';
  document.querySelector('.content').classList.remove('overlay-active');
}

function onPlayerReady(event) {
  event.target.setOption('disablekb', 1);
  event.target.setOption('showinfo', 0);
  event.target.setOption('rel', 0);
  event.target.setOption('controls', 0);
}

// Wykrywanie narzędzi deweloperskich
function detectDevTools() {
  const threshold = 160;
  let widthThresholdExceeded = false;

  function checkDevTools() {
      if (typeof window.devtools === 'object' || widthThresholdExceeded) {
          redirectToDevToolsPage();
      }
  }

  function redirectToDevToolsPage() {
      window.location.href = 'devtools.html';
  }

  window.addEventListener('resize', () => {
      if (window.innerWidth > threshold) {
          widthThresholdExceeded = true;
          checkDevTools();
      }
  });

  window.addEventListener('devtoolschange', (event) => {
      if (event.detail.isOpen || widthThresholdExceeded) {
          checkDevTools();
      }
  });

  checkDevTools();
}

function handleKeyDown(event) {
  if (
      (event.ctrlKey && event.shiftKey && event.code === 'KeyI') ||
      (event.ctrlKey && event.shiftKey && event.code === 'KeyC')
  ) {
      event.preventDefault();
      showAlert("Kombinacja klawiszy jest zablokowana!");
  } else if (event.keyCode === 123) {
      event.preventDefault();
      event.stopPropagation();
  }
}
function showAlert(message) {
  console.log(message);
  alert(message);
}
document.addEventListener('keydown', handleKeyDown);




document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});




const defaultTitle = 'pyter.pl';

function changeTitleOnExit() {
  document.getElementById('custom-title').innerText = 'wróć się umyć!';
}

window.addEventListener('blur', changeTitleOnExit);

window.addEventListener('focus', () => {
  document.getElementById('custom-title').innerText = defaultTitle;
});

;(function(){

  var msg = "pyter.pl";
  var size = 14;
  var circleY = 1; var circleX = 1;
  var letter_spacing = 4;
  var diameter = 22;
  var rotation = 0.2;
  var speed = 0.5;
  
  if (!window.addEventListener && !window.attachEvent || !document.createElement) return;
  
  msg = msg.split('');
  var n = msg.length - 1, a = Math.round(size * diameter * 0.20), currStep = 20,
  
  ymouse = a * circleY + 20, xmouse = a * circleX + 20, y = [], x = [], Y = [], X = [],
  
  o = document.createElement('div'), oi = document.createElement('div'),
  
  b = document.compatMode && document.compatMode != "BackCompat"? document.documentElement : document.body,
  
  mouse = function(e){
  
   e = e || window.event;
   ymouse = !isNaN(e.pageY)? e.pageY : e.clientY; // y-position
   xmouse = !isNaN(e.pageX)? e.pageX : e.clientX; // x-position
  
  },
  
  makecircle = function(){ // rotation/positioning
  
   if(init.nopy){
  
    o.style.top = (b || document.body).scrollTop + 'px';
    o.style.left = (b || document.body).scrollLeft + 'px';
  
   };
  
   currStep -= rotation;
  
   for (var d, i = n; i > -1; --i){ // makes the circle
  
    d = document.getElementById('iemsg' + i).style;
    d.top = Math.round(y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15) + 'px';
    d.left = Math.round(x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX) + 'px';
  
   };
  
  },
  
  
  
  drag = function(){ // makes the resistance
  
    y[0] = Y[0] += (ymouse - Y[0]) * speed;
   x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
   for (var i = n; i > 0; --i){
    y[i] = Y[i] += (y[i-1] - Y[i]) * speed;
    x[i] = X[i] += (x[i-1] - X[i]) * speed;
   };
  
   makecircle();
  
  },
  
  
  
  init = function(){ // appends message divs, & sets initial values for positioning arrays
  
   if(!isNaN(window.pageYOffset)){
  
    ymouse += window.pageYOffset;
    xmouse += window.pageXOffset;
  
   } else init.nopy = true;
  
   for (var d, i = n; i > -1; --i){
  
    d = document.createElement('div'); d.id = 'iemsg' + i;
    d.style.height = d.style.width = a + 'px';
    d.appendChild(document.createTextNode(msg[i]));
    oi.appendChild(d); y[i] = x[i] = Y[i] = X[i] = 0;
  
   };
  
   o.appendChild(oi); document.body.appendChild(o);
  
   setInterval(drag, 25);
  
  },
  
  
  
  ascroll = function(){
  
   ymouse += window.pageYOffset;
   xmouse += window.pageXOffset;
   window.removeEventListener('scroll', ascroll, false);
  
  };
  
  
  
  o.id = 'outerCircleText'; o.style.fontSize = size + 'px';
  
  
  
  if (window.addEventListener){
  
   window.addEventListener('load', init, false);
   document.addEventListener('mouseover', mouse, false);
   document.addEventListener('mousemove', mouse, false);
    if (/Apple/.test(navigator.vendor))
     window.addEventListener('scroll', ascroll, false);
  
  }
  
  else if (window.attachEvent){
  
   window.attachEvent('onload', init);
   document.attachEvent('onmousemove', mouse);
  
  };
  
  
  
  })();