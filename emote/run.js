let channels = ['lbx0'];
let slow = false;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('channel')) channels = [urlParams.get('channel')];
if (urlParams.get('slow')) slow = true;

const client = new tmi.Client({
  channels: channels
});

let square = document.getElementById('square');
let emote = document.getElementById('emote');
let filter = document.getElementById('outline-color');
let size = 100;

let currentEmote;

if (urlParams.get('size')) size = urlParams.get('size');

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (!tags.color) return;
  console.log(tags);
  if (tags.emotes){
    let emoteList = Object.keys(tags.emotes);
    emote.src = `http://static-cdn.jtvnw.net/emoticons/v2/${emoteList[emoteList.length - 1]}/default/light/3.0`
    currentEmote = emoteList[emoteList.length - 1];
  }
  if (slow && !tags.emotes) return;
  let ripple = document.createElement('div');
  ripple.className = 'ripple';
  let innerText = '';
  if (currentEmote){
    innerText = `<img src="http://static-cdn.jtvnw.net/emoticons/v2/${currentEmote}/default/light/3.0">`
  }

  filter.setAttribute("flood-color", tags.color);
  filter.style.setProperty('--color', tags.color);
  ripple.innerHTML = `<div>${innerText}</div>`;
  ripple.style.setProperty('--color', tags.color);
  ripple.style.stroke = tags.color;
  ripple.style.height = `${size - 10}px`;
  ripple.style.width = `${size - 10}px`;
  document.body.appendChild(ripple);
  setTimeout(()=>{
    document.body.removeChild(ripple)
  }, 8000);
});