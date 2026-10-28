import "./Dashboard.css";

const stats = [
  {
    title: "Total Employees",
    value: "120",
    icon: "bi-people",
    color: "#dbeafe",
    textColor: "#2563eb",
    note: "+8 this month",
  },
  {
    title: "Present Today",
    value: "105",
    icon: "bi-person-check",
    color: "#dcfce7",
    textColor: "#16a34a",
    note: "87.5% attendance",
  },
  {
    title: "On Leave",
    value: "7",
    icon: "bi-calendar2-week",
    color: "#fef3c7",
    textColor: "#d97706",
    note: "Across departments",
  },
  {
    title: "Pending Requests",
    value: "8",
    icon: "bi-hourglass-split",
    color: "#f3e8ff",
    textColor: "#9333ea",
    note: "Needs review",
  },
];

const employees = [
  { name: "Priya Kumar", role: "HR Executive", department: "HR", status: "Present" },
  { name: "Arun Raj", role: "Frontend Developer", department: "IT", status: "Present" },
  { name: "Divya S", role: "Accountant", department: "Finance", status: "On Leave" },
  { name: "Karthik M", role: "Marketing Executive", department: "Marketing", status: "Absent" },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-heading" data-aos="fade-down">
        <h2>Dashboard</h2>
        <p>Welcome back! Here's your HR overview.</p>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div
            className="col-12 col-sm-6 col-xl-3"
            key={stat.title}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="stat-card">
              <div
                className="stat-icon"
                style={{
                  background: stat.color,
                  color: stat.textColor,
                }}
              >
                <i className={`bi ${stat.icon}`}></i>
              </div>

              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
              <div className="stat-note">{stat.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card" data-aos="fade-up">
        <h5>Recent Employee Overview</h5>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.name}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        employee.status === "Present"
                          ? "status-present"
                          : employee.status === "Absent"
                          ? "status-absent"
                          : "status-pending"
                      }`}
                    >
                      {employee.status}
                    </span>
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

export default Dashboard;