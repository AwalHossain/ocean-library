import BookCards from "@/components/booksCard/BookCards";
import SortBooks from "@/components/browseBooks/SortBooks";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useFilterBooksQuery } from "../redux/feature/filter/filterApi";
import { IBook } from "../types";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "genre", href: "#" },
  { name: "publicationYear", href: "#" },
];

export default function BrowseBook() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const searchParams = new URLSearchParams();
  if (searchQuery) searchParams.append("searchTerm", searchQuery);
  if (genre) searchParams.append("genre", genre);
  if (publicationYear) searchParams.append("publicationYear", publicationYear);

  const {
    data: books,
    refetch,
    isFetching,
    isSuccess,
  } = useFilterBooksQuery(`?${searchParams.toString()}`);

  // Check if books is defined before assigning it to bookContent

  const bookContent = books?.data as IBook[];

  const debouncedRefetch = debounce(refetch, 500);

  useEffect(() => {
    // Call the debounced function whenever searchQuery, genre, or publicationYear changes
    debouncedRefetch();

    // Clean up the debounced function on unmount
    return () => {
      debouncedRefetch.cancel();
    };
  }, [genre, publicationYear, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setGenre("");
    setPublicationYear("");
  };

  return (
    <main
      className="grid grid-cols-1 md:grid-cols-12 md:gap-4 justify-center relative"
      style={{
        fontFamily: 'Copernicus, "Libre Baskerville", Georgia, serif',
      }}
    >
      {/* SideBar */}
      <section className="md:col-span-3 lg:col-span-2 ">
        <div className="md:sticky md:top-20">
          <h4 className="text-sm font-semibold ">Sort</h4>
          <div className="">
            <SortBooks />
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="md:col-span-9 lg:col-span-10 md:relative">
        <BookCards />
      </section>
    </main>
  );
}
