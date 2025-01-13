import { createContext, useState } from "react";
import Header from "../components/Header/Header";
import Body from "../components/Body/body";
import Navbar from "../components/Navbar/Navbar";

type SearchContextType = {
  searchfocus: boolean;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function HomePage() {
  const [searchfocus, setSearchFocus] = useState(false);

  return (
    <SearchContext.Provider value={{ searchfocus, setSearchFocus }}>
      <Header />
      <Body />
      <Navbar />
    </SearchContext.Provider>
  );
}

export { SearchContext };
