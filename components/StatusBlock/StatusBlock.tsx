interface StatusBlockProps {
  week: number;
  dayAll: number;
}

const StatusBlock = ({ week, dayAll }: StatusBlockProps) => {
  return (
    <div>
      <div>
        <span>Тиждень</span>
        <span>{week}</span>
      </div>
      <div>
        <span>Днів до зустрічі</span>
        <span>~{dayAll}</span>
      </div>
    </div>
  );
};

export default StatusBlock;
