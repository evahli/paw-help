import loadingImg from '@/assets/loadingImg.jpeg'


export const LoadingScreen = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-black/70">
      <img
        src={loadingImg}
        alt="Loading cat"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent mb-4"></div>
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};
