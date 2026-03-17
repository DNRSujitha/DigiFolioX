import React from 'react';
import { Mail, Phone } from 'lucide-react';

function Contactus({ data }) {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">{data?.contactDetails?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">{data?.contactDetails?.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contactus;
