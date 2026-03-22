function EmployeeList() {
  const employees = [
    { id: 1, name: "Amit Sharma", role: "Developer" },
    { id: 2, name: "Neha Singh", role: "HR" },
    { id: 3, name: "Rahul Verma", role: "Manager" }
  ];

  return (
    <div>
      <h2>Employee List</h2>
      <table border="1" cellPadding="10">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.role}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default EmployeeList;