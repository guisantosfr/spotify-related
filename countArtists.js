const fs = require('fs');

fs.readFile('artist-names.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const artistNames = data.split('\n');

    const artistsCounted = artistNames.reduce((count, artist) => {
        if (artist in count) {
        count[artist]++;
        } else {
        count[artist] = 1;
        }
        return count;
    }, {});

    const countedArray = Object.entries(artistsCounted);
    countedArray.sort((a, b) => b[1] - a[1]);

    const sortedArtistsCounted = countedArray.reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {}
    );

    const jsonString = JSON.stringify(sortedArtistsCounted, null, 2)

    fs.appendFile('artist-count-sorted.txt', jsonString, 'utf-8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Contagem salva');
    })
})