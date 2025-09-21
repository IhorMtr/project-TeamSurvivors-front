interface BabyTodayCardProps {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
}

const BabyTodayCard = ({
  image,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
}: BabyTodayCardProps) => {
  return (
    <div>
      <h2>Малюк сьогодні</h2>
      <div>
        <div>
          <img src={image} alt="Малюк" />
        </div>
        <div>
          <p>
            <span>Розмір:</span>Приблизно {babySize} см.
          </p>
          <p>
            <span>Вага:</span>Близько {babyWeight} грамів.
          </p>
          <p>
            <span>Активність:</span>
            {babyActivity}
          </p>
        </div>
      </div>
      <p>{babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
