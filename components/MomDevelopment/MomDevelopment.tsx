import styles from "./MomDevelopment.module.css";
import {useState} from 'react';

interface Task {
id: number;
date: string;
text: string;
completed: boolean;
}
export default function MomDevelopment() {

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, date: "22.07", text: "Записатися на другий плановий скринінг за 3 дні", completed: false },
    { id: 2, date: "22.07", text: "Прийняти вітаміни для вагітних", completed: false },
    { id: 3, date: "22.07", text: "Відвідати плановий скринінг", completed: false },
    { id: 4, date: "22.07", text: "30-хвилинна прогулянка в парку", completed: false },
    { id: 5, date: "22.07", text: "Записати в щоденник перші відчутні рухи", completed: false },
    { id: 6, date: "22.07", text: "Здати аналіз крові на гемоглобін", completed: false },
    { id: 7, date: "22.07", text: "Почати складати список покупок для малюка", completed: false },
    { id: 8, date: "22.07", text: "Купити зручний одяг для вагітних", completed: false },
    { id: 9, date: "22.07", text: "Розповісти новину батькам", completed: false },
    { id: 10, date: "22.07", text: "Знайти гарну книгу про розвиток дитини", completed: false },
    { id: 11, date: "22.07", text: "Здати аналізи", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed } : task ));
  };



  return (
    <div className={styles.momDevelopment}>
      {/* Frame - верхний блок с двумя колонками */}
      <div className={styles.frame}>
        {/* Column 1 - Як ви можете почуватись */}
        <div className={styles.columnFeel}>
          <div className={styles.feelContainer}>
            {/* Заголовок */}
            <h2 className={styles.feelTitle}>Як ви можете почуватись</h2>
            
            {/* Тэги */}
            <div className={styles.tagsContainer}>
              <div className={styles.tag}><span className={styles.tagText}>Нудота</span></div>
              <div className={styles.tag}><span className={styles.tagText}>Втома</span></div>
              <div className={styles.tag}><span className={styles.tagText}>Мінливий настрій</span></div>
            </div>
            
            {/* Описание */}
            <p className={styles.feelDescription}>
              Ви можете відчувати легке потягування внизу живота. Ранкова нудота може все ще турбувати, але скоро має піти на спад. Настрій може бути мінливим — це нормально.
            </p>
          </div>
        </div>

         {/* Column 2 - Поради для вашого комфорту */}
         <div className={styles.columnAdvice}>
          <div className={styles.adviceContainer}>
            <h2 className={styles.adviceTitle}>Поради для вашого комфорту</h2>
            
            {/* Совет 1 */}
            <div className={styles.adviceItem}>
              <div className={styles.adviceIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.73114 22.1487C6.48947 22.1487 6.2878 22.0669 6.12614 21.9032C5.96464 21.7396 5.88389 21.5375 5.88389 21.297V12.7702C4.88605 12.5201 4.10114 12.0468 3.52914 11.3505C2.9573 10.6542 2.67139 9.83942 2.67139 8.90625V2.6775C2.67139 2.44383 2.7518 2.2465 2.91264 2.0855C3.07347 1.92433 3.27055 1.84375 3.50389 1.84375C3.73722 1.84375 3.93372 1.92433 4.09339 2.0855C4.25289 2.2465 4.33264 2.44383 4.33264 2.6775V8.05475H5.90764V2.6775C5.90764 2.44383 5.98814 2.2465 6.14914 2.0855C6.30997 1.92433 6.50705 1.84375 6.74039 1.84375C6.97372 1.84375 7.17014 1.92433 7.32964 2.0855C7.4893 2.2465 7.56914 2.44383 7.56914 2.6775V8.05475H9.16914V2.6775C9.16914 2.44383 9.24955 2.2465 9.41039 2.0855C9.57139 1.92433 9.76855 1.84375 10.0019 1.84375C10.2352 1.84375 10.4316 1.92433 10.5911 2.0855C10.7508 2.2465 10.8306 2.44383 10.8306 2.6775V8.8945C10.8306 9.83133 10.5426 10.6449 9.96664 11.3352C9.3908 12.0257 8.59764 12.5018 7.58714 12.7635V21.297C7.58714 21.5375 7.50489 21.7396 7.34039 21.9032C7.17589 22.0669 6.9728 22.1487 6.73114 22.1487ZM17.3366 22.1487C17.0953 22.1487 16.8938 22.0669 16.7321 21.9032C16.5706 21.7396 16.4899 21.5375 16.4899 21.297V12.3387C15.5359 11.9991 14.7737 11.3679 14.2034 10.4453C13.6331 9.52258 13.3479 8.43058 13.3479 7.16925C13.3479 5.68858 13.7378 4.43083 14.5176 3.396C15.2976 2.36117 16.2389 1.84375 17.3414 1.84375C18.4441 1.84375 19.3853 2.36292 20.1651 3.40125C20.945 4.43975 21.3349 5.69575 21.3349 7.16925C21.3349 8.42825 21.0497 9.52058 20.4794 10.4462C19.9092 11.3721 19.1491 12.0117 18.1991 12.365V21.297C18.1991 21.5375 18.1157 21.7396 17.9489 21.9032C17.7819 22.0669 17.5778 22.1487 17.3366 22.1487Z" fill="black" />
                </svg>
              </div>
              <div className={styles.adviceContent}>
                <h3 className={styles.adviceItemTitle}>Харчування</h3>
                <p className={styles.adviceItemText}>Зосередьтесь на продуктах, багатих на вітамін C (цитрусові, ківі), він допомагає тілу засвоювати залізо.</p>
              </div>
            </div>

            {/* Совет 2 */}
            <div className={styles.adviceItem}>
              <div className={styles.adviceIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.72983 7.91681L3.75257 10.8938C3.58657 11.0598 3.39466 11.1418 3.17682 11.1398C2.95882 11.1378 2.76682 11.0538 2.60082 10.8878C2.45166 10.7386 2.37391 10.5509 2.36757 10.3246C2.36124 10.0982 2.43266 9.90215 2.58182 9.73631L3.42207 8.87706L2.62482 8.07381C2.45482 7.90381 2.36982 7.7039 2.36982 7.47406C2.36982 7.24423 2.45482 7.04431 2.62482 6.87431L4.15907 5.34006L3.71182 4.89881C3.53782 4.72881 3.45082 4.5289 3.45082 4.29906C3.45082 4.06923 3.53582 3.87131 3.70582 3.70531C3.85899 3.54798 4.05374 3.46614 4.29007 3.45981C4.52624 3.45348 4.72932 3.52698 4.89932 3.68031L5.36557 4.13356L6.87483 2.62431C7.04483 2.45431 7.24474 2.36931 7.47457 2.36931C7.70441 2.36931 7.90632 2.45431 8.08033 2.62431L8.87757 3.42156L9.74283 2.57531C9.90866 2.42614 10.1016 2.35156 10.3216 2.35156C10.5416 2.35156 10.7325 2.43248 10.8943 2.59431C11.0603 2.76431 11.1433 2.95831 11.1433 3.17631C11.1433 3.39415 11.0603 3.58606 10.8943 3.75206L7.92307 6.72331L17.2758 16.0761L20.2471 13.1048C20.4131 12.9388 20.606 12.8558 20.8258 12.8558C21.0458 12.8558 21.2388 12.9388 21.4048 13.1048C21.554 13.254 21.6317 13.4427 21.6381 13.6711C21.6444 13.8994 21.573 14.0945 21.4238 14.2563L20.5776 15.1216L21.3748 15.9188C21.5448 16.0928 21.6298 16.2947 21.6298 16.5246C21.6298 16.7544 21.5448 16.9543 21.3748 17.1243L19.8156 18.6836L20.2688 19.1248C20.4388 19.2948 20.5238 19.4947 20.5238 19.7246C20.5238 19.9544 20.4388 20.1523 20.2688 20.3183C20.099 20.4883 19.9001 20.5733 19.6721 20.5733C19.4442 20.5733 19.2453 20.4863 19.0753 20.3123L18.6341 19.8651L17.1248 21.3743C16.9548 21.5443 16.7549 21.6293 16.5251 21.6293C16.2952 21.6293 16.0953 21.5443 15.9253 21.3743L15.1221 20.5771L14.2568 21.4233C14.091 21.5725 13.8991 21.6461 13.6811 21.6441C13.4631 21.6421 13.2732 21.5601 13.1113 21.3983C12.9413 21.2323 12.8563 21.0403 12.8563 20.8223C12.8563 20.6045 12.9413 20.4106 13.1113 20.2406L16.0823 17.2693L6.72983 7.91681Z" fill="black" />
                </svg>
              </div>
              <div className={styles.adviceContent}>
                <h3 className={styles.adviceItemTitle}>Фізична активність</h3>
                <p className={styles.adviceItemText}>Якщо почуваєтесь добре, спробуйте йогу для вагітних. Вона допомагає розслабитись і зняти напругу.</p>
              </div>
            </div>

            {/* Совет 3 */}
            <div className={styles.adviceItem}>
              <div className={styles.adviceIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.0635 21.4485C4.836 21.4485 4.63733 21.3621 4.4675 21.1893C4.2975 21.0166 4.2125 20.8161 4.2125 20.5878V19.475H3.8875C3.08517 19.475 2.40333 19.1943 1.842 18.6328C1.28067 18.0714 1 17.3897 1 16.5875V10.4875C1 9.62817 1.25733 8.96708 1.772 8.50425C2.28667 8.04125 2.896 7.79583 3.6 7.768V5.7375C3.6 4.93267 3.855 4.27517 4.365 3.765C4.87517 3.255 5.53267 3 6.3375 3H17.9625C18.7673 3 19.4207 3.255 19.9225 3.765C20.4242 4.27517 20.675 4.93267 20.675 5.7375V7.768C21.379 7.79583 21.9883 8.04125 22.503 8.50425C23.0177 8.96708 23.275 9.62817 23.275 10.4875V16.5875C23.275 17.3897 22.9942 18.0714 22.4328 18.6328C21.8714 19.1943 21.1897 19.475 20.3875 19.475H20.0625V20.5878C20.0625 20.8161 19.9775 21.0166 19.8075 21.1893C19.6377 21.3621 19.4387 21.4485 19.2108 21.4485C18.9829 21.4485 18.7841 21.3621 18.6143 21.1893C18.4443 21.0166 18.3593 20.8161 18.3593 20.5878V19.475H5.92175V20.5895C5.92175 20.8182 5.83558 21.0185 5.66325 21.1905C5.49108 21.3625 5.29117 21.4485 5.0635 21.4485ZM3.8875 17.7718H20.3875C20.7022 17.7718 20.9783 17.6524 21.2157 17.4137C21.4531 17.1751 21.5718 16.8997 21.5718 16.5875V10.4875C21.5718 10.1757 21.4776 9.92533 21.2893 9.7365C21.1009 9.54767 20.8503 9.45325 20.5373 9.45325C20.2241 9.45325 19.9735 9.54767 19.7855 9.7365C19.5973 9.92533 19.5033 10.1757 19.5033 10.4875V14.9532H4.77175V10.4875C4.77175 10.1757 4.67758 9.92533 4.48925 9.7365C4.30092 9.54767 4.05025 9.45325 3.73725 9.45325C3.42408 9.45325 3.1735 9.54767 2.9855 9.7365C2.79733 9.92533 2.70325 10.1757 2.70325 10.4875V16.5875C2.70325 16.8997 2.82258 17.1751 3.06125 17.4137C3.29992 17.6524 3.57533 17.7718 3.8875 17.7718ZM6.475 13.25H17.8V10.4875C17.8 9.9555 17.9214 9.50617 18.1643 9.1395C18.4073 8.773 18.6764 8.4805 18.9718 8.262V5.7375C18.9718 5.42283 18.8781 5.17175 18.6908 4.98425C18.5033 4.79692 18.2543 4.70325 17.944 4.70325H6.331C6.02317 4.70325 5.77492 4.79692 5.58625 4.98425C5.39758 5.17175 5.30325 5.42283 5.30325 5.7375V8.262C5.59858 8.4805 5.86775 8.773 6.11075 9.1395C6.35358 9.50617 6.475 9.9555 6.475 10.4875V13.25Z" fill="black" />
                </svg>
              </div>
              <div className={styles.adviceContent}>
                <h3 className={styles.adviceItemTitle}>Відпочинок</h3>
                <p className={styles.adviceItemText}>Не соромтесь просити про допомогу і більше відпочивайте, коли відчуваєте втому.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task block - нижний блок */}
      <div className={styles.taskBlock}>
        <div className={styles.taskContainer}>
          {/* Заголовок и кнопка */}
          <div className={styles.taskHeader}>
            <h3 className={styles.taskTitle}>Важливі завдання</h3>
            <button className={styles.addButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2893 12.885V16.2492C11.2893 16.4719 11.3642 16.6586 11.5138 16.8092C11.6637 16.9598 11.8523 17.035 12.0796 17.035C12.3068 17.035 12.4938 16.9606 12.6406 16.8117C12.7874 16.6627 12.8608 16.4747 12.8608 16.2477V12.885H16.2501C16.4728 12.885 16.6594 12.8102 16.8101 12.6605C16.9606 12.5107 17.0358 12.3221 17.0358 12.0947C17.0358 11.8676 16.9614 11.6806 16.8126 11.5337C16.6636 11.3869 16.4756 11.3135 16.2486 11.3135H12.8608V7.74925C12.8608 7.52658 12.786 7.33992 12.6363 7.18925C12.4865 7.03875 12.2979 6.9635 12.0706 6.9635C11.8434 6.9635 11.6564 7.03792 11.5096 7.18675C11.3628 7.33575 11.2893 7.52375 11.2893 7.75075V11.3135H7.75009C7.52742 11.3135 7.34075 11.3883 7.19009 11.538C7.03959 11.6878 6.96434 11.8764 6.96434 12.1037C6.96434 12.3309 7.03875 12.5179 7.18759 12.6647C7.33659 12.8116 7.52459 12.885 7.75159 12.885H11.2893ZM12.0076 22.1487C10.6043 22.1487 9.28725 21.8831 8.05659 21.3517C6.82592 20.8204 5.74959 20.0938 4.82759 19.1718C3.90559 18.2498 3.17892 17.1731 2.64759 15.9417C2.11625 14.7104 1.85059 13.3923 1.85059 11.9875C1.85059 10.5828 2.11625 9.2645 2.64759 8.0325C3.17892 6.80067 3.90525 5.72783 4.82659 4.814C5.74792 3.9 6.82442 3.1765 8.05609 2.6435C9.28775 2.11033 10.6062 1.84375 12.0113 1.84375C13.4163 1.84375 14.7351 2.11017 15.9676 2.643C17.1999 3.17583 18.2728 3.89892 19.1863 4.81225C20.1 5.72558 20.8233 6.79958 21.3561 8.03425C21.8891 9.26892 22.1556 10.5883 22.1556 11.9925C22.1556 13.3965 21.889 14.7137 21.3558 15.9442C20.8228 17.1749 20.0993 18.2495 19.1853 19.168C18.2715 20.0863 17.1976 20.8127 15.9636 21.3472C14.7296 21.8816 13.4109 22.1487 12.0076 22.1487ZM12.0126 20.4455C14.3549 20.4455 16.3462 19.6226 17.9863 17.9767C19.6263 16.3307 20.4463 14.3341 20.4463 11.9867C20.4463 9.64442 19.6278 7.65317 17.9908 6.013C16.354 4.373 14.3561 3.553 11.9971 3.553C9.66109 3.553 7.66984 4.3715 6.02334 6.0085C4.377 7.64533 3.55384 9.64325 3.55384 12.0022C3.55384 14.3382 4.37675 16.3295 6.02259 17.976C7.66859 19.6223 9.66525 20.4455 12.0126 20.4455Z" fill="black" />
              </svg>
            </button>
          </div>

          {/* Список задач */}
          {/* <ul className={styles.tasksList}>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Записатися на другий плановий скринінг за 3 дні</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Прийняти вітаміни для вагітних</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Відвідати плановий скринінг</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>30-хвилинна прогулянка в парку</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Записати в щоденник перші відчутні рухи</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Здати аналіз крові на гемоглобін</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Почати складати список покупок для малюка</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Купити зручний одяг для вагітних</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Розповісти новину батькам</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Знайти гарну книгу про розвиток дитини</span>
              </div>
            </li>
            <li className={styles.taskItem}>
              <div className={styles.taskDate}>22.07</div>
              <div className={styles.taskContent}>
                <div className={styles.checkbox}></div>
                <span className={styles.taskText}>Здати аналізи</span>
              </div>
            </li>
          </ul> */}

<ul className={styles.tasksList}>
            {tasks.map(task => (
              <li 
                key={task.id} 
                className={styles.taskItem}
                onClick={() => toggleTask(task.id)}
              >
                <div className={styles.taskDate}>{task.date}</div>
                <div className={styles.taskContent}>
                  <div className={`${styles.checkbox} ${task.completed ? styles.checkboxChecked : ''}`}>
                    {task.completed && (
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.57181 8.65637L1.37339 5.45795L0 6.83134L4.57181 11.4031L14 1.97495L12.6266 0.601562L4.57181 8.65637Z" fill="white"/>
                      </svg>
                    )}
                  </div>
                  <span className={`${styles.taskText} ${task.completed ? styles.taskTextCompleted : ''}`}>
                    {task.text}
                  </span>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}