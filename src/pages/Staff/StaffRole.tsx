export default function StaffRole() {
  // Assuming you have an array of staff objects with name, role, description and instructions properties
  const staff = [
    {
      name: "Alice",
      role: "Receptionist",
      description:
        "The receptionist is responsible for greeting the guests, checking them in and out, and handling their queries and complaints.",
      instructions:
        "You need to be friendly, polite, and helpful to the guests. You also need to keep track of the room availability, payments, and bookings. You should report any issues or problems to the manager.",
    },
  ]

  return (
    <div>
      <h1>Staff Work Role</h1>
      <p>Role description, and individual work instructions.</p>
      {staff.map((s) => (
        <div key={s.name}>
          <h2>
            {s.name} - {s.role}
          </h2>
          <p>{s.description}</p>
          <p>
            <strong>Work Instructions:</strong> {s.instructions}
          </p>
        </div>
      ))}
    </div>
  )
}
