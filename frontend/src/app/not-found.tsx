import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-primary mb-8">MealMajor</div>

      {/* 404 Large Text */}
      <div className="text-9xl font-bold text-primary opacity-20 leading-none">
        404
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mt-4">
        Oops! Page not found
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 mt-2 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <Link href="/dashboard">
        <Button variant="primary">Go back to Dashboard</Button>
      </Link>
    </div>
  );
}
