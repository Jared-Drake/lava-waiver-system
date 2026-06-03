import { formatDate } from "../utils/formatDate";

function WaiverResultCard({ waiver }) {
  return (
    <div className="waiver-result">
      <div className="waiver-card-header">
        <div>
          <h2>
            {waiver.parentFirstName} {waiver.parentLastName}
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

        <div className="info-item participant-info-item">
          <span className="info-label">Participants</span>

          <div className="participants-display-list">
            {waiver.participants?.map((participant) => (
              <div className="participant-display-row" key={participant.id}>
                <span className="info-value">
                  {participant.firstName} {participant.lastName}
                </span>

                <span className="dob-value">
                  DOB: {formatDate(participant.dateOfBirth)}
                </span>
              </div>
            ))}
          </div>
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

export default WaiverResultCard;