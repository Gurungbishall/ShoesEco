import { createContext, useState } from "react";
import Header from "../../components/customerComponents/Header/Header";
import HomeComponent from "../../components/customerComponents/Home/HomeComponent";
import Navbar from "../../components/customerComponents/Navbar/Navbar";

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
      <HomeComponent />
      <Navbar />
    </SearchContext.Provider>
  );
}

export { SearchContext };
