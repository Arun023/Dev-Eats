import { 
  BsBagCheckFill, 
  BsPersonCheckFill, 
  BsShieldCheck, 
  BsFillCreditCard2BackFill, 
  BsFillTruckFrontFill, 
  BsFillSearchHeartFill,
  BsLightningChargeFill,
  BsClockHistory,
  BsEmojiSmileFill,
  BsCashCoin,
  BsQrCodeScan,
  BsBank
} from "react-icons/bs";
import { Link } from "react-router-dom";

const AboutView = () => {
  const features = [
    {
      icon: <BsBagCheckFill className="w-7 h-7 text-orange-500" />,
      title: "Explore Multiple Restaurants",
      description:
        "Access hundreds of top-rated restaurant chains, local cafes, and authentic food joints all in one place.",
      badge: "Multi-Brand",
    },
    {
      icon: <BsPersonCheckFill className="w-7 h-7 text-emerald-500" />,
      title: "Easy & Frictionless Login",
      description:
        "Log in effortlessly with one-click phone OTP or social accounts and save your favorite addresses.",
      badge: "Fast & Simple",
    },
    {
      icon: <BsFillCreditCard2BackFill className="w-7 h-7 text-blue-500" />,
      title: "COD & Online Payments",
      description:
        "Pay your way! Choose Cash on Delivery (COD), UPI (Google Pay, PhonePe), Credit/Debit Cards, or NetBanking.",
      badge: "Flexible Pay",
    },
    {
      icon: <BsFillTruckFrontFill className="w-7 h-7 text-purple-500" />,
      title: "Hyperlocal Express Delivery",
      description:
        "Smart delivery routing brings your food hot and fresh straight to your doorstep in record time.",
      badge: "~25 Mins",
    },
    {
      icon: <BsFillSearchHeartFill className="w-7 h-7 text-pink-500" />,
      title: "Smart Cuisine & Dish Search",
      description:
        "Find exactly what you are craving using dynamic cuisine tags, top rating filters, and price ranges.",
      badge: "Intelligent Filter",
    },
    {
      icon: <BsShieldCheck className="w-7 h-7 text-amber-500" />,
      title: "Verified Hygiene Standards",
      description:
        "Every restaurant listed on Dev-Eats meets strict safety, quality, and hygiene benchmarks.",
      badge: "100% Quality",
    },
  ];

  const stats = [
    { label: "Partner Restaurants", value: "500+", icon: <BsBagCheckFill /> },
    { label: "Average Delivery Time", value: "25 Mins", icon: <BsClockHistory /> },
    { label: "Happy Foodies Served", value: "50k+", icon: <BsEmojiSmileFill /> },
    { label: "Uptime & Performance", value: "99.9%", icon: <BsLightningChargeFill /> },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-orange-50/50 via-white to-gray-50 min-h-screen pb-16">
      {/* 1. HERO BANNER */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full  text-orange-600 font-semibold text-xs uppercase tracking-wider mb-6 border border-orange-200 shadow-xs">
           Next-Gen Food Ordering Platform
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Delicious Food, Delivered{" "}
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Faster & Smarter
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed mb-10">
          Dev-Eats connects food lovers with the finest local restaurants and global chains. 
          Enjoy lightning-fast delivery, flexible payment options, and effortless ordering.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-orange-500/30 transition-all active:scale-95 flex items-center gap-2"
          >
            <BsBagCheckFill className="w-5 h-5" /> Explore Restaurants
          </Link>
          <Link
            to="/search"
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold border border-gray-300 transition-all active:scale-95 flex items-center gap-2"
          >
            <BsFillSearchHeartFill className="w-5 h-5" /> Search Cuisines
          </Link>
        </div>
      </section>

      {/* 2. STATS OVERLAY */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 border-r last:border-r-0 border-gray-100"
            >
              <div className="text-orange-500 mb-2 text-xl">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE FEATURES GRID */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Food Lovers Choose{" "}
            <span className="text-orange-500">Dev-Eats</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Everything you need for a seamless, delicious, and hassle-free dining experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-gray-50 group-hover:bg-orange-50 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PAYMENT & CONVENIENCE SECTION */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Text */}
            <div className="lg:col-span-6">
              <span className="inline-block text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full mb-4">
                Seamless Checkout
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                Flexible Payments for Every Craving
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Whether you prefer paying cash at your doorstep or instant digital checkout, Dev-Eats offers hassle-free payment choices with zero convenience fees.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Zero Hidden Fees
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  100% Encrypted Transactions
                </span>
              </div>
            </div>

            {/* Right Payment Options Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 p-5 rounded-2xl transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <BsCashCoin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                  Cash on Delivery
                </h4>
                <p className="text-xs text-gray-500">Pay cash at doorstep when food arrives</p>
              </div>

              <div className="bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 p-5 rounded-2xl transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                  <BsQrCodeScan className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                  Instant UPI
                </h4>
                <p className="text-xs text-gray-500">GPay, PhonePe, Paytm & BHIM</p>
              </div>

              <div className="bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 p-5 rounded-2xl transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <BsFillCreditCard2BackFill className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                  Cards & Wallets
                </h4>
                <p className="text-xs text-gray-500">Visa, Mastercard, RuPay & Diners</p>
              </div>

              <div className="bg-gray-50 hover:bg-orange-50/60 border border-gray-100 hover:border-orange-200 p-5 rounded-2xl transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                  <BsBank className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">
                  Net Banking
                </h4>
                <p className="text-xs text-gray-500">All major Indian banks supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-orange-500 rounded-3xl p-10 sm:p-14 text-white shadow-xl shadow-orange-500/20">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Hungry? Let's Find Your Next Favorite Meal!
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8 text-base">
            Order from top restaurant chains and local favorites near you now.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-white text-orange-600 font-extrabold shadow-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
          >
            Order Food Now <BsBagCheckFill className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
