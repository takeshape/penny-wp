import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export const TopCreateOrSignIn = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <Link href="/auth/create">
        <a className="text-sm font-medium text-inverted hover:text-primary-100 cursor-pointer">Create an account</a>
      </Link>
      <span className="h-6 w-px bg-primary-600" aria-hidden="true" />
      <a
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
        className="text-sm font-medium text-inverted hover:text-primary-100 cursor-pointer"
      >
        Sign in
      </a>
    </div>
  );
};
