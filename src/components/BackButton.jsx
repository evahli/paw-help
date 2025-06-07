import { Button } from '../components/ui/button';
import arrow_left from '../assets/arrow_left.svg';


export const BackButton = ({path, ...props}) => {
  return (
    <Button variant='transparent' size="icon" className="size-8" to={path} {...props}>
      <img src={arrow_left} alt="arrow left" />
    </Button>
  );
};
