let channels = ['lbx0'];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('channel')) channels = [urlParams.get('channel')];

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
  if (tags.emotes){
    let emoteList = Object.keys(tags.emotes);
    emote.src = `http://static-cdn.jtvnw.net/emoticons/v2/${emoteList[emoteList.length - 1]}/default/light/3.0`
    currentEmote = emoteList[emoteList.length - 1];
  }
});