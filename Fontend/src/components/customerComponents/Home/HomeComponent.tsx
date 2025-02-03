import { useContext } from "react";
import SpecialShoeSection from "./SpecialShoeSection";
import PopularShoeSection from "./PopularShoeSection";
import { SearchContext } from "../../../pages/customerPages/Home";

export default function HomeComponent() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "SearchContext is not available. Make sure you're using it within the SearchContext.Provider."
    );
  }
  const { searchfocus } = context;

  return (
    <>
      <div className="w-screen p-3 flex flex-col gap-4 ">
        {!searchfocus ? (
          <>
            <SpecialShoeSection />
            <PopularShoeSection />
          </>
        ) : null}
      </div>
    </>
  );
}
