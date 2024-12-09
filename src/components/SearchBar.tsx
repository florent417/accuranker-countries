import { EuiSearchBar, EuiSearchBarOnChangeArgs } from "@elastic/eui";
import { useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSearch = ({ query, error }: EuiSearchBarOnChangeArgs) => {
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setQuery(query.text);
    }
  };

  return (
    <EuiSearchBar
      box={{ placeholder: "Search by country name, ISO code or continent..." }}
      query={query}
      onChange={onSearch}
    />
  );
};
