const fs = require('fs');
const files = ['About.tsx', 'Projects.tsx', 'Skills.tsx', 'Certifications.tsx', 'Experience.tsx', 'Navigation.tsx', 'Hero.tsx', 'Contact.tsx'];
files.forEach(f => {
  try {
    const content = fs.readFileSync('components/' + f, 'utf8');
    const matches = content.match(/(title|name|id):\s*['"]([^'"]+)['"]/g);
    if (matches) {
      const titles = matches.map(m => m.split(/['"]/)[1]);
      const unique = new Set(titles);
      if (titles.length !== unique.size) {
        console.log(f + ' has duplicates:', titles.filter((t, i) => titles.indexOf(t) !== i));
      }
    }
  } catch(e) {}
})
