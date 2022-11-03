let channels = ['lbx0'];
let ripple = true;
let squareExist = true;
let square = document.getElementById('square');

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('channel')) channels = [urlParams.get('channel')];
if (urlParams.get('ripple') === 'false') ripple = false;
if (urlParams.get('square') === 'false') {
  document.body.removeChild(square);
  squareExist = false;
}


const client = new tmi.Client({
  channels: channels
});

let size = 100;

if (urlParams.get('size')) size = urlParams.get('size');

function createRipple(tags){
  let ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.innerHTML = '<div></div>';
  ripple.style.setProperty('--color', tags.color);
  ripple.style.stroke = tags.color;
  ripple.style.height = `${size - 10}px`;
  ripple.style.width = `${size - 10}px`;
  document.body.appendChild(ripple);
}

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (!tags.color) return;
  if (squareExist) square.style.backgroundColor = tags.color;
  if (ripple) createRipple(tags);
  setTimeout(()=>{
    document.body.removeChild(ripple)
  }, 8000);
});