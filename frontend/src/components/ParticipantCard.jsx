function ParticipantCard({
  participant,
  index,
  canRemove,
  onParticipantChange,
  onRemove,
}) {
  return (
    <div className="participant-card">
      <div className="participant-header">
        <h3>Participant {index + 1}</h3>

        {canRemove && (
          <button
            type="button"
            className="remove-button"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid">
        <label>
          First Name
          <input
            name="firstName"
            value={participant.firstName}
            onChange={(event) => onParticipantChange(index, event)}
            maxLength="50"
          />
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            value={participant.lastName}
            onChange={(event) => onParticipantChange(index, event)}
            maxLength="50"
          />
        </label>
      </div>

      <label>
        Date of Birth
        <input
          type="date"
          name="dateOfBirth"
          value={participant.dateOfBirth}
          onChange={(event) => onParticipantChange(index, event)}
          max={new Date().toISOString().split("T")[0]}
        />
      </label>
    </div>
  );
}

export default ParticipantCard;