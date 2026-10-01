/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "motion/react";
import { MessageSquareQuote, Users, Zap, Heart } from "lucide-react";
import user1Img from "@/assets/images/user1.png";
import user2Img from "@/assets/images/user2.png";
import user3Img from "@/assets/images/user3.png";
import user4Img from "@/assets/images/user4.png";
import lockImg from "@/assets/images/Lock.png";
import flagImg from "@/assets/images/flag.png";
import teacherImg from "@/assets/images/teacher.png";
import principalImg from "@/assets/images/user.png";
import studentsImg from "@/assets/images/lead.png";
import wellbeingImg from "@/assets/images/love.png";

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillFraction = Math.max(0, Math.min(1, rating - (star - 1)));
        return (
          <div
            key={star}
            className="relative w-4 h-4 flex items-center justify-center"
          >
            {/* Base star */}
            <svg
              className="w-4 h-4 text-gray-200 fill-gray-200"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {/* Filled overlay */}
            {fillFraction > 0 && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillFraction * 100}%` }}
              >
                <svg
                  className="w-4 h-4 text-[#0084FF] fill-[#0084FF]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for signing up: ${email}`);
      setEmail("");
    }
  };

  return (
    <main className="min-h-[calc(100vh-140px)] bg-white flex items-center">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-32">
          {/* Left Column: Hero Text & Early Access Form */}
          <div className="lg:col-span-6 space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-700">
                <img src={lockImg} alt="lock" />
                <span>100% Safe</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-700">
                <img src={flagImg} alt="flag" />
                <span>Swiss Hosted</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[60px] font-bold text-gray-900 tracking-tight leading-[1.12]">
              Help Schools{" "}
              <span className="relative inline-block text-[#0084FF]">
                Learn
                {/* Curved underline flourish */}
                <svg
                  viewBox="0 0 90 10"
                  className="absolute left-0 -bottom-3 w-full h-4.5 text-[#0084FF] pointer-events-none"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M 2,8 Q 45,-4 88,8 Q 45,0 2,8 Z" fill="#0084FF" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-black -mt-2">
              Find your school. Select an option. Make your voice count.
            </p>

            {/* Early Access Box */}
            <div className="bg-[#038AF9]/4 border border-[#d8e8fc]/80 rounded-3xl p-6 sm:p-8 relative">
              {/* Coming Soon Badge */}
              <div className="mb-3">
                <span className="inline-block px-3.5 py-2.5 text-[15px] font-medium text-[#037CE0]/90 bg-white border border-[#037CE0]/80 rounded-full">
                  Coming Soon
                </span>
              </div>

              <h2 className="text-2xl sm:text-[26px] lg:text-[32px] font-bold text-gray-900 mb-2">
                Get early access
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 mb-6 leading-relaxed">
                Be among the first to try SchoolReview when we launch. Schools
                get priority onboarding.
              </p>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address..."
                    className="flex-1 px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0084FF]/20 focus:border-[#0084FF] text-gray-800 placeholder-gray-700 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0084FF] hover:bg-[#0074e0] text-white font-medium rounded-xl shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Notify me
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  We'll only email you about the launch. You can unsubscribe
                  anytime.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Floating Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
            {/* Card 1: Teaching */}
            <div className="relative w-full max-h-[360px] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-sm group cursor-pointer">
              <img
                src={user1Img}
                alt="Teaching"
                className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Overlay Badge at Bottom */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-gray-100 flex items-center gap-3">
                  <img
                    src={teacherImg}
                    alt="teacher"
                    className="w-5.5 h-5.5 text-gray-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">
                      Teaching
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={4.0} />
                      <span className="text-sm text-gray-600">4.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Inclusion */}
            <div className="relative w-full max-h-[340px] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-sm group cursor-pointer">
              <img
                src={user2Img}
                alt="Inclusion"
                className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Overlay Badge at Bottom */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-gray-100 flex items-center gap-3">
                  <img
                    src={principalImg}
                    alt="priciple"
                    className="w-5.5 h-5.5 text-gray-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">
                      Inclusion
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={4.8} />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Leadership */}
            <div className="relative w-[90%] ml-auto max-h-[310px] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-sm group cursor-pointer">
              <img
                src={user3Img}
                alt="Leadership"
                className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Overlay Badge at Bottom */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-gray-100 flex items-center gap-3">
                  <img
                    src={studentsImg}
                    alt="leadership"
                    className="w-5.5 h-5.5 text-gray-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">
                      Leadership
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={4.2} />
                      <span className="text-sm text-gray-600">4.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Wellbeing */}
            <div className="relative w-[84%] max-h-[280px] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-sm group cursor-pointer">
              <img
                src={user4Img}
                alt="Wellbeing"
                className="w-full h-full object-cover scale-[1.03] transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              {/* Overlay Badge at TOP */}
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-md border border-gray-100 flex items-center gap-3">
                  <img
                    src={wellbeingImg}
                    alt="wellbeing"
                    className="w-5.5 h-5.5 text-gray-400 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 leading-tight">
                      Wellbeing
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRating rating={4.5} />
                      <span className="text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
