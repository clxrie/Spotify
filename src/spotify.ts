async function getProfile(token){
    const response = await fetch('https://api.spotify.com/v1/me',{
        method: 'GET',
       headers: {
        "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json();
    return data; //what should I write here??
}

async function getTopTracks(token){
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50',{
        method: 'GET',
       headers: {
        "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.items; 
}


async function getTopArtists(token){
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50',{
        method: 'GET',
       headers: {
        "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.items; 
}

export { getProfile,getTopTracks,getTopArtists };