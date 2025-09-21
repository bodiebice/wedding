"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function AddressCollector() {
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const sendGuest = api.guests.create.useMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!familyName.trim()) newErrors.familyName = "Family name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State/Province is required";
    if (!zip.trim()) newErrors.zip = "Postal/ZIP code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
    await sendGuest.mutateAsync({
        familyName: familyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zip.trim(),
      });
      
      // Redirect to success page
      router.push("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Family Name */}
        <div className="sm:col-span-2">
          <label htmlFor="familyName" className="block text-sm font-medium text-gray-900 mb-2">
            Family Name *
          </label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.familyName ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="The Bice Family"
          />
          {errors.familyName && (
            <p className="mt-1 text-sm text-red-600">{errors.familyName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.email ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="email@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.phone ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="(555) 867-5309"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-900 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.address ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="123 Main Street"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.city ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="Waseca"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-900 mb-2">
            State/Province *
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.state ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="MN"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        {/* ZIP */}
        <div className="sm:col-span-2">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-900 mb-2">
            Postal/ZIP Code *
          </label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl bg-white ring-1 ring-inset ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:border-[#30703d] transition-colors placeholder-gray-500 text-gray-900 ${
              errors.zip ? "border-red-300 ring-red-300" : "border-transparent"
            }`}
            placeholder="12345"
          />
          {errors.zip && (
            <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 bg-[#30703d] text-white font-semibold rounded-xl hover:bg-[#2a5f35] focus:outline-none focus:ring-2 focus:ring-[#30703d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
        >
          {isSubmitting ? "Submitting..." : "Submit Information"}
        </button>
      </div>
    </form>
  );
}