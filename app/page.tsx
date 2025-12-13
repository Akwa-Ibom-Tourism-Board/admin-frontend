/* eslint-disable @typescript-eslint/no-explicit-any */
// // app/admin/page.tsx
// "use client";

// import { useState } from "react";
// import { Building2, Globe, ArrowRight, Shield } from "lucide-react";

// const AdminLanding = () => {
//   const [selectedPortal, setSelectedPortal] = useState<string>("");

//   const handlePortalSelect = (portal: string) => {
//     setSelectedPortal(portal);

//     // Redirect after selection with a slight delay for better UX
//     setTimeout(() => {
//       if (portal === "hospitality") {
//         window.location.href = "/admin/hospitality-portal";
//       } else if (portal === "core") {
//         window.location.href = "/admin/core-website";
//       }
//     }, 500);
//   };

//   const portals = [
//     {
//       id: "hospitality",
//       title: "Hospitality Portal",
//       description:
//         "Manage hotels, restaurants, bars, and tourism businesses registration and compliance",
//       icon: Building2,
//       color: "#00563b",
//       gradient: "from-[#00563b] to-[#004a32]",
//       features: [
//         "Entity Registration Management",
//         "Compliance Monitoring",
//         "Tourism Business Analytics",
//         "License & Permit Processing",
//       ],
//       path: "/admin/hospitality-portal",
//     },
//     {
//       id: "core",
//       title: "Core Website Admin",
//       description:
//         "Manage main website content, news, events, and public-facing information",
//       icon: Globe,
//       color: "#e77818",
//       gradient: "from-[#e77818] to-[#d4690f]",
//       features: [
//         "Content Management System",
//         "News & Article Publishing",
//         "Event Management",
//         "Website Analytics",
//       ],
//       path: "/admin/core-website",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#fff7ec]">
//       {/* Header */}
//       <header className="w-full bg-white border-b border-[#e9e1d7] shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00563b] shadow-glow">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-[#2a2523]">
//                   Akwa Ibom State Hotel and Tourism Board
//                 </h1>
//                 <p className="text-sm text-[#78716e]">
//                   Secure Admin Portal Access
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-[#2a2523]">
//                   Administrator
//                 </p>
//                 <p className="text-xs text-[#78716e]">Super Admin</p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-[#00563b] flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">A</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00563b] to-[#e77818] flex items-center justify-center shadow-lg">
//             <Shield className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-[#2a2523] mb-4">
//             Admin Portal Access
//           </h1>
//           <p className="text-xl text-[#78716e] max-w-2xl mx-auto leading-relaxed">
//             Select the administration portal you want to access. Each portal
//             provides specialized tools for managing different aspects of the
//             Akwa Ibom State digital ecosystem.
//           </p>
//         </div>

//         {/* Portal Selection Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {portals.map((portal) => {
//             const Icon = portal.icon;
//             const isSelected = selectedPortal === portal.id;

//             return (
//               <div
//                 key={portal.id}
//                 className={`
//                   relative bg-white rounded-2xl border-2 p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group
//                   ${
//                     isSelected
//                       ? "border-[#00563b] scale-105 shadow-xl"
//                       : "border-[#e9e1d7] hover:border-[#00563b]"
//                   }
//                 `}
//                 onClick={() => handlePortalSelect(portal.id)}
//               >
//                 {/* Selection Indicator */}
//                 {isSelected && (
//                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00563b] rounded-full flex items-center justify-center">
//                     <div className="w-2 h-2 bg-white rounded-full" />
//                   </div>
//                 )}

//                 {/* Portal Icon */}
//                 <div
//                   className={`
//                   w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300
//                   ${
//                     isSelected
//                       ? "bg-gradient-to-br " + portal.gradient + " shadow-lg"
//                       : "bg-[#fdf8f4] group-hover:bg-gradient-to-br group-hover:" +
//                         portal.gradient
//                   }
//                 `}
//                 >
//                   <Icon
//                     className={`
//                     w-8 h-8 transition-colors duration-300
//                     ${
//                       isSelected
//                         ? "text-white"
//                         : "text-[#78716e] group-hover:text-white"
//                     }
//                   `}
//                   />
//                 </div>

//                 {/* Portal Content */}
//                 <div className="text-left">
//                   <h3
//                     className={`
//                     text-2xl font-bold mb-3 transition-colors duration-300
//                     ${
//                       isSelected
//                         ? "text-[#00563b]"
//                         : "text-[#2a2523] group-hover:text-[#00563b]"
//                     }
//                   `}
//                   >
//                     {portal.title}
//                   </h3>

//                   <p className="text-[#78716e] mb-6 leading-relaxed">
//                     {portal.description}
//                   </p>

//                   {/* Features List */}
//                   <ul className="space-y-2 mb-8">
//                     {portal.features.map((feature, index) => (
//                       <li
//                         key={index}
//                         className="flex items-center gap-3 text-sm text-[#78716e]"
//                       >
//                         <div
//                           className={`
//                           w-2 h-2 rounded-full transition-colors duration-300
//                           ${
//                             isSelected
//                               ? "bg-[#00563b]"
//                               : "bg-[#e9e1d7] group-hover:bg-[#00563b]"
//                           }
//                         `}
//                         />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Action Button */}
//                   <div
//                     className={`
//                     flex items-center justify-between p-4 rounded-lg border transition-all duration-300
//                     ${
//                       isSelected
//                         ? "bg-[#00563b] text-white border-[#00563b]"
//                         : "bg-[#fdf8f4] border-[#e9e1d7] group-hover:bg-[#00563b] group-hover:text-white group-hover:border-[#00563b]"
//                     }
//                   `}
//                   >
//                     <span className="font-medium">
//                       {isSelected ? "Redirecting..." : "Access Portal"}
//                     </span>
//                     <ArrowRight
//                       className={`
//                       w-5 h-5 transition-transform duration-300
//                       ${
//                         isSelected
//                           ? "translate-x-1"
//                           : "group-hover:translate-x-1"
//                       }
//                     `}
//                     />
//                   </div>
//                 </div>

//                 {/* Hover Glow Effect */}
//                 <div
//                   className={`
//                   absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 pointer-events-none
//                   ${portal.gradient}
//                   ${isSelected ? "opacity-5" : "group-hover:opacity-5"}
//                 `}
//                 />
//               </div>
//             );
//           })}
//         </div>

//         {/* Security Notice */}
//         <div className="max-w-2xl mx-auto mt-12 text-center">
//           <div className="bg-[#fdf8f4] border border-[#e9e1d7] rounded-xl p-6">
//             <div className="flex items-center justify-center gap-3 mb-3">
//               <Shield className="w-5 h-5 text-[#00563b]" />
//               <span className="font-semibold text-[#2a2523]">
//                 Secure Access
//               </span>
//             </div>
//             <p className="text-sm text-[#78716e]">
//               All admin activities are logged and monitored for security
//               purposes. Ensure you log out after completing your administrative
//               tasks.
//             </p>
//           </div>
//         </div>
//       </main>

//       {/* Loading Overlay */}
//       {selectedPortal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#00563b] border-t-transparent animate-spin" />
//             <h3 className="text-lg font-semibold text-[#2a2523] mb-2">
//               Redirecting to{" "}
//               {portals.find((p) => p.id === selectedPortal)?.title}
//             </h3>
//             <p className="text-[#78716e]">
//               Please wait while we securely redirect you...
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminLanding;

"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Hospital,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ChartNoAxesCombined,
  Globe,
} from "lucide-react";
import { useAlert } from "next-alert";
import { useLoginAdmin } from "@/services/establishments/mutation";
import Cookies from 'js-cookie';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState<"hospitality" | "core">(
    "hospitality"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addAlert } = useAlert();

  const { mutate: loginAdmin, isPending: isLoginLoading } = useLoginAdmin();

  const portals = [
    {
      id: "hospitality",
      name: "Hospitality Portal",
      description: "Hotels, Restaurants & Tourism",
      color: "#00563b",
      icon: Hospital,
    },
    {
      id: "core",
      name: "Core Website",
      description: "Main Website Management",
      color: "#e77818",
      icon: Globe,
    },
  ];

  const handleSubmit = async () => {
    setError("");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      loginAdmin(formData, {
        onSuccess: (data) => {
          Cookies.set("access_token",data.data.accessToken);
          Cookies.set("admin",data.data);
          addAlert(
            "Success!",
            "Login successful! Redirecting to dashboard...",
            "success"
          );
          if (selectedPortal === "hospitality") {
            window.location.href = "/admin/hospitality-portal";
          } else {
            window.location.href = "/admin/core-website";
          }
        },
        onError: (error: any) => {
          console.error("Login error:", error);
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "An error occurred during login, please try again. If error persists, please contact admin.",
            "error"
          );
        },
      });
    } catch (error) {
      console.error("SubmLoginission error:", error);
      addAlert(
        "Error",
        "Login failed. Please try again. If error persists, please contact admin.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#fff7ec] to-[#fef3e8] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00563b 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Branding */}
          <div className="flex flex-col justify-center space-y-8 p-8 lg:p-10">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/board-new-logo-2.png"
                    alt="Akwa Ibom State Hotels & Tourism Board"
                    width={150}
                    height={150}
                    className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
                  />
                </div>

                <div className="flex-shrink-0">
                  <Image
                    src="/arise-logo-main.png"
                    alt="Akwa Ibom State Hotels & Tourism Board"
                    width={150}
                    height={150}
                    className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
                  />
                </div>
              </div>

              <p className="text-lg text-[#78716e] leading-relaxed">
                Secure access to manage hospitality entities, website content,
                and administrative functions.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e9e1d7]">
                <div className="w-10 h-10 rounded-lg bg-[#00563b]/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-[#00563b]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a2523]">
                    Entity Management
                  </h3>
                  <p className="text-sm text-[#78716e]">
                    Register and manage hotels, restaurants, and tourism
                    operators
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-[#e9e1d7]">
                <div className="w-10 h-10 rounded-lg bg-[#e77818]/10 flex items-center justify-center flex-shrink-0">
                  <ChartNoAxesCombined className="w-5 h-5 text-[#e77818]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2a2523]">
                    Analytics & Reports
                  </h3>
                  <p className="text-sm text-[#78716e]">
                    Generate comprehensive reports and track registration trends
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl border border-[#e9e1d7] p-8">
                <div>
                  <h1 className="text-lg lg:text-xl text-center font-bold text-[#2a2523]">
                    Akwa Ibom State Hotels & Tourism Board
                  </h1>
                  <h1 className="text-lg lg:text-xl text-center font-bold text-[#2a2523]">
                    Admin Portal
                  </h1>
                  {/* <p className="text-[#78716e] text-center text-sm">Akwa Ibom State Government</p> */}
                </div>
                <div className="mb-8">
                  {/* <h2 className="text-xl font-bold text-center text-[#2a2523] mb-2">
                    Welcome Back
                  </h2> */}
                  <p className="text-[#78716e] text-center">
                    Sign in to access the admin dashboard
                  </p>
                </div>

                {/* Portal Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2a2523] mb-3">
                    Select Portal
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {portals.map((portal) => {
                      const Icon = portal.icon;
                      return (
                        <button
                          key={portal.id}
                          type="button"
                          onClick={() => setSelectedPortal(portal.id as any)}
                          className={`
                            p-4 rounded-xl hover:cursor-pointer border-2 transition-all duration-200
                            ${
                              selectedPortal === portal.id
                                ? "border-opacity-100"
                                : "border-[#e9e1d7] hover:border-[#00563b]/30"
                            }
                          `}
                          style={{
                            borderColor:
                              selectedPortal === portal.id
                                ? portal.color
                                : undefined,
                            backgroundColor:
                              selectedPortal === portal.id
                                ? `${portal.color}10`
                                : undefined,
                          }}
                        >
                          <Icon
                            className="w-6 h-6 mb-2 mx-auto"
                            style={{
                              color:
                                selectedPortal === portal.id
                                  ? portal.color
                                  : "#78716e",
                            }}
                          />
                          <p className="text-sm font-medium text-[#2a2523] text-center">
                            {portal.name.split(" ")[0]}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Login Form */}
                <div className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-[#2a2523] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@akwaibom.gov.ng"
                        className="w-full pl-11 pr-4 py-3 border border-[#e9e1d7] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-[#2a2523] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && email && password) {
                            handleSubmit();
                          }
                        }}
                        className="w-full pl-11 pr-12 py-3 border border-[#e9e1d7] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#78716e] hover:text-[#2a2523] transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#00563b] border-[#e9e1d7] rounded focus:ring-[#00563b]"
                      />
                      <span className="text-sm text-[#78716e]">
                        Remember me
                      </span>
                    </label>
                    {/* <button
                      type="button"
                      className="text-sm text-[#00563b] hover:text-[#e77818] font-medium transition-colors"
                    >
                      Forgot password?
                    </button> */}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoginLoading || !email || !password}
                    className="w-full py-3 px-4 bg-[#00563b] hover:cursor-pointer text-white rounded-lg font-medium hover:bg-[#004a32] focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Demo Credentials */}
                {/* <div className="mt-6 p-4 bg-[#fdf8f4] rounded-lg border border-[#e9e1d7]">
                  <p className="text-xs font-medium text-[#2a2523] mb-2">
                    Demo Credentials:
                  </p>
                  <p className="text-xs text-[#78716e] font-mono">
                    Email: admin@akwaibom.gov.ng
                    <br />
                    Password: admin123
                  </p>
                </div> */}
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#78716e]">
                  Need help? Contact{" "}
                  <a
                    href="mailto:support@akwaibom.gov.ng"
                    className="text-[#00563b] hover:text-[#e77818] font-medium transition-colors"
                  >
                    IT Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
