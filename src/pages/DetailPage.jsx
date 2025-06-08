import { PageHeader } from '../components/PageHeader';
import { DetailPageBody } from '../components/DetailPageBody';
import { useSearchParams } from 'react-router';
import { useClinicData } from '@/lib/useClinicData';

export const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get('placeId');
  const { placeData, isLoading, error } = useClinicData(placeId);

  if (isLoading || !placeData) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='relative'>
      <PageHeader categoryName={placeData.categoryName} />
      <div className='h-[80vh] absolute top-[20vh]'>
        <img
          src={placeData.imageUrl}
          alt="placeholder"
          width="385px"
          className="rounded-md"
        />
        <DetailPageBody
          title={placeData.title}
          // To do: Reviews component
          totalScore={placeData.totalScore}
          categoryName={placeData.categoryName}
          address={placeData.address}
          // To do: openingHours component
          openingHours="Otevreno"
          website={placeData.website}
          phone={placeData.phone}
          // To do: Show based on variant
          showCarIcon
        />
        <span>{placeId}</span>
      </div>
    </div>
  );
};
