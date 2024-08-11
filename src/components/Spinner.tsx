// src/components/Spinner.tsx

import { Loader } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <Loader className="animate-spin text-blue-500 mx-auto" size={48} />
        <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
