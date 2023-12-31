// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { userSignUpAction } from "../Redux/Actions/userActions";
// import { useNavigate, useNavigation } from "react-router-dom";

// const RegistrationForm = () => {
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const { userInfo } = useSelector((state) => state.signUp);
//   const formik = useFormik({
//     initialValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       fullName: Yup.string().required("Required"),
//       email: Yup.string().email("Invalid email address").required("Required"),
//       password: Yup.string()
//         .min(8, "Password must be at least 8 characters")
//         .required("Required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Required"),
//     }),
//     onSubmit: (values, actions) => {
//       dispatch(userSignUpAction(values));
//       nav("/login");
//       actions.resetForm();
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center p-10 w-[500px] h-[600px]">
//       <div className="max-w-md w-full p-6  rounded-lg shadow-lg">
//         <h2 className="text-2xl mb-4">Registration Form</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="fullName"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.name}
//             />
//             {formik.touched.name && formik.errors.name ? (
//               <div className="text-red-600">{formik.errors.name}</div>
//             ) : null}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div className="text-red-600">{formik.errors.email}</div>
//             ) : null}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <div className="text-red-600">{formik.errors.password}</div>
//             ) : null}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//             />
//             {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//               <div className="text-red-600">
//                 {formik.errors.confirmPassword}
//               </div>
//             ) : null}
//           </div>
//           {/* <div className="mb-4">
//             <label htmlFor="role" className="block mb-2">
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               value={formik.values.role}
//               onChange={handleRoleChange}
//               //   onChange={formik.handleChange}
//             >
//               <option value="">Select a role</option>
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </select>
//             {formik.errors.role && formik.touched.role ? (
//               <h1 className="text-red-700">{formik.errors.role}</h1>
//             ) : null}
//           </div> */}
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Register
//           </button>
//           <div class="text-grey-dark mt-6">
//             Already have an account?
//             <a
//               class="no-underline border-b border-blue text-blue-700"
//               href="signIn"
//             >
//               Sign In
//             </a>
//             .
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
