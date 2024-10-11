import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // Validate email, password, and confirmPassword inputs
    if (!email || !password || !confirmPassword) {
      // Handle validation errors
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      // Handle password mismatch error
      alert("Passwords do not match.");
      return;
    }

    try {
      // Make a request to your TypeScript Express API to register the user
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        // Registration successful
        // Redirect the user to the login page or display a success message
        alert("Registration successful. Please log in.");
      } else {
        // Registration failed
        // Handle the error and display an appropriate message to the user
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full overflow-y-hidden bg-gray-50 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:block">
        <div
          className="h-full w-full bg-center bg-cover"
          style={{ backgroundImage: `url('./img1.jpg')` }}
        >
          <div className="absolute bottom-4 left-4 flex items-center p-1 px-2 bg-white bg-opacity-30 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
            {/* Image inside the pill */}
            <img
              src="placeholder.svg" // Replace with your icon/image path
              alt="Icon"
              className="w-8 h-8 mr-2 rounded-full" // Adjust size as needed
            />
            <div>
              <p className="text-xs font-semibold">Project Pixxsha for Devto</p>
              <p className="text-xs text-gray-800">Take a Picture..</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-12 px-4 mt-10 overflow-hidden">
        <div className="mx-auto grid w-[450px] gap-12">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Pixxsha</h1>
            <p className="text-balance text-muted-foreground">
              Take a picture it lasts.....
            </p>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email/Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="gird gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-black"
              onClick={handleSignUp}
            >
              Sign up
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
