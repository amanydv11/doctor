import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbconnect';
import Doctor from '@/models/Doctor';

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const specialization = searchParams.get('specialization');
    const rating = searchParams.get('rating');
    const filter = {};
    if (city) filter.city = city;
    if (specialization) filter.specialization = specialization;
    if (rating) filter.rating = { $gte: Number(rating) }; 

    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { message: 'Error fetching doctors' },
      { status: 500 }
    );
  }
}
