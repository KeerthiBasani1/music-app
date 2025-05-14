import { useEffect, useState } from "react";
import { getUserCity } from "./utils/geolocation";
import { getBandsByCity } from "./utils/musicbrainz";
import BandList from "./components/BandList";

function App() {
  const [city, setCity] = useState("");
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    const fetchBandsFromLocation = async () => {
      setLoading(true);
      const userCity = await getUserCity();
      setCity(userCity);
      const results = await getBandsByCity(userCity);
      setBands(results);
      setLoading(false);
    };
    fetchBandsFromLocation();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!manualInput) return;
    setLoading(true);
    setCity(manualInput);
    const results = await getBandsByCity(manualInput);
    setBands(results);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bands Founded in Last 10 Years</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="Enter a city"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>

      <h2 className="text-lg mb-2">Showing results for: {city}</h2>
      {loading ? <p>Loading...</p> : <BandList bands={bands} />}
    </div>
  );
}

export default App;

