import { useEffect, useState } from "react";
import { getProfile, getTopTracks, getTopArtists } from "./spotify";
import { getPersonalityType } from "./personality";

function Result() {
    const [profile, setProfile] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [artists, setArtists] = useState(null);
    const [result, setResult] = useState(null);

    const token = sessionStorage.getItem("access_token");

    useEffect(() => {
        async function fetchData() {
            const profileData = await getProfile(token);
            setProfile(profileData);

            const tracksData = await getTopTracks(token);
            setTracks(tracksData);

            const artistsData = await getTopArtists(token);
            setArtists(artistsData);

            if (tracksData && artistsData) {
                const result = getPersonalityType(tracksData, artistsData);
                setResult(result);
            }
        }
        fetchData();
    }, []);

    // STYLING MODE — dummy data (delete this section when done)
    const dummyResult = { quadrant: "Aesthetic Recluse", modifier: "Genre Hermit" };
    const dummyProfile = { display_name: "Komal" };
    const dummyTracks = [
        { name: "Brooklynbloodpop!", artists: [{ name: "SyKo" }] },
        { name: "Vacation Bible", artists: [{ name: "Stady" }] },
        { name: "school - Slowed", artists: [{ name: "bradybean" }] },
        { name: "Chaar Din", artists: [{ name: "Sandeep Brar" }] },
        { name: "Freak", artists: [{ name: "Doja Cat" }] },
    ];

    // Use dummy data for now, swap to real later
    const displayResult = result || dummyResult;
    const displayProfile = profile || dummyProfile;
    const displayTracks = tracks || dummyTracks;

    return (
        <div className="min-h-screen w-full bg-[#D9D3C5]/80 flex flex-col items-center justify-center p-8">
            <div className="max-w-2xl w-full text-center">
                <p>✦ your top tracks</p>
                <h1 className="font-['NewRomantics'] text-8xl text-[#848668] underline">{displayResult.quadrant}</h1>
                <h2 className="text-3xl text-[#939477] mt-4 font-['Aclonica'] mt-8">{displayResult.modifier}</h2>
                <p className="text-xl mt-2 text-[#252629] font-mono">{displayProfile.display_name}Komal</p>

                <div className="mt-8">
                    {displayTracks.slice(0, 5).map((track, i) => (
                        <p key={i} className="text-lg mt-2 text-[#252629]">
                            {track.name} — {track.artists?.[0]?.name || "Unknown"}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Result;