import css from './TasksReminderCard.module.css';

interface Task {
  _id: string;
  status: boolean;
  text: string;
  dueDate: string;
}

interface TasksReminderCardProps {
  tasks: Task[];
}

const TasksReminderCard = ({ tasks }: TasksReminderCardProps) => {
  return (
    <div>
      <div>
        <h2>Важливі завдання</h2>
        {/* <button> */}
        <svg className={css.svg} width={18} height={18}>
          <use href="/icons.svg#add_circle"></use>
        </svg>
        {/* </button> */}
      </div>
      {tasks.length === 0 && (
        <div>
          <div>
            <span>Наразі немає жодних завдань</span>
            <span>Створіть мершій нове завдання!</span>
          </div>
          <div>
            <button type="button">Створити завдання</button>
          </div>
        </div>
      )}
      {tasks.length > 0 && (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <input
                type="checkbox"
                name={`task-${task._id}`}
                id={`task-${task._id}`}
              />
              <span>{task.text}</span>
              <span>{task.dueDate}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksReminderCard;
