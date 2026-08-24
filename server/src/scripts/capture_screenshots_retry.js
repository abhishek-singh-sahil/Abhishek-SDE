const fs = require('fs');
const path = require('path');
const http = require('https');

const uploadDir = path.join(__dirname, '../../public/uploads');

const projects = [
  { slug: 'elisa-decor', url: 'https://elisadecor.in' },
  { slug: 'anand-vihar', url: 'https://anand-vihar.com' }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status Code: ${response.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function capture() {
  console.log('Retrying screenshot captures for timed-out sites...');
  for (const proj of projects) {
    const destPath = path.join(uploadDir, `${proj.slug}.png`);
    // Added retry attempt
    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      console.log(`[Attempt ${attempt}/3] Fetching screenshot for ${proj.slug} (${proj.url})...`);
      // We can add retry parameters or increase wait parameters.
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(proj.url)}&screenshot=true&embed=screenshot.url&waitFor=5000`;
      try {
        await downloadImage(apiUrl, destPath);
        console.log(`✔ Successfully saved screenshot to: public/uploads/${proj.slug}.png`);
        success = true;
        break;
      } catch (err) {
        console.error(`❌ Failed on attempt ${attempt}:`, err.message);
        // Sleep for 3 seconds before retrying
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    // Sleep for 1 second between projects
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('Retry operations complete.');
}

capture();
