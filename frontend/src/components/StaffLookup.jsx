import { useState } from "react";
import { searchWaiver } from "../api/waiverApi";
import WaiverResultCard from "./WaiverResultCard";

function StaffLookup() {
  // Store the selected search type and entered search value.
  const [searchType, setSearchType] = useState("code");
  const [searchValue, setSearchValue] = useState("");

  // Store either multiple search results or one confirmation code result.
  const [waivers, setWaivers] = useState([]);
  const [singleWaiver, setSingleWaiver] = useState(null);

  // Track error messages and loading status.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Clear previous search results and errors.
  function resetResults() {
    setWaivers([]);
    setSingleWaiver(null);
    setError("");
  }

  // Clear the search field and all displayed results.
  function clearResults() {
    setSearchValue("");
    resetResults();
  }

  // Submit the search request to the backend.
  async function handleLookup(event) {
    event.preventDefault();

    resetResults();
    setLoading(true);

    try {
      const data = await searchWaiver(searchType, searchValue);

      // Confirmation code searches return one waiver.
      if (searchType === "code") {
        setSingleWaiver(data);
        return;
      }

      // Last name searches may return an empty result list.
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

      // Staff waiver search form.
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

      // Display the loading message while searching.
      {loading && <div className="loading-box">Searching waivers...</div>}

      // Display an error when no waiver is found.
      {error && <div className="error-box">{error}</div>}

      // Show the clear button when results are available.
      {(singleWaiver || waivers.length > 0) && (
        <button type="button" className="clear-button" onClick={clearResults}>
          Clear Results
        </button>
      )}

      // Display a single confirmation code result.
      {singleWaiver && <WaiverResultCard waiver={singleWaiver} />}

      // Display all matching last name results.
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