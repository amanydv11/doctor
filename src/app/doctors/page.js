"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ city: "", specialization: "", rating: "" });

  const fetchDoctors = async () => {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.specialization) params.append("specialization", filters.specialization);
    if (filters.rating) params.append("rating", filters.rating);

    const res = await fetch(`/api/doctors?${params.toString()}`);
    const data = await res.json();
    setDoctors(data.doctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Find Top Doctors - Book Appointments</title>
        <meta name="description" content="Browse top-rated doctors by city and specialization. Book appointments easily." />
        <meta name="keywords" content="doctors, find doctors, book doctor appointment, doctor in your city" />
        <meta name="robots" content="index, follow" />
      </Head>

      <header className="p-4 bg-blue-600 text-white text-center text-2xl font-bold">
        Doctor Directory
      </header>

      <section className="p-4 grid gap-4 md:grid-cols-4">
        <div className="col-span-1 space-y-4">
          <h2 className="text-xl font-semibold">Filters</h2>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={filters.specialization}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />

          <input
            type="number"
            name="rating"
            placeholder="Min Rating"
            value={filters.rating}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>

        <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.length ? (
            doctors.map((doctor) => (
              <div key={doctor._id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={doctor.image || "/default-doctor.jpg"}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{doctor.name}</h3>
                <p className="text-sm text-gray-700">{doctor.specialization} in {doctor.city}</p>
                <p className="text-sm">Experience: {doctor.experience} years</p>
                <p className="text-sm">Rating: {doctor.rating}</p>
                <p className="text-sm">Fee: ₹{doctor.consultFee}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No doctors found with selected filters.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;