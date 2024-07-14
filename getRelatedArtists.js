const fs = require('fs');

const token = '';

fs.readFile('artists.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const artists = data.split('\n');
    
    artists.forEach(artist => {
        fetch(`https://api.spotify.com/v1/artists/${artist}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {    
            const artistsNames = data.artists.map(artist => artist.name)
    
            const artistsToSave = artistsNames.join('\n');
    
            fs.appendFile('artist-names.txt', artistsToSave, 'utf-8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Artistas salvos');
            })

        })
    });
});


