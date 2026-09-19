import { BrowserRouter, Routes, Route } from "react-router"
import LandingPage from "./LandingPage"
import Callback from "./Callback"
import Result from "./Result"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
