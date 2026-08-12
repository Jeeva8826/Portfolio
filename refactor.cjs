const fs = require('fs');
const path = require('path');

const files = ['About.jsx', 'Skills.jsx', 'Projects.jsx', 'Navbar.jsx', 'Footer.jsx', 'ExperienceEducation.jsx', 'Contact.jsx'];

files.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'components', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get original imported vars
  const oldImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+'\.\.\/data\/portfolio';/);
  
  if (oldImportMatch) {
    const vars = oldImportMatch[1].trim();
    
    // Replace import
    content = content.replace(oldImportMatch[0], "import { usePortfolioContext } from '../context/PortfolioContext';");
    
    // Find component function definition
    const funcMatch = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
    if (funcMatch) {
      const funcDecl = funcMatch[0];
      const newFuncDecl = funcDecl + `\n  const { ${vars} } = usePortfolioContext();`;
      content = content.replace(funcDecl, newFuncDecl);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Refactored ${file}`);
  }
});

// For Hero.jsx, just remove the import
const heroPath = path.join(__dirname, 'src', 'components', 'Hero.jsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(/import\s+\{\s*personalData\s*\}\s+from\s+'\.\.\/data\/portfolio';\n?/, '');
fs.writeFileSync(heroPath, heroContent);
console.log('Refactored Hero.jsx');
