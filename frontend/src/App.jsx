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
  });

  const [errors, setErrors] = useState({});
  const [confirmationCode, setConfirmationCode] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setConfirmationCode("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/waivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        return;
      }

      setConfirmationCode(data.confirmationCode);

      setFormData({
        parentFirstName: "",
        parentLastName: "",
        email: "",
        phone: "",
        participantFirstName: "",
        participantLastName: "",
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
      {confirmationCode && (
        <div className="success-box">
          <h2>Waiver Submitted</h2>
          <p>Your confirmation code is:</p>
          <strong>{confirmationCode}</strong>
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
          <p>
            By submitting this form, I confirm that the information provided is
            accurate and that I agree to the Lava Island waiver terms.
          </p>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Waiver"}
        </button>
      </form>
    </>
  );
}

function StaffLookup() {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [waiver, setWaiver] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLookup(event) {
    event.preventDefault();

    setWaiver(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/waivers/code/${confirmationCode}`
      );

      if (!response.ok) {
        setError("No waiver found with that confirmation code.");
        return;
      }

      const data = await response.json();
      setWaiver(data);
    } catch (error) {
      setError("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lookup-section">
      <div className="section-title">Staff Waiver Lookup</div>

      <form onSubmit={handleLookup} className="lookup-form">
        <label>
          Confirmation Code
          <input
            value={confirmationCode}
            onChange={(event) => setConfirmationCode(event.target.value)}
            placeholder="Example: LIW-8F3A92"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Waiver"}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {waiver && (
        <div className="waiver-result">
          <h2>Waiver Found</h2>

          <div className="status-row">
            <span className={waiver.active ? "status valid" : "status invalid"}>
              {waiver.active ? "Active" : "Inactive"}
            </span>
          </div>

          <p>
            <strong>Confirmation Code:</strong> {waiver.confirmationCode}
          </p>
          <p>
            <strong>Parent/Guardian:</strong> {waiver.parentFirstName}{" "}
            {waiver.parentLastName}
          </p>
          <p>
            <strong>Participant:</strong> {waiver.participantFirstName}{" "}
            {waiver.participantLastName}
          </p>
          <p>
            <strong>Email:</strong> {waiver.email}
          </p>
          <p>
            <strong>Phone:</strong> {waiver.phone}
          </p>
          <p>
            <strong>Signed At:</strong> {waiver.signedAt}
          </p>
          <p>
            <strong>Expires At:</strong> {waiver.expiresAt}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;