import React from "react";

// components
import SearchBarSelect from "./SearchBarSelect";
import SearchBarInput from "./SearchBarInput";
import SearchBarInputNumber from "./SearchBarInputNumber";
import SearchBarBtn from "./SearchBarBtn";

const SearchBar = ({
  // option
  searchOption,
  searchOptionErr,
  onChangeSearchOption,
  // text
  searchText,
  searchTextErr,
  onChangeSearchText,
  // type
  searchType,
  // BTN CB
  onSearchProduct,
  onResetFilter
}) => {
  const renderInputType = () => {
    let input;
    switch (searchType) {
      case "string":
        input = (
          <SearchBarInput
            searchText={searchText}
            searchTextErr={searchTextErr}
            onChangeSearchText={onChangeSearchText}
          />
        );
        break;

      case "number":
        input = <SearchBarInputNumber />;
        break;

      case "date":
        break;

      default:
        break;
    }
    return input;
  };
  return (
    <div className="row mb-3">
      <div className="col-12">
        <SearchBarSelect
          searchOption={searchOption}
          searchOptionErr={searchOptionErr}
          onChangeSearchOption={onChangeSearchOption}
        />

        {renderInputType()}

        <SearchBarBtn
          onSearchProduct={onSearchProduct}
          onResetFilter={onResetFilter}
        />
      </div>
    </div>
  );
};

export default SearchBar;
