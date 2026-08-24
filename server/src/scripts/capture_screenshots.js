const fs = require('fs');
const path = require('path');
const http = require('https');

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const projects = [
  { slug: 'elisa-decor', url: 'https://elisadecor.in' },
  { slug: 'abhishek-sde', url: 'https://abhisheksinghsahil.vercel.app' },
  { slug: 'threadntones', url: 'https://threadntones.in' },
  { slug: 'anand-vihar', url: 'https://anand-vihar.com' },
  { slug: 'furniture-erp', url: 'https://furniture-erp-ten.vercel.app' },
  { slug: 'restaurant-inventory', url: 'https://resturant-inventory.vercel.app' },
  { slug: 'livevent-kt', url: 'https://liveventkt.vercel.app' },
  { slug: 'restaurant-inventory-demo', url: 'https://restaurant-inventory-demo-rust.vercel.app' }
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
  console.log('Starting screenshot captures via Microlink API...');
  for (const proj of projects) {
    const destPath = path.join(uploadDir, `${proj.slug}.png`);
    // Microlink API screenshot screenshot endpoint: https://api.microlink.io/?url=<url>&screenshot=true&embed=screenshot.url
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(proj.url)}&screenshot=true&embed=screenshot.url`;
    
    console.log(`Fetching screenshot for ${proj.slug} (${proj.url})...`);
    try {
      await downloadImage(apiUrl, destPath);
      console.log(`✔ Successfully saved screenshot to: public/uploads/${proj.slug}.png`);
    } catch (err) {
      console.error(`❌ Failed to fetch screenshot for ${proj.slug}:`, err.message);
    }
    // Sleep for 1 second to respect API limits
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('Capture operations complete.');
}

capture();
