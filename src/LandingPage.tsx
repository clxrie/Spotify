import loginWithSpotify from "./auth";
function LandingPage(){



    return(
        <div>
            <h1 className="">Spotify</h1>
            <button className="bg-green-500 text-white px-6 py-3 rounded-full font-bold"
                    onClick={loginWithSpotify}>
                    Connect Spotify
            </button>
        </div>
    );
}
export default LandingPage