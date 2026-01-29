import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import logo from "../icons/logo.png";

type NavBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function NavBar({ searchTerm, onSearchChange }: NavBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div>
            <img className={styles.logo} src={logo} alt="logo" />
          </div>
          <div className={styles.links}>
            <Link to="/movies">Главная</Link>
            <Link to="/movies">Фильмы</Link>
          </div>
        </nav>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Поиск фильмов..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  );
}

export default NavBar;
