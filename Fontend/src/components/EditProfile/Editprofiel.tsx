import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";

type IFormInput = {
  full_name: string;
  email: string;
  phone_number: string;
  customer_id?: string;
};

export default function EditProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IFormInput | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getProfile")
      .then((response) => {
        const { full_name, email, phone_number } = response.data;
        setUserData({ full_name, email, phone_number });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const toggleHome = () => {
    navigate("/home");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      console.log("Submitted data:", data); 

      const response = await axios.post("http://localhost:3000/editprofile", {
        ...data,
        customer_id: userData?.customer_id, 
      });

      if (response.status === 200) {
        navigate("/profile"); 
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message); 
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i
              className="fa-solid fa-arrow-left fa-2x cursor-pointer"
              onClick={toggleHome}
            />
            <span className="text-xl font-bold">Fill Your Profile</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="full_name"
            type="text"
            placeholder="Full Name"
            defaultValue={userData.full_name}
            {...register("full_name", {
              required: "Full Name is required",
            })}
          />
          {errors.full_name && (
            <span className="text-red-500">{errors.full_name.message}</span>
          )}

          <Input
            id="email"
            type="email"
            placeholder="Email"
            defaultValue={userData.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <Input
            id="phone_number"
            type="text"
            placeholder="Phone number"
            defaultValue={userData.phone_number}
            {...register("phone_number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, 
                message: "Please enter a valid phone number.",
              },
            })}
          />
          {errors.phone_number && (
            <span className="text-red-500">{errors.phone_number.message}</span>
          )}

          <Button state={loading} type="submit">
            {loading ? <i className="fa fa-spinner fa-spin mr-2"></i> : null}
            {loading ? "Loading..." : "Edit"}
          </Button>
        </form>
      </div>
    </>
  );
}
