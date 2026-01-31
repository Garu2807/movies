import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../icons/logo.png";

type NavBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function NavBar({ searchTerm, onSearchChange }: NavBarProps) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;
        const nearTop = currentY < 80;

        if (nearTop) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}
    >
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div>
            <img className={styles.logo} src={logo} alt="logo" />
          </div>
        </nav>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Поиск фильмов..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
}

export default NavBar;
