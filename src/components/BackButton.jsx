import { Button } from '../components/ui/button';
import arrow_left from '../assets/arrow_left.svg';


export const BackButton = ({path}) => {
  return (
    <Button variant="secondary" size="icon" className="size-8" to={path}>
      <img src={arrow_left} alt="arrow left" />
    </Button>
  );
};
