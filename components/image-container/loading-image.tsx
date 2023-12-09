import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LoadingImage = ({ progressAmount }: { progressAmount: number }) => {
  return (
    <div className="bg-gray-600 w-11/12 h-72 md:h-96 my-2 md:my-0 rounded-md flex items-center justify-center relative">
      <div className="w-16 h-16 animate-pulse">
        <CircularProgressbar
          value={progressAmount}
          text={`${progressAmount}%`}
          minValue={0}
          maxValue={100}
          styles={buildStyles({
            textSize: '24px',

            pathColor: '#FFD369',
            textColor: '#FFD369',
            trailColor: '#eee',
          })}
        />
      </div>
    </div>
  );
};

export default LoadingImage;
