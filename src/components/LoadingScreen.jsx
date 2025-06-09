import loadingImg from '@/assets/loadingImg.jpeg'


export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-[450px] h-screen">
        <img
          src={loadingImg}
          alt="Loading cat"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-4 text-white">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent mb-6" />
          <p className="text-4xl font-bold">Loading...</p>
        </div>
      </div>
    </div>
  );
};
