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

    if (!profile || !tracks || !result ||artists) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D9D3C5]/80 text-[#848668]">
            Loading…
        </div>
    );
}

const displayResult = result;
const displayProfile = profile;
const displayTracks = tracks;

    return (
        <div className="min-h-screen w-full bg-[#D9D3C5]/80 flex flex-col items-center p-4 md:p-8 overflow-x-hidden">
        <div className="w-full max-w-md md:bg-[#E8E4D8] md:rounded-[2rem] md:shadow-xl md:p-6 md:my-10 overflow-hidden">

            {/*title, modifier, description, profile, stats */}
            <div className="max-w-2xl w-full text-center">
                    <h1 className="font-['NewRomantics'] text-5xl text-[#848668] underline">{displayResult.quadrant}</h1>
                    <h2 className="text-3xl text-[#939477] font-['Aclonica'] mt-8">{displayResult.modifier}</h2>
                    <p className="text-sm text-[#848668] mt-4 max-w-sm mx-auto italic">
                        "{displayResult.description}"
                    </p>
                <div className="flex items-center justify-center gap-4 mt-4 bg-[#A3A88B] rounded-2xl w-fit mx-auto">
                    <img
                        src={displayProfile.images?.[0]?.url || "https://via.placeholder.com/48"}
                        alt={displayProfile.display_name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <p className="text-md text-[#090B10] text-mono tracking-wider uppercase pr-4">
                        {displayProfile.display_name}
                    </p>
                </div>
                <div className="flex justify-center gap-6 mt-6">
                    <div>
                        <p className="text-2xl font-bold text-[#848668]">12</p>
                        <p className="text-xs text-[#252629]">genres</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#848668]">34</p>
                        <p className="text-xs text-[#252629]">avg popularity</p>
                    </div>
                </div>
                <p className="text-lg mt-2 text-[#252629] font-serif pt-5">✦ your top tracks</p>
            </div>

                    {/* PLAYER STAGE */}
            <div className="relative w-full max-w-md mx-auto mt-6 overflow-hidden">

                    {/* Vinyl group */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-28 w-72 aspect-square">
                <div className="absolute -inset-5 -rotate-45">
                    <div className="absolute inset-0 rounded-full border-[5px] border-transparent border-r-[#B9B8AC]" />
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#848668]" />
                </div>
                <img src="/vinyl.png" alt="" className="relative w-full" />
                {displayProfile.images?.[0]?.url && (
                    <img
                        src={displayProfile.images[0].url}
                        alt=""
                        className="absolute inset-0 m-auto w-[30%] aspect-square rounded-full object-cover grayscale"
                    />
                )}
            </div>

                {/* Play / pause (decoration) */}
            <div className="absolute bottom-3 left-3 z-20 flex items-end gap-2">
                <div className="w-11 h-11 rounded-xl bg-[#A3A88B] border-2 border-[#F1EFE6] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F1EFE6]"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#A3A88B] border-2 border-[#F1EFE6] flex items-center justify-center -translate-y-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F1EFE6]"><path d="M8 5v14l11-7z" /></svg>
                </div>
            </div>

                {/* Tracks */}
            <div className="relative z-10 ml-auto w-[56%] py-10 flex flex-col gap-2.5">
                {displayTracks.slice(0, 5).map((track, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-[#A3A88B] rounded-xl p-2">
                        <img src={track.album?.images?.[0]?.url} alt={track.name} className="w-11 h-11 rounded-md object-cover shrink-0" />
                        <div className="min-w-0">
                            <p className="text-white text-sm font-bold line-clamp-1">{track.name}</p>
                            <p className="text-white/70 text-[11px] uppercase line-clamp-1">{track.artists?.[0]?.name || "Unknown"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

                {/* Pill bar */}
        <div className="w-full max-w-md mx-auto mt-6 flex items-center gap-3 bg-[#A3A88B] rounded-full pl-4 pr-1.5 py-1.5">
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-none stroke-[#F1EFE6] stroke-[2.5]"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
            <p className="flex-1 bg-[#F1EFE6] rounded-full px-4 py-2 text-xs font-bold uppercase text-[#848668] truncate">
                {displayProfile.display_name}’s sound, in melodies
            </p>
        </div>
    </div>
    </div>
                    
);
}

export default Result;
