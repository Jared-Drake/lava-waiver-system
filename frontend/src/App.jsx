import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("waiver");

  return (
    <main className="page">
      <section className="card">
        <div className="header">
          <p className="eyebrow">Lava Island</p>
          <h1>Digital Waiver System</h1>
          <p className="subtitle">
            Guests can submit waivers, and staff can look them up using a
            confirmation code.
          </p>
        </div>

        <div className="tabs">
          <button
            className={activePage === "waiver" ? "tab active-tab" : "tab"}
            onClick={() => setActivePage("waiver")}
          >
            Guest Waiver
          </button>

          <button
            className={activePage === "lookup" ? "tab active-tab" : "tab"}
            onClick={() => setActivePage("lookup")}
          >
            Staff Lookup
          </button>
        </div>

        {activePage === "waiver" ? <WaiverForm /> : <StaffLookup />}
      </section>
    </main>
  );
}

function WaiverForm() {
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    participantFirstName: "",
    participantLastName: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedWaiver, setSubmittedWaiver] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setSubmittedWaiver(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/waivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setErrors(data);
        return;
      }

      setSubmittedWaiver(data);

      setFormData({
        parentFirstName: "",
        parentLastName: "",
        email: "",
        phone: "",
        participantFirstName: "",
        participantLastName: "",
        agreedToTerms: false,
      });
    } catch (error) {
      setErrors({
        general: "Something went wrong. Make sure the backend is running.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {submittedWaiver && (
        <div className="success-box">
          <h2>Waiver Submitted Successfully</h2>

          <p className="success-message">
            Staff can search your waiver by name or confirmation code.
          </p>

          <div className="success-name-display">
            {submittedWaiver.parentFirstName} {submittedWaiver.parentLastName}
          </div>

          <div className="success-details">
            <p>
              <strong>Participant:</strong> {submittedWaiver.participantFirstName}{" "}
              {submittedWaiver.participantLastName}
            </p>
            <p>
              <strong>Expires:</strong> {submittedWaiver.expiresAt}
            </p>
            <p>
              <strong>Confirmation Code:</strong> {submittedWaiver.confirmationCode}
            </p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setSubmittedWaiver(null)}
          >
            Submit Another Waiver
          </button>
        </div>
      )}

      {errors.general && <div className="error-box">{errors.general}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="section-title">Parent / Guardian Information</div>

        <div className="grid">
          <label>
            Parent First Name
            <input
              name="parentFirstName"
              value={formData.parentFirstName}
              onChange={handleChange}
            />
            {errors.parentFirstName && <span>{errors.parentFirstName}</span>}
          </label>

          <label>
            Parent Last Name
            <input
              name="parentLastName"
              value={formData.parentLastName}
              onChange={handleChange}
            />
            {errors.parentLastName && <span>{errors.parentLastName}</span>}
          </label>
        </div>

        <div className="grid">
          <label>
            Email
            <input name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </label>

          <label>
            Phone
            <input name="phone" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span>{errors.phone}</span>}
          </label>
        </div>

        <div className="section-title">Participant Information</div>

        <div className="grid">
          <label>
            Participant First Name
            <input
              name="participantFirstName"
              value={formData.participantFirstName}
              onChange={handleChange}
            />
            {errors.participantFirstName && (
              <span>{errors.participantFirstName}</span>
            )}
          </label>

          <label>
            Participant Last Name
            <input
              name="participantLastName"
              value={formData.participantLastName}
              onChange={handleChange}
            />
            {errors.participantLastName && (
              <span>{errors.participantLastName}</span>
            )}
          </label>
        </div>

        <div className="agreement">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
            />
            <span>
              I confirm that the information provided is accurate and that I agree to
              the Lava Island waiver terms.
            </span>
          </label>

          {errors.agreedToTerms && <span>{errors.agreedToTerms}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Waiver"}
        </button>
      </form>
    </>
  );
}

function StaffLookup() {
  const [searchType, setSearchType] = useState("code");
  const [searchValue, setSearchValue] = useState("");
  const [waivers, setWaivers] = useState([]);
  const [singleWaiver, setSingleWaiver] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup(event) {
    event.preventDefault();

    setWaivers([]);
    setSingleWaiver(null);
    setError("");
    setLoading(true);

    try {
      let url = "";

      if (searchType === "code") {
        url = `http://localhost:8080/api/waivers/code/${searchValue}`;
      } else if (searchType === "parent") {
        url = `http://localhost:8080/api/waivers/search/parent?lastName=${searchValue}`;
      } else {
        url = `http://localhost:8080/api/waivers/search/participant?lastName=${searchValue}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        setError("No waiver found for that search.");
        return;
      }

      const data = await response.json();

      if (searchType === "code") {
        setSingleWaiver(data);
      } else {
        if (data.length === 0) {
          setError("No waivers found for that name.");
          return;
        }

        setWaivers(data);
      }
    } catch (error) {
      setError("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "N/A";
    }

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function renderWaiverCard(waiver) {
    return (
      <div className="waiver-result" key={waiver.id}>
        <div className="waiver-card-header">
          <div>
            <h2>
              {waiver.participantFirstName} {waiver.participantLastName}
            </h2>
            <p className="waiver-code">{waiver.confirmationCode}</p>
          </div>

          <span className={waiver.active ? "status valid" : "status invalid"}>
            {waiver.active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="waiver-info-grid">
          <div className="info-item">
            <span className="info-label">Parent / Guardian</span>
            <span className="info-value">
              {waiver.parentFirstName} {waiver.parentLastName}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Participant</span>
            <span className="info-value">
              {waiver.participantFirstName} {waiver.participantLastName}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{waiver.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{waiver.phone}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Signed</span>
            <span className="info-value">{formatDate(waiver.signedAt)}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Expires</span>
            <span className="info-value">{formatDate(waiver.expiresAt)}</span>
          </div>
        </div>
      </div>
    );
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
              setError("");
              setWaivers([]);
              setSingleWaiver(null);
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
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={
              searchType === "code"
                ? "Example: LIW-8F3A92"
                : "Example: Drake"
            }
          />
        </label>

        <button type="submit" disabled={loading || searchValue.trim() === ""}>
          {loading ? "Searching..." : "Search Waivers"}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {singleWaiver && renderWaiverCard(singleWaiver)}

      {waivers.length > 0 && (
        <div className="results-list">
          <h2>{waivers.length} Result(s) Found</h2>
          {waivers.map((waiver) => renderWaiverCard(waiver))}
        </div>
      )}
    </div>
  );
}

export default App;