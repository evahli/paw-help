import { PageHeader } from '../components/PageHeader';
import { DetailPageBody } from '../components/DetailPageBody';

export const DetailPage = () => {
  const mockData = {
    title: 'Veterinární Výjezdy - MVDr. Evžen Šonský',
    categoryName: 'Veterinář',
    address: 'Králodvorská 1084, 110 00 Staré Město, Česko',
    website: 'http://www.veterinarni-vyjezdy.eu/',
    phone: '+420 723 285 820',
    totalScore: 4.7,
    reviewsCount: 13,
    openingHours: [
      {
        day: 'středa',
        hours: '9 to 20',
      },
      {
        day: 'čtvrtek',
        hours: '9 to 20',
      },
      {
        day: 'pátek',
        hours: '9 to 20',
      },
      {
        day: 'sobota',
        hours: '9 to 17',
      },
      {
        day: 'neděle',
        hours: 'Zavřeno',
      },
      {
        day: 'pondělí',
        hours: '9 to 20',
      },
      {
        day: 'úterý',
        hours: '9 to 20',
      },
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nof2WeJWcCsHWQ9jJSct6Nsfut1rAyBKVu6N4IXiw_ncqCV7QTYUs5aV9Fn3c7fu6ImVI7wuMFC-bricnKj50LmjLAEtmvSq4kUamhF7OaWn5m9C2idp8-3Yfbo31QEPRMmSOYC=w408-h725-k-no',
  };

  return (
    <div>
      <PageHeader categoryName={mockData.categoryName} />
      <div>
        <img
          src={mockData.imageUrl}
          alt="placeholder"
          width="385px"
          className="rounded-md"
        />
        <DetailPageBody
          title={mockData.title}
          // To do: Reviews component
          totalScore={mockData.totalScore}
          categoryName={mockData.categoryName}
          address={mockData.address}
          // To do: openingHours component
          openingHours="Otevreno"
          website={mockData.website}
          phone={mockData.phone}
          // To do: Show based on variant
          showCarIcon
        />
      </div>
    </div>
  );
};
