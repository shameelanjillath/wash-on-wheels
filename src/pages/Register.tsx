
import { Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { Separator } from "@/components/ui/separator";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-gray-600 mt-2">
              Sign up to start booking car washes
            </p>
          </div>
          
          <AuthForm type="register" />
          
          <div className="mt-6 text-center">
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-carwash-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
