import { useState } from "react";
import "./Payroll.css";

const initialPayroll = [
  { id: "EMP001", name: "Priya Kumar", department: "HR", salary: 35000, deductions: 2000, status: "Paid" },
  { id: "EMP002", name: "Arun Raj", department: "IT", salary: 45000, deductions: 3000, status: "Paid" },
  { id: "EMP003", name: "Divya S", department: "Finance", salary: 30000, deductions: 1500, status: "Pending" },
  { id: "EMP004", name: "Karthik M", department: "Marketing", salary: 32000, deductions: 2000, status: "Paid" },
  { id: "EMP005", name: "Meena R", department: "IT", salary: 42000, deductions: 2500, status: "Pending" },
];

function Payroll() {
  const [records, setRecords] = useState(initialPayroll);
  const [search, setSearch] = useState("");

  const filtered = records.filter((record) =>
    `${record.name} ${record.id} ${record.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalSalary = records.reduce(
    (sum, record) => sum + record.salary,
    0
  );

  const totalPaid = records.filter(
    (record) => record.status === "Paid"
  ).length;

  function markPaid(id) {
    setRecords((old) =>
      old.map((record) =>
        record.id === id ? { ...record, status: "Paid" } : record
      )
    );
  }

  return (
    <div>
      <div className="page-heading" data-aos="fade-down">
        <h2>Payroll</h2>
        <p>View employee salaries and payment status.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4" data-aos="fade-up">
          <div className="stat-card">
            <p>Total Monthly Salary</p>
            <h3>₹{totalSalary.toLocaleString("en-IN")}</h3>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="stat-card">
            <p>Employees Paid</p>
            <h3>{totalPaid}</h3>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="stat-card">
            <p>Pending Payments</p>
            <h3>{records.length - totalPaid}</h3>
          </div>
        </div>
      </div>

      <div className="content-card" data-aos="fade-up">
        <div className="payroll-toolbar">
          <h5>Salary Records</h5>

          <input
            className="form-control payroll-search"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>Deductions</th>
                <th>Net Salary</th>
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
                  <td>₹{record.salary.toLocaleString("en-IN")}</td>
                  <td>₹{record.deductions.toLocaleString("en-IN")}</td>
                  <td>
                    <strong>
                      ₹{(record.salary - record.deductions).toLocaleString("en-IN")}
                    </strong>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        record.status === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td>
                    {record.status === "Pending" ? (
                      <button
                        className="action-btn payroll-pay-btn"
                        onClick={() => markPaid(record.id)}
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className="text-secondary">Completed</span>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No payroll records found.
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

export default Payroll;