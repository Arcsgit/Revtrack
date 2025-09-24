// app/sign-in/page.tsx
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<Message>;
}) {
  const params = searchParams ? await searchParams : undefined;
  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <Link
            className="font-medium text-primary hover:text-primary/80"
            href="/sign-up"
          >
            create a new account
          </Link>
        </p>
      </div>
      
      <form className="space-y-6" action={signInAction}>
        <div className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </Label>
            <Input 
              id="email"
              name="email" 
              type="email" 
              autoComplete="email"
              placeholder="you@example.com" 
              required 
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          </div>

          {/* Password + Forgot Password link */}
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Link
                className="text-sm text-primary hover:text-primary/80"
                href="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <SubmitButton 
            pendingText="Signing in..." 
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in
          </SubmitButton>
        </div>

        {/* Error or Success Messages */}
        {params && <FormMessage message={params} />}
      </form>
    </div>
  );
}