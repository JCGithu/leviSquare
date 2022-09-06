
const client = new tmi.Client({
  channels: ['lbx0']
});

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (tags.color) document.body.style.backgroundColor = tags.color;
});