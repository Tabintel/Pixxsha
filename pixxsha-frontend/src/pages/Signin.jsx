import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signin = () => {
  const [email] = useState(null);
  const [password] = useState(null);

  const handleSignIn = async () => {
    // Validate email and password inputs
    if (!email || !password) {
      // Handle validation errors
      return;
    }
  
    try {
      // Make a request to your TypeScript Express API to authenticate the user
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // Authentication successful
        // Dispatch an action to update the user's authentication status in Redux
        // Redirect the user to the appropriate page
      } else {
        // Authentication failed
        // Handle the error and display an appropriate message to the user
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full overflow-y-hidden bg-gray-50 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12 px-4 mt-10 overflow-hidden">
        <div className="mx-auto grid w-[450px] gap-12">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">Pixxsha</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
            <Button type="submit" className="w-full bg-black" onClick={handleSignIn}>
              Sign in
            </Button>
            {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <div
          className="h-full w-full bg-center bg-cover"
          style={{ backgroundImage: `url('./img1.jpg')` }}
        >
          <div className="absolute bottom-4 right-4 flex items-center p-1 px-2 bg-white bg-opacity-30 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
            {/* Image inside the pill */}
            <img
              src="./placeholder.svg" // Replace with your icon/image path
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
    </div>
  );
};

export default Signin;
