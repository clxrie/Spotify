import { useEffect, useState } from "react";
import { getProfile,getTopTracks,getTopArtists } from "./spotify";
import { getPersonalityType } from "./personality";

function Result(){
    const [profile, setProfile] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [artists,setArtists] = useState(null);

    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        async function fetchData(){
            const profileData = await getProfile(token);
            setProfile(profileData);

            const tracksData = await getTopTracks(token);
            setTracks(tracksData);

            const artistsData = await getTopArtists(token);
            setArtists(artistsData);
            if (tracksData && artistsData) {
            const result = getPersonalityType(tracksData, artistsData);
            console.log(result);
        }

            const result = getPersonalityType(tracksData, artistsData);
            console.log(result);
        }
        fetchData();
    }, []);

    console.log(profile, tracks, artists);

        return(
            <div>
                results coming soon...
            </div>
        );
}

export default Result;