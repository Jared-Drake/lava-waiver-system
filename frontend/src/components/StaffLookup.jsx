import { useState } from "react";
import { searchWaiver } from "../api/waiverApi";
import WaiverResultCard from "./WaiverResultCard";

function StaffLookup() {
  const [searchType, setSearchType] = useState("code");
  const [searchValue, setSearchValue] = useState("");
  const [waivers, setWaivers] = useState([]);
  const [singleWaiver, setSingleWaiver] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function resetResults() {
    setWaivers([]);
    setSingleWaiver(null);
    setError("");
  }

  function clearResults() {
    setSearchValue("");
    resetResults();
  }

  async function handleLookup(event) {
    event.preventDefault();

    resetResults();
    setLoading(true);

    try {
      const data = await searchWaiver(searchType, searchValue);

      if (searchType === "code") {
        setSingleWaiver(data);
        return;
      }

      if (data.length === 0) {
        setError(
          "No waivers found. Try searching by confirmation code or a different last name."
        );
        return;
      }

      setWaivers(data);
    } catch {
      setError("No waiver found for that search.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-section">
      <div className="section-title">Staff Waiver Lookup</div>

      <form onSubmit={handleLookup} className="lookup-form">
        <label>
          Search Type
          <select
            value={searchType}
            onChange={(event) => {
              setSearchType(event.target.value);
              setSearchValue("");
              resetResults();
            }}
          >
            <option value="code">Confirmation Code</option>
            <option value="parent">Parent Last Name</option>
            <option value="participant">Participant Last Name</option>
          </select>
        </label>

        <label>
          Search Value
          <input
            value={searchValue}
            onChange={(event) =>
              setSearchValue(
                searchType === "code"
                  ? event.target.value.toUpperCase()
                  : event.target.value
              )
            }
            placeholder={
              searchType === "code" ? "Example: LIW-8F3A92" : "Example: Drake"
            }
          />
        </label>

        <button type="submit" disabled={loading || searchValue.trim() === ""}>
          {loading ? "Searching..." : "Search Waivers"}
        </button>
      </form>

      {loading && <div className="loading-box">Searching waivers...</div>}

      {error && <div className="error-box">{error}</div>}

      {(singleWaiver || waivers.length > 0) && (
        <button type="button" className="clear-button" onClick={clearResults}>
          Clear Results
        </button>
      )}

      {singleWaiver && <WaiverResultCard waiver={singleWaiver} />}

      {waivers.length > 0 && (
        <div className="results-list">
          <h2>{waivers.length} Result(s) Found</h2>

          {waivers.map((waiver) => (
            <WaiverResultCard key={waiver.id} waiver={waiver} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StaffLookup;