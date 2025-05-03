'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar } from "@/components/ui/sidebar";
import DoctorCard from "@/components/DoctorCard";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filters, setFilters] = useState({
    modeofConsultation: [], // match backend key
    feeRange: [],
    language: [],
    experience: [],
  });

  const fetchDoctors = async () => {
    const res = await fetch("/api/doctors");
    const result = await res.json();
    const data = result.doctors || [];
    setDoctors(data);
    setFilteredDoctors(data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCheckboxChange = (filterType, value) => {
    setFilters((prev) => {
      const current = prev[filterType] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterType]: updated };
    });
  };

  const applyFilters = () => {
    setFilteredDoctors(
      doctors.filter((doctor) => {
        const matchesMode =
          filters.modeofConsultation.length === 0 ||
          filters.modeofConsultation.includes(doctor.modeofConsultation);

        const matchesFee =
          filters.feeRange.length === 0 ||
          filters.feeRange.some((range) => {
            const [min, max] = range === "1000+"
              ? [1000, Infinity]
              : range.split("-").map(Number);
            return doctor.consultFee >= min && doctor.consultFee <= max;
          });

          const matchesLanguage =
  filters.language.length === 0 ||
  filters.language.some((lang) =>
    (doctor.language || "")
      .split(",")
      .map((l) => l.trim().toLowerCase())
      .includes(lang.toLowerCase())
  );

        const matchesExperience =
          filters.experience.length === 0 ||
          filters.experience.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return doctor.experience >= min && doctor.experience <= max;
          });

        return matchesMode && matchesFee && matchesLanguage && matchesExperience;
      })
    );
  };

  return (
    <div className="flex">
      <Sidebar className="hidden sm:block mt-30 absolute bg-white border-r border-gray-200 rounded-lg shadow-lg">
        <div className="p-6 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-700">Filters</h3>

          <div className="space-y-4">
            <div>
              <Label className="font-semibold text-sm text-gray-600">Mode of Consult</Label>
              {["Online", "Hospital Visit"].map((mode) => (
                <div key={mode} className="flex items-center gap-3 mt-2">
                  <Checkbox
                    id={mode}
                    checked={filters.modeofConsultation.includes(mode)}
                    onCheckedChange={() => handleCheckboxChange("modeofConsultation", mode)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor={mode} className="text-sm text-gray-700">{mode}</Label>
                </div>
              ))}
            </div>

            <div>
              <Label className="font-semibold text-sm text-gray-600">Consultation Fee (in Rupees)</Label>
              {["100-500", "500-1000", "1000+"].map((range) => (
                <div key={range} className="flex items-center gap-3 mt-2">
                  <Checkbox
                    id={range}
                    checked={filters.feeRange.includes(range)}
                    onCheckedChange={() => handleCheckboxChange("feeRange", range)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor={range} className="text-sm text-gray-700">{range}</Label>
                </div>
              ))}
            </div>

            <div>
              <Label className="font-semibold text-sm text-gray-600">Languages</Label>
              {["English", "Hindi", "Tamil", "Bengali"].map((lang) => (
                <div key={lang} className="flex items-center gap-3 mt-2">
                  <Checkbox
                    id={lang}
                    checked={filters.language.includes(lang)}
                    onCheckedChange={() => handleCheckboxChange("language", lang)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor={lang} className="text-sm text-gray-700">{lang}</Label>
                </div>
              ))}
            </div>

            <div>
              <Label className="font-semibold text-sm text-gray-600">Experience (Years)</Label>
              {["0-5", "6-10", "11-16", "16-20"].map((range) => (
                <div key={range} className="flex items-center gap-3 mt-2">
                  <Checkbox
                    id={range}
                    checked={filters.experience.includes(range)}
                    onCheckedChange={() => handleCheckboxChange("experience", range)}
                    className="text-indigo-600"
                  />
                  <Label htmlFor={range} className="text-sm text-gray-700">{range}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="mt-4 w-full py-2 text-white rounded-lg shadow-md  transition-all duration-200"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </Sidebar>

      <div className="flex-1 p-4">
  <div className="space-y-4">
    {filteredDoctors.length > 0 ? (
      filteredDoctors
        .slice((currentPage - 1) * 10, currentPage * 10) // Change 2 to 10
        .map((doctor) => (
          <div key={doctor._id} className="w-full flex space-y-4">
            <DoctorCard doctor={doctor} />
          </div>
        ))
    ) : (
      <p>No doctors found matching the filters.</p>
    )}

    {/* Pagination */}
    {filteredDoctors.length > 10 && (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="px-4 text-sm">
              Page {currentPage} of {Math.ceil(filteredDoctors.length / 10)} {/* Adjusted to 10 */}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredDoctors.length / 10)) // Adjusted to 10
                )
              }
              disabled={currentPage === Math.ceil(filteredDoctors.length / 10)} // Adjusted to 10
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )}
  </div>
</div>


    </div>
  );
};

export default Home;
