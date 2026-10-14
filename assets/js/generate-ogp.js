const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const GUILD_ID = '1559776354671796234';

async function updateOgp() {
  let onlineCount = 0;
  let totalCount = 0;

  try {
    const res = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`);
    const data = await res.json();
    onlineCount = data.presence_count || 0;
    totalCount = data.members ? data.members.length : onlineCount;
  } catch (e) {
    onlineCount = 0;
    totalCount = 0;
  }

  const basePath = path.join(__dirname, '../images/invite-base.png');
  const outputPath = path.join(__dirname, '../images/discord-banner.png');

  const image = await loadImage(basePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 24px sans-serif';

  ctx.fillText(`${onlineCount} オンライン`, 95, 412);
  ctx.fillText(`${totalCount} メンバー`, 520, 412);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

updateOgp();
