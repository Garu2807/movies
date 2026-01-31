import styles from "./Filters.module.css";
import { ratingOptions, yearOptions } from "../hooks/useFilters";
import type { FiltersState } from "../hooks/useFilters";

type FiltersProps = {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
};

const GENRES = [
  "Фантастика",
  "Боевик",
  "Драма",
  "Фэнтези",
  "Криминал",
  "Триллер",
  "Вестерн",
];

function Filters({ filters, onChange }: FiltersProps) {
  const update = (patch: Partial<FiltersState>) =>
    onChange({ ...filters, ...patch });

  return (
    <section className={styles.filters}>
      <div className={styles.row}>
        <label className={styles.filterItem}>
          {!filters.genre && (
            <span className={styles.labelText}>Жанр</span>
          )}
          {filters.genre && (
            <>
              <span className={styles.value}>{filters.genre}</span>
              <button
                className={styles.clearBtn}
                type="button"
                onClick={() => update({ genre: "" })}
              >
                ✕
              </button>
            </>
          )}
          <select
            className={styles.select}
            value={filters.genre}
            onChange={(e) => update({ genre: e.target.value })}
          >
            <option value="">Все</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filterItem}>
          {!filters.yearRange && (
            <span className={styles.labelText}>Год выхода</span>
          )}
          {filters.yearRange && (
            <>
              <span className={styles.value}>{filters.yearRange}</span>
              <button
                className={styles.clearBtn}
                type="button"
                onClick={() => update({ yearRange: "" })}
              >
                ✕
              </button>
            </>
          )}
          <select
            className={styles.select}
            value={filters.yearRange}
            onChange={(e) => update({ yearRange: e.target.value })}
          >
            <option value="">Все</option>
            {yearOptions.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.filterItem}>
          {!filters.ratingFrom && (
            <span className={styles.labelText}>Рейтинг</span>
          )}
          {filters.ratingFrom && (
            <>
              <span className={styles.value}>{filters.ratingFrom}</span>
              <button
                className={styles.clearBtn}
                type="button"
                onClick={() => update({ ratingFrom: "" })}
              >
                ✕
              </button>
            </>
          )}
          <select
            className={styles.select}
            value={filters.ratingFrom}
            onChange={(e) => update({ ratingFrom: e.target.value })}
          >
            <option value="">Все</option>
            {ratingOptions.map((rating) => (
              <option key={`rfrom-${rating}`} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>

        <button
          className={styles.reset}
          type="button"
          onClick={() =>
            onChange({
              genre: "",
              yearRange: "",
              ratingFrom: "",
            })
          }
        >
          Сбросить
        </button>
      </div>
    </section>
  );
}

export default Filters;
