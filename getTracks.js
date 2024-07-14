const fs = require('fs');

const playlistID = '';
const token = '';

//offset - indice inicial
fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => {
        return response.json()
    })
    .then(data => {
        const tracks = data.items;

        const artists = tracks.flatMap(obj => obj.track.artists)

        const Ids = artists.map(artist => artist.id)

        const uniqueIds = new Set(Ids);

        const uniqueIdsArray = [...uniqueIds];

        const artistsToSave = uniqueIdsArray.join('\n');

        fs.appendFile('duplicates.txt', artistsToSave, 'utf-8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Artistas salvos');
        })
    })