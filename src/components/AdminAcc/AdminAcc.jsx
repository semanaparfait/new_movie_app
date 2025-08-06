import React, { useState } from 'react';
import accountbg from '../../assets/images/Accountadmin/adminbg.jpg';
import { useNavigate } from 'react-router-dom';

function AdminAcc() {
  const [adminusername, setAdminusernmae] = useState("");
  const [admincode, setAdmincode] = useState("");
  const [adminpassword, setAdminpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminusername === "semana" && admincode === "semana2004" && adminpassword === "semana2004") {
      navigate("/adminpage");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div
      className="absolute overflow-hidden inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${accountbg})` }}

    >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}

      <div className='min-h-screen flex items-center justify-center'>
        <div className="right-tect-content text-center text-white  w-full max-w-md">
            <h1>Welcome admin</h1>
          <form onSubmit={handleLogin} className='flex flex-col gap-4 '>
            <input
              type="text"
              value={adminusername}
              onChange={(e)=> setAdminusernmae(e.target.value)}
              placeholder="Enter your Full name"
              className="w-full rounded bg-white/90 outline-none text-sm"
              />
            <input
              type="text"
              value={admincode}
              onChange={(e)=> setAdmincode(e.target.value)}
              placeholder="Enter your code"
              className="w-full rounded bg-white/90 outline-none text-sm"
              />
            <input
              type="password"
              value={adminpassword}
              onChange={(e)=> setAdminpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded bg-white/90 outline-none text-sm text-[black] placeholder-black"
              style={{paddingLeft:'7px'}}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded h-[3rem]">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAcc;
