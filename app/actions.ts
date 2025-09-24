"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";

export async function signUpAction(formData: FormData) {
  const supabase = await createClient();

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }

  return encodedRedirect("success", "/sign-in", "Check your email to confirm your account");
}

export async function signInAction(formData: FormData) {
  const supabase = await createClient();

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return encodedRedirect("success", "/", "Successfully signed in");
}

export async function signOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  return encodedRedirect("success", "/", "Successfully signed out");
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createClient();

  // Type-casting here for convenience
  // In practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return encodedRedirect("error", "/forgot-password", error.message);
  }

  return encodedRedirect("success", "/forgot-password", "Check your email to reset your password");
}

