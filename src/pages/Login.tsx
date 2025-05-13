
import { Link } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue
            </p>
          </div>
          
          <AuthForm type="login" />
          
          <div className="mt-6 text-center">
            <Separator className="my-4" />
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-carwash-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
