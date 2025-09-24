import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export default function SignUpUserSteps() {
  const isVercel = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "production";

  return (
    <ol className="flex flex-col gap-6">
      {isVercel && (
        <TutorialStep title="Set up redirect URLs">
          <p>It looks like this app is hosted on Vercel.</p>

          <p className="mt-4">
            This deployment is{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              "{process.env.VERCEL_ENV}"
            </span>{" "}
            on{" "}
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              https://{process.env.VERCEL_URL}
            </span>
            .
          </p>

          <p className="mt-4">
            You will need to{" "}
            <Link
              href="https://supabase.com/dashboard/project/_/auth/url-configuration"
              className="text-primary hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>

          <ul className="mt-4">
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                http://localhost:3000/**
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                  ".vercel.app",
                  ""
                )}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-foreground"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>

          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
          >
            Redirect URLs Docs <ArrowUpRight size={14} />
          </Link>
        </TutorialStep>
      )}

      <TutorialStep title="Sign up your first user">
        <p>
          Head over to{" "}
          <Link
            href="/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
            Sign up
          </Link>{" "}
          page and create your first user. It's okay if this is just you for now — your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
