import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../gql/getCountries";
import { Country } from "../models/Country";
import {
  Comparators,
  CriteriaWithPagination,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiLoadingSpinner,
  EuiSearchBar,
  EuiSearchBarOnChangeArgs,
  EuiSpacer,
  EuiTableSortingType,
  QueryType,
} from "@elastic/eui";
import { useMemo, useState } from "react";
import styles from "./Countries.module.css";

const columns: Array<EuiBasicTableColumn<Country>> = [
  {
    field: "name",
    name: "Country Name",
    sortable: true,
    truncateText: true,
  },
  {
    field: "code",
    name: "ISO Code",
    sortable: true,
  },
  {
    field: "continent.name",
    name: "Continent",
    truncateText: true,
    sortable: true,
  },
  {
    field: "emoji",
    name: "Flag",
    sortable: false,
    render: (emoji: string) => (
      <span style={{ fontSize: "3rem" }}>{emoji}</span>
    ),
  },
];

export const CountriesList = () => {
  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    GET_COUNTRIES
  );

  const [sortField, setSortField] = useState<keyof Country>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<QueryType | undefined>(undefined);

  const onTableChange = ({ sort }: CriteriaWithPagination<Country>) => {
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection as "asc" | "desc");
    }
  };

  const onSearch = ({ query }: EuiSearchBarOnChangeArgs) => {
    if (query) {
      console.log("test");
      setFilter(query.text);
    }
  };

  const sortedData = useMemo(() => {
    if (!data || !data?.countries) return [];

    let filteredData;
    if (filter) {
      filteredData = data!.countries.filter((country) => {
        const filterLowerCaseString = filter.toString().toLowerCase();
        const countryHasFilterIncluded =
          country.name.toLowerCase().includes(filterLowerCaseString) ||
          country.code.toLowerCase().includes(filterLowerCaseString) ||
          country.continent.name.toLowerCase().includes(filterLowerCaseString);
        return countryHasFilterIncluded;
      });
    }

    const dataToSort = filter ? filteredData : [...data.countries];

    return dataToSort!.sort(
      Comparators.property(sortField, Comparators.default(sortDirection))
    );
  }, [data, sortField, sortDirection, filter]);

  const sorting: EuiTableSortingType<Country> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  // INFO: I have no idea why the styles get overwritten,
  // but I had to resort to using the "style" property instead...
  if (loading)
    return (
      <div
        className={styles.spinnerContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "full",
          margin: "auto",
        }}
      >
        <EuiLoadingSpinner size="xxl" />
        <p className={styles.spinnerText} style={{ fontSize: "24px" }}>
          Loading countries...
        </p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        width: "80%",
        margin: "6rem auto 6rem",
      }}
    >
      <EuiSearchBar
        query={filter}
        onChange={onSearch}
        box={{
          placeholder: "Search by country name, ISO code or continent...",
          fullWidth: false,
          incremental: true,
        }}
      />
      <EuiSpacer size="m" />
      <EuiBasicTable
        items={sortedData}
        columns={columns}
        sorting={sorting}
        onChange={onTableChange}
        tableLayout="auto"
      />
    </div>
  );
};
