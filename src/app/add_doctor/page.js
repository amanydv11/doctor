'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

const DoctorForm = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    city: "",
    experience: "",
    course: "",
    consultFee: "",
    about: "",
    language: "",
    modeofConsultation: "",
    address: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/add-doctor", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message);

      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle className='text-center text-xl font-semibold font-serif'>Enter the details of the doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {[ 
            { label: "Name", name: "name", type: "text" },
            { label: "Specialization", name: "specialization", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "Experience", name: "experience", type: "number" },
            { label: "Course", name: "course", type: "text" },
            { label: "Consult Fee", name: "consultFee", type: "number" },
            { label: "Description", name: "about", type: "text" },
            { label: "Languages", name: "language", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <Label className='mb-2' htmlFor={name}>{label}</Label>
              <Input
                type={type}
                name={name}
                id={name}
                placeholder={label}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <Label className="mb-2" htmlFor="modeofConsultation">Mode of Consultation</Label>
            <select
              id="modeofConsultation"
              name="modeofConsultation"
              onChange={handleChange}
              value={form.modeofConsultation}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Hospital Visit">Hospital Visit</option>
            </select>
          </div>
          <div>
            <Label htmlFor="image">Doctor Image</Label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
          </Button>

          {message && <p className="text-center text-sm mt-2 text-green-600">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default DoctorForm;
