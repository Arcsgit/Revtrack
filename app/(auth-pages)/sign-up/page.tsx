import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup({
  searchParams,
}: {
  searchParams?: Promise<Message>;
}) {
  const params = searchParams ? await searchParams : undefined;
  if (params && "message" in params) {
    return (
      <div className="w-full">
        <FormMessage message={params} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <Link
            className="font-medium text-primary hover:text-primary/80"
            href="/sign-in"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>
      
      <form className="space-y-6" action={signUpAction}>
        <div className="space-y-4">
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

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Your password"
              minLength={6}
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Signing up..."
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign up
          </SubmitButton>
        </div>

        {params && <FormMessage message={params} />}
      </form>
    </div>
  );
}