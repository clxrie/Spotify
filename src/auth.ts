
async function  loginWithSpotify() {
    // 1. generate random string
    // 2. save it to sessionStorage
    // 3. hash it
    // 4. build the Spotify URL
    // 5. window.location.href = that URL (redirects away)

    const code_verify = new Uint8Array(32);
    crypto.getRandomValues(code_verify);
    const code_verifier = btoa(String.fromCharCode(...new Uint8Array(code_verify)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    sessionStorage.setItem("code_verifier", code_verifier);
    const result = new TextEncoder().encode(code_verifier);
    const code_challenge = await crypto.subtle.digest("SHA-256", result);
    const code_challenge_string = btoa(String.fromCharCode(...new Uint8Array(code_challenge)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

    //4. Building a URL string with your client ID, redirect URI, scope, and the challenge? 
    const client_id = "e00d65ee97384a3f80ed9cfd33a3cf25";
    const redirect_uri = "http://localhost:5173/callback";
    const scope = "user-top-read";

    const params = new URLSearchParams({
        client_id,
        response_type : "code",
        redirect_uri,
        scope,
        code_challenge: code_challenge_string,
        code_challenge_method: "S256",
    });

    window.location.href = 
    `https://accounts.spotify.com/authorize?${params.toString()}`;

    

}

export default loginWithSpotify