function artistLoyalty(tracks: any[]){
    // Step 1: Pull out just the primary artist name from each track
    const artistNames =  tracks.map(t => t.artists[0].name);
    // Step 2: Count how many times each name appears
    // Start with empty object {}, for each name either create it at 1
    // or add 1 to existing count
    const counts = artistNames.reduce((counts, name) => {
        counts[name] = (counts[name] || 0) + 1;
        return counts;
    }, {})
     // Step 3: Check if ANY artist appears 5 or more times
    // Object.values gives us just the numbers: [7, 3, 1, 2]
    // .some() returns true if at least one passes the test
    return (Object.values(counts) as number[]).some(count => count >= 5);
    
}

function averageYear(tracks){
     return tracks.reduce((sum, t) => sum + Number(t.album.release_date.slice(0, 4)), 0) / tracks.length;
}

function artistVariety(tracks){
    const trackFirstArtistName = tracks.map(t => t.artists[0].name);
    const names = new Set(trackFirstArtistName).size;
    return names/ tracks.length;
}

function albumRatio(tracks: any[]) {
    return tracks.filter(t => t.album.album_type === "album").length / tracks.length;
}

const descriptions: Record<string, string> = {
    "The Anthem Keeper": "You find home in a handful of artists, holding close to the familiar melodies and timeless songs that never lose their place in your heart.",
    "The Sonic Socialite": "You love to explore the musical world as it happens, finding something new in every release and a rhythm in every gathering.",
    "Aesthetic Recluse": "You find refuge in a select few artists of right now, returning again and again to the sounds that feel made just for you.",
    "Genreless Soul": "You wander across years and artists alike, finding beauty in sounds from every era, never bound to a single voice.",
};

 function getPersonalityType(tracks: any[], _artists: any[]){
    // Step 1: Calculate all four values
    const year = averageYear(tracks);
    const variety = artistVariety(tracks);
    const albums = albumRatio(tracks);
    const loyalty = artistLoyalty(tracks);

    const isNew = year >= 2020;
    const isVaried = variety >= 0.6;

    // Step 2: Determine quadrant
    let quadrant = "";
    if(isNew && isVaried){
        quadrant = "The Sonic Socialite";
    } else if(!isNew && !isVaried){
        quadrant = "The Anthem Keeper";
    } else if(!isNew && isVaried){
        quadrant = "Genreless Soul";
    } else{
        quadrant = "Aesthetic Recluse";
    }

    // Step 3: Determine modifier
    let modifier = "";
    
    if(quadrant === "The Anthem Keeper"){
        if(loyalty){
            modifier = "The Ride-or-Die";
        } else if(albums >= 0.5){
            modifier = "The Guilty Pleasure Hoarder";
        }else{
            modifier = "The Chorus Chaser";
        }
    }
    else if(quadrant === "The Sonic Socialite"){
        if(loyalty){
            modifier = "The Star Keeper";
        }else if(albums >= 0.5){
            modifier = "The Hidden-Track Hunter";
        }else{
            modifier = "The Chorus Native";
        }
    }
    else if(quadrant === "Genreless Soul"){
        if(loyalty){
            modifier = "The Discography Devotee";
        }else if(albums >= 0.5){
            modifier = "The Rabbit-Hole Dweller";
        }else{
            modifier = "The Scene Hopper/The Genre Pilgrim";
        }
    }
    else if(quadrant === "Aesthetic Recluse"){
        if(loyalty){
            modifier = "The Underground Disciple";
        }else if(albums >= 0.5){
            modifier = "The Deep-Scene Diver";
        }else{
            modifier = "Genre Hermit";
        }
    }

    return {
        quadrant,
        modifier,
        description: descriptions[quadrant],
        stats: {
            year: Math.round(year),
            variety: Math.round(variety * 100),
            albums: Math.round(albums * 100),
        },
    };
 }

export {  artistLoyalty,getPersonalityType };