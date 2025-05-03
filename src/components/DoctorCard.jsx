export default function DoctorCard({ doctor }) {
    return (
      <div className="w-full border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-6">
        <div className="flex items-start space-x-4 w-full sm:w-auto">
          <img
            src={doctor.image}
            alt={`Portrait of ${doctor.name}`}
            width={64}
            height={64}
            className="w-16 h-16 rounded object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <h2 className="font-bold text-gray-900 text-base sm:text-lg">Dr.{doctor.name}</h2>
              <i className="fas fa-info-circle text-gray-500 text-xs" title="Information" />
            </div>
            <p className="text-gray-500 text-sm line-clamp-1" title={doctor.specialization}>
              {doctor.specialization}
            </p>
            <p className="text-indigo-700 font-semibold text-xs sm:text-sm mt-1">{doctor.experience} years.<span className="uppercase">{doctor.course}</span></p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{doctor.city}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{doctor.address}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{doctor.language}</p>

          </div>
        </div>

  
        <div className="flex flex-col sm:items-end mt-4 sm:mt-0 sm:w-48 w-full space-y-3">
          <div className="font-extrabold text-base sm:text-lg flex items-center justify-between sm:justify-end w-full space-x-2">
            <span>₹{doctor.consultFee}</span>
          </div>
          <button className="border border-[#0B5C7E] text-[#0B5C7E] rounded-md py-2 px-4 w-full text-center font-semibold text-sm sm:text-base hover:bg-[#0B5C7E] hover:text-white transition">
            <div>Consult Online</div>
          </button>
        </div>
      </div>
    );
  }
  