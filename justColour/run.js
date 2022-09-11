let channels = ['lbx0'];

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('channel')) channels = [urlParams.get('channel')];

const client = new tmi.Client({
  channels: channels
});

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (tags.color) document.body.style.backgroundColor = tags.color;
});