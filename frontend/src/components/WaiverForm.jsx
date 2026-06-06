import { useState } from "react";
import { createWaiver } from "../api/waiverApi";
import ParticipantCard from "./ParticipantCard";

const emptyForm = {
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  agreedToTerms: false,
  participants: [
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
  ],
};

function WaiverForm() {
  const [formData, setFormData] = useState(emptyForm);
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

  function handleParticipantChange(index, event) {
    const { name, value } = event.target;

    setFormData((previousData) => {
      const updatedParticipants = [...previousData.participants];

      updatedParticipants[index] = {
        ...updatedParticipants[index],
        [name]: value,
      };

      return {
        ...previousData,
        participants: updatedParticipants,
      };
    });
  }

  function addParticipant() {
    if (formData.participants.length >= 10) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        participants: "A waiver can include up to 10 participants.",
      }));
      return;
    }

    setErrors((previousErrors) => ({
      ...previousErrors,
      participants: "",
    }));

    setFormData((previousData) => ({
      ...previousData,
      participants: [
        ...previousData.participants,
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
        },
      ],
    }));
  }

  function removeParticipant(index) {
    setFormData((previousData) => ({
      ...previousData,
      participants: previousData.participants.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrors({});
    setSubmittedWaiver(null);
    setLoading(true);

    try {
      const data = await createWaiver(formData);

      setSubmittedWaiver(data);
      setFormData(emptyForm);
    } catch (error) {
      setErrors(
        error instanceof Error
          ? { general: "Something went wrong. Make sure the backend is running." }
          : error
      );
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
            <div>
              <strong>Participants:</strong>

              <ul className="success-participant-list">
                {submittedWaiver.participants?.map((participant) => (
                  <li key={participant.id}>
                    {participant.firstName} {participant.lastName}
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Expires:</strong> {submittedWaiver.expiresAt}
            </p>

            <p>
              <strong>Confirmation Code:</strong>{" "}
              {submittedWaiver.confirmationCode}
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
              maxLength="50"
            />
            {errors.parentFirstName && <span>{errors.parentFirstName}</span>}
          </label>

          <label>
            Parent Last Name
            <input
              name="parentLastName"
              value={formData.parentLastName}
              onChange={handleChange}
              maxLength="50"
            />
            {errors.parentLastName && <span>{errors.parentLastName}</span>}
          </label>
        </div>

        <div className="grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength="100"
            />
            {errors.email && <span>{errors.email}</span>}
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength="20"
            />
            {errors.phone && <span>{errors.phone}</span>}
          </label>
        </div>

        <div className="section-title">Participant Information</div>

        <div className="participants-list">
          {formData.participants.map((participant, index) => (
            <ParticipantCard
              key={index}
              participant={participant}
              index={index}
              canRemove={formData.participants.length > 1}
              onParticipantChange={handleParticipantChange}
              onRemove={removeParticipant}
            />
          ))}
        </div>

        {errors.participants && <span>{errors.participants}</span>}

        <button
          type="button"
          className="secondary-button"
          onClick={addParticipant}
          disabled={formData.participants.length >= 10}
        >
          Add Another Participant
        </button>

        <div className="agreement">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
            />

            <span>
              I confirm that the information provided is accurate and that I
              agree to the Lava Island waiver terms.
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

export default WaiverForm;