import Link from 'next/link';
import css from './Sidebar.module.css';
import Image from 'next/image';
import { useState } from 'react';

type SideBarProps = {
  onClose: () => void;
};

type User = {
  userPhotoUrl: string;
  userName: string;
  userEmail: string;
};

export default function Sidebar({ onClose }: SideBarProps) {
  const [isUser, setIsUser] = useState(true);
  const user: User = {
    userPhotoUrl: '/avatar-test.png',
    userName: 'Ганна',
    userEmail: 'hanna@gmail.com',
  };
  const handleLogout = () => {
    return null;
  };

  return (
    <div className={css.wrapper}>
      <div className={css.sidebar_top}>
        <div className={css.logo_container}>
          <Image
            alt="logo lehleka"
            width="95"
            height="29"
            src="/logo-header-sidebar.png"
          />
          <button className={css.btn} type="button" onClick={() => onClose()}>
            <svg className={css.btn_icon} width="32" height="32">
              <use href="/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <ul className={css.nav}>
          <li className={css.nav_item}>
            <Link className={css.link} href="/">
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-today"></use>
              </svg>
              <p className={css.nav_name}>Мій день</p>
            </Link>
          </li>
          <li className={css.nav_item}>
            <Link className={css.link} href="/">
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-conversion_path"></use>
              </svg>
              <p className={css.nav_name}>Подорож</p>
            </Link>
          </li>
          <li className={css.nav_item}>
            <Link className={css.link} href="/">
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-book"></use>
              </svg>
              <p className={css.nav_name}>Щоденник</p>
            </Link>
          </li>
          <li className={css.nav_item}>
            <Link className={css.link} href="/">
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-account_circle"></use>
              </svg>
              <p className={css.nav_name}>Профіль</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.sidebar_bottom}>
        {isUser ? (
          <div className={css.user_wrapper}>
            <Link className={css.profile_link} href="/profile">
              <div className={css.user_photo_wrapper}>
                <Image
                  className={css.user_photo}
                  src={user.userPhotoUrl}
                  alt="user photo"
                  width={40}
                  height={40}
                ></Image>
              </div>
              <div className={css.user_name_wrapper}>
                <p className={css.user_name}>{user.userName}</p>
                <p className={css.user_email}>{user.userEmail}</p>
              </div>
            </Link>
            <button onClick={() => handleLogout()} className={css.btn}>
              <svg className={css.btn_icon} width="24" height="24">
                <use href="/icons.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
        ) : (
          <div className={css.user_wrapper}>
            <div className={css.login_register_wrapper}>
              <Link href="/login" className={css.login_register}>
                Увійти
              </Link>
              <span>|</span>
              <Link href="/register" className={css.login_register}>
                Зареєструватись
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
