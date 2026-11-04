import { useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_REQUESTS, readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState(() => readStorage(STORAGE_KEYS.requests, DEFAULT_REQUESTS));

  const cancelRequest = (id) => {
    const updated = requests.filter((request) => request.id !== id);
    setRequests(updated);
    writeStorage(STORAGE_KEYS.requests, updated);
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
                  <strong>Your name:</strong> {request.learnerName}
                </p>
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
                <p>
                  <strong>Requested on:</strong> {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>

              {request.status === "Pending" && (
                <button type="button" className="danger-btn request-action" onClick={() => cancelRequest(request.id)}>
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
