import React from 'react';
import { Mail, Phone } from 'lucide-react';

function Contactus({ data }) {
  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white border border-gold-light p-10 shadow-vintage">
          <h2 className="text-4xl font-serif text-brown-dark mb-8">Correspondence</h2>
          <div className="space-y-5 text-brown-medium">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gold" />
              <span>{data?.contactDetails?.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gold" />
              <span>{data?.contactDetails?.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contactus;
