import { useSearchParams, useNavigate } from "react-router"
import { exchangeCodeForToken } from './auth'
import { useEffect } from "react";

function Callback(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get('code');


    useEffect(() => {
        const verifier = sessionStorage.getItem("code_verifier");
        // call exchangeCodeForToken(code, verifier)
        // save the token
        exchangeCodeForToken(code, verifier).then((token) => {
        sessionStorage.setItem("access_token", token);
        navigate("/result");
    });
        // navigate("/result")
        navigate("/result");
    }, []);

    return(
        <div>Loading...</div>
    );
}
export default Callback