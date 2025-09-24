// app/forgot-password/page.tsx
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Message>;
}) {
  const params = searchParams ? await searchParams : undefined;
  return (
    <form className="flex flex-col w-full gap-4 text-foreground min-w-64 max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow">
      <div>
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <p className="text-sm text-secondary-foreground mt-2">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />

        <SubmitButton formAction={forgotPasswordAction} pendingText="Sending reset link...">
          Reset Password
        </SubmitButton>

        {params && <FormMessage message={params} />}
      </div>
    </form>
  );
}










