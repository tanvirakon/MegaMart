import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Forget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [correctEmail, setCorrectEmail] = useState(false);
  const [newPass, setNewPass] = useState({
    otp: "",
    pass: "",
    confirmPass: "",
  });
  const [otp, setOtp] = useState();

  const checkEmail = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/checkEmail", {
      email,
    });
    if (res?.data?.error) toast.error("invalid email");
    else {
      //email correct lets send otp
      setEmail(email);
      setCorrectEmail(true);
      const response = await axios.post("http://localhost:3000/otp", {
        email,
      });
      // console.log("fkkkk", response.data.otp); //otp gen hy ..ekn eta ei khane ene check kra lgbe
      setOtp(response.data.otp); //otp pye gc
    }
  };
  const newEntry = (e) => {
    const { value, name } = e.target;
    setNewPass((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleNewPass = async (e) => {
    e.preventDefault();
    if (newPass.otp != otp) toast.error("otp doesnt match");
    else {
      if (newPass.confirmPass != newPass.pass)
        toast.error("password doesnt match");
      else {
        const res = await axios.post("http://localhost:3000/api/setNewPass", {
          email,
          password: newPass.pass,
        });
        if (!res?.data?.error) {
          toast.success("new pass set");
          navigate("/login");
        }
      }
    }
  };
  return (
    <div className="m-10">
      {!correctEmail && (
        <div className="bg-white mx-auto max-w-sm p-4 flex flex-col rounded-xl">
          <h1 className="text-2xl mx-auto mb-4">ForgetPage</h1>
          <form onSubmit={checkEmail} className="flex flex-col">
            <div>
              <label className="mr-2"> Email: </label>
              <input
                type="text"
                placeholder=" put email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50"
              />
            </div>
            <button className="border mt-2 bg-red-500 px-4 py-2  rounded-full text-white hover:bg-red-600 mt-4 mb-2 mx-auto">
              continue
            </button>
          </form>
        </div>
      )}
      {/* email paiya gle */}
      {correctEmail && (
        <div className="bg-white mx-auto max-w-sm p-4 flex flex-col rounded-xl">
          <h1 className="text-2xl mx-auto mb-4">ForgetPage</h1>
          <form onSubmit={handleNewPass} className="flex flex-col gap-3">
            <div className="flex">
              <label className="mr-4 text-xl"> email: </label>
              <p>{email}</p>
            </div>
            <div>
              <label htmlFor="otp" className="text-xl">
                otp:{" "}
              </label>
              <input
                type="number"
                id="otp"
                value={newPass.otp}
                onChange={newEntry}
                name="otp"
                className="bg-slate-50"
              />
            </div>
            <div>
              <label htmlFor="Newpass" className="text-xl">
                new pass:{" "}
              </label>
              <input
                type="password"
                id="Newpass"
                value={newPass.pass}
                onChange={newEntry}
                name="pass"
                className="bg-slate-50"
              />
            </div>
            <div>
              <label htmlFor="confirmNewPass" className="text-xl">
                confirm new pass:{" "}
              </label>
              <input
                type="password"
                id="confirmNewPass"
                value={newPass.confirmPass}
                onChange={newEntry}
                name="confirmPass"
                className="bg-slate-50"
              />
            </div>
            <button className="border mt-2 bg-red-500 px-4 py-2  rounded-full text-white hover:bg-red-600 mt-4 mb-2 mx-auto">
              continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Forget;
