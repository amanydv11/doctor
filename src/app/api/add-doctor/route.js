import { NextResponse } from "next/server";
import { cloudinaryConnect } from "@/lib/Cloudinary";
import Doctor from "@/models/Doctor";
import connectDB from "@/lib/dbconnect";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  await connectDB();
  cloudinaryConnect();

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const specialization = formData.get("specialization");
    const city = formData.get("city");
    const experience = formData.get("experience");
    const course = formData.get("course");
    const consultFee = formData.get("consultFee");
    const file = formData.get("image");
    const language = formData.get("language");
    const about = formData.get("about");
    const modeofConsultation = formData.get("modeofConsultation");
    const address = formData.get("address");

    console.log("Received form data:", {
      name,
      specialization,
      city,
      experience,
      course,
      consultFee,
      file,
      language,
      about,
      modeofConsultation,
      address,
    });
    if (
      !name ||
      !specialization ||
      !city ||
      !experience ||
      !course ||
      !consultFee ||
      !file ||
      !modeofConsultation ||
      !language ||
      !about ||
      !address
    ) {
      return NextResponse.json(
        { message: "Please fill all the fields and upload an image" },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "doctors",
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });
    const newDoctor = new Doctor({
      name,
      specialization,
      city,
      experience,
      image: uploaded.secure_url,
      course,
      consultFee,
      language,
      about,
      modeofConsultation,
      address,
    });

    await newDoctor.save();

    return NextResponse.json(
      { message: "Doctor added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading doctor:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

