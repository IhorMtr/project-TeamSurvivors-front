import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

type Props = { onOpenSidebar: () => void };

export default function Header({ onOpenSidebar }: Props) {
  return (
    <div className={css.wrapper}>
      <Link href="/">
        <Image src="/logo-header-sidebar.png" alt="lehleka logo" width="76" height="24" />
      </Link>
      <button className={css.button} type="button" onClick={onOpenSidebar} aria-label="Відкрити меню">
        <svg className={css.burger} width="32" height="32">
          <use href="/icons.svg#icon-menu"></use>
        </svg>
      </button>
    </div>
  );
}

