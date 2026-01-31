import { useMemo, useState } from "react";

export type FiltersState = {
  genre: string;
  yearRange: string;
  ratingFrom: string;
};

export const yearOptions = ["1900-1999", "2000-2009", "2010-2019", "2020-2023"];
export const ratingOptions = Array.from({ length: 7 }, (_, i) =>
  (6 + i * 0.5).toFixed(1),
);

const DEFAULT_FILTERS: FiltersState = {
  genre: "",
  yearRange: "",
  ratingFrom: "",
};

function createFilters() {
  return { ...DEFAULT_FILTERS };
}

function useFilters() {
  const [filters, setFilters] = useState<FiltersState>(createFilters);

  const helpers = useMemo(
    () => ({
      update: (patch: Partial<FiltersState>) =>
        setFilters((prev) => ({ ...prev, ...patch })),
      reset: () => setFilters(createFilters()),
    }),
    [],
  );

  return { filters, setFilters, ...helpers };
}

export default useFilters;
