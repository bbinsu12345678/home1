const fs = require('fs');
try {
    const data = JSON.parse(fs.readFileSync('sites_list.json', 'utf8'));
    data.forEach(site => {
        if (site.name.includes('banana')) {
            console.log(`${site.name}: ${site.id}`);
        }
    });
} catch (e) {
    console.error("Error parsing JSON:", e.message);
}
