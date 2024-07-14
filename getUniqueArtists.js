const fs = require('fs');

// Read the file
fs.readFile('duplicates.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  // Split the file content into an array of strings based on new lines
  const lines = data.split('\n');

  const uniquesArray = new Set(lines);
  
  const uniquesArtists = [...uniquesArray]

  fs.writeFile('artists.txt', uniquesArtists.join('\n'), 'utf-8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Artistas únicos salvos');
})
  
 
});