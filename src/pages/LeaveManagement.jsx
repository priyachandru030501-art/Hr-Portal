import { useState } from "react";
import "./LeaveManagement.css";

const initialLeaves = [
  { id: 1, name: "Priya Kumar", type: "Casual Leave", from: "2026-10-29", to: "2026-10-30", days: 2, status: "Pending" },
  { id: 2, name: "Arun Raj", type: "Sick Leave", from: "2026-10-28", to: "2026-10-28", days: 1, status: "Approved" },
  { id: 3, name: "Divya S", type: "Personal Leave", from: "2026-11-02", to: "2026-11-03", days: 2, status: "Pending" },
  { id: 4, name: "Karthik M", type: "Casual Leave", from: "2026-10-20", to: "2026-10-20", days: 1, status: "Rejected" },
];

function LeaveManagement() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filter, setFilter] = useState("All");

  function updateLeave(id, status) {
    setLeaves((old) =>
      old.map((leave) => (leave.id === id ? { ...leave, status } : leave))
    );
  }

  const filteredLeaves = leaves.filter(
    (leave) => filter === "All" || leave.status === filter
  );

  return (
    <div>
      <div className="page-heading" data-aos="fade-down">
        <h2>Leave Management</h2>
        <p>Review and manage employee leave requests.</p>
      </div>

      <div className="row g-3 mb-4">
        {[
          ["Total Requests", leaves.length],
          ["Pending", leaves.filter((l) => l.status === "Pending").length],
          ["Approved", leaves.filter((l) => l.status === "Approved").length],
        ].map(([title, value], index) => (
          <div
            className="col-md-4"
            key={title}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="stat-card">
              <p>{title}</p>
              <h3>{value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card" data-aos="fade-up">
        <div className="leave-toolbar">
          <h5>Leave Requests</h5>

          <select
            className="form-select leave-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.name}</td>
                  <td>{leave.type}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.days}</td>
                  <td>
                    <span
                      className={`status-badge status-${leave.status.toLowerCase()}`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() => updateLeave(leave.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => updateLeave(leave.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-secondary">Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredLeaves.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveManagement;