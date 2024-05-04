import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IBooksPagination {
  setPage: (page: number) => void;
  currentPage: number;
  total: number;
  limit?: number;
}

export function BooksPagination({
  setPage,
  currentPage = 1,
  total,
  limit,
}: IBooksPagination) {
  const totalPages = Math.ceil(total! / limit!);
  console.log(totalPages, "totalPages");

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault;
              if (currentPage && currentPage > 1) {
                setPage(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        {/* {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )} */}

        {
          Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => setPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )) // Display only 3 pages at a time
        }
        {/* {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )} */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault;
              if (currentPage && currentPage < totalPages) {
                setPage(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
