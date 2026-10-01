
function mainstreamScore(tracks: any[]){
    return tracks.reduce((sum, t) => sum + t.popularity, 0)/tracks.length/100;
}

function obscurityRatio(tracks: any[]){
    //.filter(t => t.popularity < 50) gives you a new array of ONLY the low-popularity tracks
    return tracks.filter(t => t.popularity < 50).length/ tracks.length;
}

function genreDiversity(artists: any[]){
    //new Set() wraps around the array like parentheses. The .flatMap() result goes INSIDE the Set() parentheses, then .size goes on the outside.
    return new Set(artists.flatMap(a => a.genres)).size;
}

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
 function getPersonalityType(tracks: any[], artists: any[]){
    // Step 1: Calculate all four values
    const mainStream = mainstreamScore(tracks);
    const diversity = genreDiversity(artists);
    const loyalty = artistLoyalty(tracks);
    const obscurity = obscurityRatio(tracks);

    // Step 2: Determine quadrant
    let quadrant = "";
    if(mainStream > 0.5 && diversity > 20){
        quadrant = "The Sonic Socialite";
    } else if(mainStream > 0.5 && diversity <= 20){
        quadrant = "The Anthem Keeper";
    } else if(mainStream <= 0.5 && diversity > 20){
        quadrant = "Genreless Soul";
    } else{
        quadrant = "Aesthetic Recluse";
    }

    // Step 3: Determine modifier
    let modifier = "";
    
    if(quadrant === "The Anthem Keeper"){
        if(loyalty){
            modifier = "The Ride-or-Die";
        } else if(obscurity > 0.3){
            modifier = "The Guilty Pleasure Hoarder";
        }else{
            modifier = "The Chorus Chaser";
        }
    }
    else if(quadrant === "The Sonic Socialite"){
        if(loyalty){
            modifier = "The Star Keeper";
        }else if(obscurity > 0.3){
            modifier = "The Hidden-Track Hunter";
        }else{
            modifier = "The Chorus Native";
        }
    }
    else if(quadrant === "Genreless Soul"){
        if(loyalty){
            modifier = "The Discography Devotee";
        }else if(obscurity > 0.3){
            modifier = "The Rabbit-Hole Dweller";
        }else{
            modifier = "The Scene Hopper/The Genre Pilgrim";
        }
    }
    else if(quadrant === "Aesthetic Recluse"){
        if(loyalty){
            modifier = "The Underground Disciple";
        }else if(obscurity > 0.3){
            modifier = "The Deep-Scene Diver";
        }else{
            modifier = "Genre Hermit";
        }
    }

    return { quadrant, modifier}
 }

export { mainstreamScore,obscurityRatio, genreDiversity, artistLoyalty,getPersonalityType };