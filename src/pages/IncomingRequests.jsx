import { useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./IncomingRequests.css";

function IncomingRequests() {
  const [requests, setRequests] = useState(() => readStorage(STORAGE_KEYS.requests, []));

  const updateRequestStatus = (id, nextStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: nextStatus } : request,
    );

    setRequests(updatedRequests);
    writeStorage(STORAGE_KEYS.requests, updatedRequests);
  };

  return (
    <div className="incoming-page">
      <div className="page-header">
        <div>
          <h1>Incoming requests</h1>
          <p>Review learners who are interested in the skills you offer and respond quickly.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          <h2>No incoming requests</h2>
          <p>When someone asks to learn from you, their request will appear here.</p>
        </div>
      ) : (
        <div className="incoming-grid">
          {requests.map((request) => (
            <article className="incoming-card" key={request.id}>
              <div className="incoming-card-top">
                <div>
                  <span className="request-label">Skill</span>
                  <h2>{request.skillTitle}</h2>
                </div>
                <span className={`status-pill ${request.status.toLowerCase()}`}>{request.status}</span>
              </div>

              <div className="request-person">
                <strong>{request.learnerName}</strong>
                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="request-message">{request.message}</p>

              <div className="card-actions">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => updateRequestStatus(request.id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => updateRequestStatus(request.id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncomingRequests;
