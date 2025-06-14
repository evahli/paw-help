import { PageHeader } from '../components/PageHeader';
import { DetailPageBody } from '../components/DetailPageBody';
import { useSearchParams } from 'react-router';
import { useClinicData } from '@/lib/useClinicData';
import { getTodaysOpeningHours, isClinicOpen } from '@/lib/openingHours';
import placeholder from '/images/placeholder.png';
import { LoadingScreen } from '@/components/LoadingScreen';

export const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId');
  const variant = searchParams.get("variant");
  const { placeData, isLoading, error } = useClinicData(placeId);

  if (isLoading || !placeData) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  const isOpen = isClinicOpen(placeData.openingHours);

  return (
    <div className='h-screen overflow-auto'>
      <PageHeader categoryName={placeData.categoryName} variant={variant}/>
      <div className='pt-[20vh] p-5 sm:flex sm:flex-row sm:justify-evenly sm:items-center sm:pt-[30vh]'>
        <img
          src={placeData.imageUrl || placeholder}
          alt="detail page image"
          width="385px"
          className="rounded-md"
        />
        <DetailPageBody
          variant={variant}
          title={placeData.title}
          totalScore={placeData.totalScore}
          reviewsCount={placeData.reviewsCount}
          categoryName={placeData.categoryName}
          address={placeData.address}
          openingHours={ isOpen ? <span>
                        {getTodaysOpeningHours(placeData.openingHours)?.hours.replace(
                          'to',
                          '-',
                        )}
                      </span>
                      : <span className='text-red-600 font-semibold'>Zavřeno</span>
                    }
          website={placeData.website}
          phone={placeData.phone}
          to={`https://maps.google.com/maps?daddr=${placeData.location.lat},${placeData.location.lng}`}
          showCarIcon
        />
      </div>
    </div>
  );
};
