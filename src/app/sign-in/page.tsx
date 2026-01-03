import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
            <SignIn  />
            <Link href="/" className="text-purple-600 hover:underline">
              Back to Home
            </Link>
        </div>
    </div>
  );
}