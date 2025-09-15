import React from "react";

export default function Routing() {
  const stores = [
    { name: "Pharmacy name", card: 1229 },
    { name: "Pharmacy name", card: 1225 },
  ];

  const doctors = [
    { name: "Dr name", card: 1229 },
    { name: "Dr name", card: 1225 },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Routing Stores</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th>Store name</th>
              <th>Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s, i) => (
              <tr key={i} className="border-t">
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.card}</td>
                <td>
                  <button className="text-green-600">✔</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Routing Doctors</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>#</th>
              <th>Doctor name</th>
              <th>Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d, i) => (
              <tr key={i} className="border-t">
                <td>{i + 1}</td>
                <td>{d.name}</td>
                <td>{d.card}</td>
                <td>
                  <button className="text-green-600">✔</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
