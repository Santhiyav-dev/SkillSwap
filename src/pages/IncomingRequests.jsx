import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getRequestsReceivedBy,
  STORAGE_KEYS,
  updateRequestStatus,
} from "../data/skills";
import "./IncomingRequests.css";

function formatRequestDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
}

function IncomingRequests() {
  const [requests, setRequests] = useState(() => getRequestsReceivedBy(getCurrentUser().id));
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const syncRequests = (event) => {
      if (
        !event ||
        event.key === null ||
        event.key === STORAGE_KEYS.requests ||
        event.key === STORAGE_KEYS.profile
      ) {
        setRequests(getRequestsReceivedBy(getCurrentUser().id));
      }
    };

    window.addEventListener("storage", syncRequests);
    return () => window.removeEventListener("storage", syncRequests);
  }, []);

  const respondToRequest = (requestId, status) => {
    try {
      const result = updateRequestStatus(requestId, getCurrentUser().id, status);
      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setRequests(result.requests.filter((request) => request.receiverId === getCurrentUser().id));
      setFeedback(`Request ${status.toLowerCase()} successfully.`);
    } catch {
      setFeedback("The request could not be updated. Please try again.");
    }
  };

  return (
    <div className="incoming-page">
      <div className="page-header">
        <div>
          <h1>Incoming requests</h1>
          <p>Review learners who are interested in the skills you offer and respond quickly.</p>
        </div>
      </div>

      {feedback && <p className="request-feedback" role="status">{feedback}</p>}

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
                  <span className="request-label">Requested skill</span>
                  <h2>{request.skillTitle}</h2>
                </div>
                <span className={`status-pill ${request.status.toLowerCase()}`}>{request.status}</span>
              </div>

              <div className="request-person">
                <strong>{request.senderName}</strong>
                <span>{formatRequestDate(request.createdAt)}</span>
              </div>

              <p className="request-message">{request.message || "No message provided."}</p>

              {request.status === "Pending" && (
                <div className="card-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => respondToRequest(request.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => respondToRequest(request.id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncomingRequests;
