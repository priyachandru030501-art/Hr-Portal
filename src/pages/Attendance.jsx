import { useState } from "react";
import "./Attendance.css";

const initialAttendance = [
  { id: "EMP001", name: "Priya Kumar", department: "HR", in: "09:10 AM", out: "06:00 PM", status: "Present" },
  { id: "EMP002", name: "Arun Raj", department: "IT", in: "09:25 AM", out: "06:05 PM", status: "Present" },
  { id: "EMP003", name: "Divya S", department: "Finance", in: "--", out: "--", status: "Absent" },
  { id: "EMP004", name: "Karthik M", department: "Marketing", in: "09:40 AM", out: "--", status: "Present" },
  { id: "EMP005", name: "Meena R", department: "IT", in: "09:05 AM", out: "06:10 PM", status: "Present" },
];

function Attendance() {
  const [records, setRecords] = useState(initialAttendance);
  const [filter, setFilter] = useState("All");

  const filtered = records.filter(
    (record) => filter === "All" || record.status === filter
  );

  function toggleStatus(id) {
    setRecords((old) =>
      old.map((record) =>
        record.id === id
          ? {
              ...record,
              status: record.status === "Present" ? "Absent" : "Present",
              in: record.status === "Present" ? "--" : "09:00 AM",
              out: "--",
            }
          : record
      )
    );
  }

  return (
    <div>
      <div className="page-heading" data-aos="fade-down">
        <h2>Attendance</h2>
        <p>View and manage daily employee attendance.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4" data-aos="fade-up">
          <div className="stat-card">
            <p>Total Employees</p>
            <h3>{records.length}</h3>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="stat-card">
            <p>Present</p>
            <h3>{records.filter((r) => r.status === "Present").length}</h3>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="stat-card">
            <p>Absent</p>
            <h3>{records.filter((r) => r.status === "Absent").length}</h3>
          </div>
        </div>
      </div>

      <div className="content-card" data-aos="fade-up">
        <div className="attendance-toolbar">
          <h5>Attendance Records</h5>

          <select
            className="form-select attendance-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Employees</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.department}</td>
                  <td>{record.in}</td>
                  <td>{record.out}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        record.status === "Present"
                          ? "status-present"
                          : "status-absent"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn attendance-action"
                      onClick={() => toggleStatus(record.id)}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;