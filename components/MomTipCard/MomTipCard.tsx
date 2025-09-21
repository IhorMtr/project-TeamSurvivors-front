interface MomTipCardProps {
  dailyTip: string;
}

const MomTipCard = ({ dailyTip }: MomTipCardProps) => {
  return (
    <div>
      <h2>Порада для мами</h2>
      <p>{dailyTip}</p>
    </div>
  );
};

export default MomTipCard;
