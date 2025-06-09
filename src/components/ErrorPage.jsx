import errorImg from '@/assets/error.jpeg';
import { Button } from './ui/button';

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-[450px] h-screen">
        <img
          src={errorImg}
          alt="Error cat"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-4">
          <Button>
            <a
              href="/"
              className="text-white text-2xl font-semibold hover:text-gray-200"
            >
              Go back home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
