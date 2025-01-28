import { createContext, useState } from "react";
import Header from "../../components/customerComponents/Header/Header";
import Body from "../../components/customerComponents/Body/body";
import Navbar from "../../components/customerComponents/Navbar/Navbar";
import AdminBody from "../../components/adminComponents/Body/AdminBody";

type SearchContextType = {
  searchfocus: boolean;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function HomePage() {
  const [searchfocus, setSearchFocus] = useState(false);
  const is_admin = sessionStorage.getItem("is_admin");
  return (
    <SearchContext.Provider value={{ searchfocus, setSearchFocus }}>
      <Header />
      <Body />
      <Navbar />
    </SearchContext.Provider>
  );
}

export { SearchContext };
