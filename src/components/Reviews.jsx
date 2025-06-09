import star from '../assets/star.svg';

export const Reviews = ({totalScore, reviewsCount}) => {
  return(
    <div className="flex flex-row gap-2">
      <span>{totalScore}</span>
      <img src={star} alt="star icon" className='w-4'/>
      <span>({reviewsCount})</span>
    </div>

  )
}
