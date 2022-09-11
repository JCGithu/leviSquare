let channels = ['lbx0'];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('channel')) channels = [urlParams.get('channel')];

const client = new tmi.Client({
  channels: channels
});
let square = document.getElementById('square');
let size = 100;

if (urlParams.get('size')) size = urlParams.get('size');

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (!tags.color) return;
  square.style.backgroundColor = tags.color;
  let ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.innerHTML = '<div></div>';
  ripple.style.setProperty('--color', tags.color);
  ripple.style.stroke = tags.color;
  ripple.style.height = `${size - 10}px`;
  ripple.style.width = `${size - 10}px`;
  document.body.appendChild(ripple);
/*   setTimeout(()=>{
    document.body.removeChild(ripple)
  }, 5000); */
});