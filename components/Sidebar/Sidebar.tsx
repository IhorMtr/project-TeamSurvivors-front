'use client';

import Link from 'next/link';
import css from './Sidebar.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type SideBarProps = {
  onClose: () => void;
  onLogout: () => void;
  user: {
    userPhotoUrl: string;
    userName: string;
    userEmail: string;
  } | null;
};

export default function Sidebar({ onClose, onLogout, user }: SideBarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className={css.wrapper}>
      <div className={css.sidebar_top}>
        <div className={css.logo_container}>
          <Image
            alt="logo lehleka"
            width={95}
            height={29}
            src="/logo-header-sidebar.png"
            unoptimized
          />
          <button
            className={`${css.btn} ${css.btn_close}`}
            type="button"
            onClick={onClose}
          >
            <svg className={css.btn_icon} width="32" height="32">
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>
        </div>

        <ul className={css.nav}>
          <li className={`${css.nav_item} ${isActive('/') ? css.active : ''}`}>
            <Link className={css.link} href="/" onClick={onClose}>
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-today" />
              </svg>
              <p className={css.nav_name}>Мій день</p>
            </Link>
          </li>

          <li
            className={`${css.nav_item} ${isActive('/journey') ? css.active : ''}`}
          >
            <Link className={css.link} href="/journey" onClick={onClose}>
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-conversion_path" />
              </svg>
              <p className={css.nav_name}>Подорож</p>
            </Link>
          </li>

          <li
            className={`${css.nav_item} ${isActive('/diary') ? css.active : ''}`}
          >
            <Link className={css.link} href="/diary" onClick={onClose}>
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-book" />
              </svg>
              <p className={css.nav_name}>Щоденник</p>
            </Link>
          </li>

          <li
            className={`${css.nav_item} ${isActive('/profile') ? css.active : ''}`}
          >
            <Link className={css.link} href="/profile" onClick={onClose}>
              <svg className={css.nav_icon} width="24" height="24">
                <use href="/icons.svg#icon-account_circle" />
              </svg>
              <p className={css.nav_name}>Профіль</p>
            </Link>
          </li>
        </ul>
      </div>

      <div className={css.sidebar_bottom}>
        {user ? (
          <div className={css.user_wrapper}>
            <Link
              className={css.profile_link}
              href="/profile"
              onClick={onClose}
            >
              <div className={css.user_photo_wrapper}>
                <Image
                  className={css.user_photo}
                  src={user.userPhotoUrl}
                  alt="user photo"
                  width={40}
                  height={40}
                />
              </div>
              <div className={css.user_name_wrapper}>
                <p className={css.user_name}>{user.userName}</p>
                <p className={css.user_email}>{user.userEmail}</p>
              </div>
            </Link>
            <button onClick={onLogout} className={css.btn}>
              <svg className={css.btn_icon} width="24" height="24">
                <use href="/icons.svg#icon-logout" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={css.user_wrapper}>
            <div className={css.login_register_wrapper}>
              <Link
                href="/auth/login"
                className={css.login_register}
                onClick={onClose}
              >
                Увійти
              </Link>
              <span>|</span>
              <Link
                href="/auth/register"
                className={css.login_register}
                onClick={onClose}
              >
                Зареєструватись
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
