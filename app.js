const searchSong = () => {
    searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    //load data
    fetch(url)
        .then(res => res.json())
        .then(dataJSON => displaySongs(dataJSON.data))
        .catch(err => {
            console.log("err");
        })
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
       // const songDiv = document.createElement('div');
        //songDiv.className = 'single-result row align-items-center my-3 p-3';
        // songDiv.innerHTML = `
        const preHTML=`
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
               <h3 class="lyrics-name">${song.title}</h3>
               <p class="author lead">Album by <span>${song.artist.name}</span></p>
               <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
               <button onclick="displayLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        //songContainer.appendChild(songDiv);
        songContainer.innerHTML = songContainer.innerHTML + preHTML;
    });
};

const displayLyrics = (artist, title) => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    const displayLyrics = document.getElementById('display-lyrics');
    displayLyrics.innerHTML = '';
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const htmlSkeleton = `
            <div>
            <p>${data.lyrics}</p>
            </div>
            `;
            displayLyrics.innerHTML = htmlSkeleton;
        })
}
