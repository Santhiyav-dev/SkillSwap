import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentUser,
  getRequestsSentBy,
  STORAGE_KEYS,
  updateRequestStatus,
} from "../data/skills";
import "./MyRequests.css";

function formatRequestDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
}

function MyRequests() {
  const [requests, setRequests] = useState(() => getRequestsSentBy(getCurrentUser().id));
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const syncRequests = (event) => {
      if (
        !event ||
        event.key === null ||
        event.key === STORAGE_KEYS.requests ||
        event.key === STORAGE_KEYS.profile
      ) {
        setRequests(getRequestsSentBy(getCurrentUser().id));
      }
    };

    window.addEventListener("storage", syncRequests);
    return () => window.removeEventListener("storage", syncRequests);
  }, []);

  const cancelRequest = (requestId) => {
    try {
      const result = updateRequestStatus(requestId, getCurrentUser().id, "Cancelled");
      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setRequests(result.requests.filter((request) => request.senderId === getCurrentUser().id));
      setFeedback("Request cancelled. Its history remains available.");
    } catch {
      setFeedback("The request could not be cancelled. Please try again.");
    }
  };

  return (
    <div className="my-requests-page">
      <div className="page-header">
        <div>
          <h1>My requests</h1>
          <p>Track the skills you are learning, along with the status of each exchange request.</p>
        </div>
      </div>

      <div className="requests-summary">
        <strong>{requests.length}</strong>
        <span>total request(s)</span>
      </div>

      {feedback && <p className="request-feedback" role="status">{feedback}</p>}

      {requests.length === 0 ? (
        <div className="empty-state">
          <h2>No learning requests yet</h2>
          <p>Explore the community and send your first request to learn something valuable.</p>
          <Link to="/explore" className="primary-btn">
            Explore skills
          </Link>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <article className="request-card" key={request.id}>
              <div className="request-card-head">
                <div>
                  <span className="request-scope">Skill</span>
                  <h2>{request.skillTitle}</h2>
                </div>
                <span className={`status-pill ${request.status.toLowerCase()}`}>{request.status}</span>
              </div>

              <div className="request-body">
                <p>
                  <strong>Skill owner:</strong> {request.receiverName}
                </p>
                <p>
                  <strong>Message:</strong> {request.message || "No message provided."}
                </p>
                <p>
                  <strong>Requested on:</strong> {formatRequestDate(request.createdAt)}
                </p>
              </div>

              {request.status === "Pending" && (
                <button
                  type="button"
                  className="danger-btn request-action"
                  onClick={() => cancelRequest(request.id)}
                >
                  Cancel request
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;
