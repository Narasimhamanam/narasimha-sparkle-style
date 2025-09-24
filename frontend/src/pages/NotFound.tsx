import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-8">👗</div>
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-2xl text-muted-foreground">Oops! This page doesn't exist</p>
        <p className="mb-8 text-lg text-muted-foreground">
          The dress you're looking for might have been moved or doesn't exist.
        </p>
        <a href="/" className="btn-hero inline-block">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
