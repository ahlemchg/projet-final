import React, { useState } from "react";
import { BiSend, BiLoaderAlt } from "react-icons/bi";
import { publicRequest } from "../requestMethods";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await publicRequest.post("newsletter", { email });
      if (res.status === 201 || res.status === 200) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-extrabold text-[#001e2b] mb-2">
          Join Our Newsletter
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Subscribe to get special offers, free giveaways, and
          once-in-a-lifetime deals.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#001e2b]"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#001e2b] text-white px-6 py-3 rounded-md font-bold hover:bg-[#00354d] transition-colors flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-50"
          >
            {isLoading ? (
              <BiLoaderAlt className="animate-spin" size={20} />
            ) : (
              <>
                Subscribe <BiSend />
              </>
            )}
          </button>
        </form>
        {status === "success" && (
          <p className="text-green-600 mt-4 font-medium">
            Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 font-medium">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
