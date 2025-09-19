import Link from 'next/link';
import css from './Sidebar.module.css';
import Image from 'next/image';


type SideBarProps = {
  onClose: () => void,
}



export default function Sidebar({onClose}: SideBarProps) {


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
          <button className={css.btn_close} type="button" onClick={() => onClose()}>
            <svg className={css.btn_close_icon} width="32" height="32">
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
      <div className={css.sidebar_bottom}>Bottom</div>
    </div>
  );
}
