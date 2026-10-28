import { useState } from "react";
import "./Employees.css";

const initialEmployees = [
  { id: "EMP001", name: "Priya Kumar", department: "HR", role: "HR Executive", email: "priya@example.com" },
  { id: "EMP002", name: "Arun Raj", department: "IT", role: "Frontend Developer", email: "arun@example.com" },
  { id: "EMP003", name: "Divya S", department: "Finance", role: "Accountant", email: "divya@example.com" },
  { id: "EMP004", name: "Karthik M", department: "Marketing", role: "Marketing Executive", email: "karthik@example.com" },
  { id: "EMP005", name: "Meena R", department: "IT", role: "Backend Developer", email: "meena@example.com" },
];

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    email: "",
  });

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.id} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addEmployee(event) {
    event.preventDefault();

    setEmployees((old) => [
      ...old,
      {
        ...form,
        id: `EMP${String(old.length + 1).padStart(3, "0")}`,
      },
    ]);

    setForm({ name: "", department: "", role: "", email: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-heading employee-heading" data-aos="fade-down">
        <div>
          <h2>Employees</h2>
          <p>Manage your employee information.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Employee
        </button>
      </div>

      {showForm && (
        <form className="content-card mb-4" onSubmit={addEmployee}>
          <h5>Add New Employee</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Employee name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Department"
                required
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Designation"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3" type="submit">
            Save Employee
          </button>
        </form>
      )}

      <div className="content-card" data-aos="fade-up">
        <div className="employee-toolbar">
          <h5>Employee Directory ({filteredEmployees.length})</h5>
          <input
            className="form-control employee-search"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="action-btn reject-btn"
                      onClick={() =>
                        setEmployees((old) =>
                          old.filter((item) => item.id !== employee.id)
                        )
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No employees found.
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

export default Employees;