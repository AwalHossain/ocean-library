import { toast } from "react-toastify";
import { useAddToFinishedListMutation, useGetFinishedListQuery, useGetReadingListQuery } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";

export default function ReadlingList() {
    const [addToFinishedList] = useAddToFinishedListMutation();
    const {data}  = useGetFinishedListQuery(undefined)
    const { data:fini } = useGetReadingListQuery(undefined);
  const {readingList, finishedList}  = useAppSelector((state) => state.userBookState);

  
    const onUpdateReadingList = async (bookId: string) => {
      const payload = {bookId: bookId };
    const result = await addToFinishedList(payload);
    console.log(result,'result');
    
    if ((result as { data: any; }).data?.success) {
       toast.success("Congratulation! You've read another book ");
       
    }
    };
  
    return (
        <div className="min-h-[80vh]">
        <div className="mt-14 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Reading List</h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-neutral">
              {/* head */}
              <thead>
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Author</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                readingList?.length! > 0 ?
                readingList?.map((book:IBook, idx:number) => (
                  <tr key={book._id} className={idx % 2 === 0 ? "bg-neutral-light" : ""}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">
                      {finishedList?.some((finish:IBook) => book._id === finish._id) ? (
                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded-full">
                          Done
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-full">
                          Not Yet
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onUpdateReadingList(book._id)}
                        // disabled={book.completedReading}
                        className={`${
                            finishedList?.some((finish:IBook) => book._id === finish._id)  ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        } text-white px-4 py-2 rounded-lg font-semibold`}
                      >
                        Mark Done
                      </button>
                    </td>
                  </tr>
                ))
                        : (
                          <div className='flex flex-col items-center justify-center my-12'>
                              <h1 className='text-3xl font-bold text-gray-600'>No Books in ReadingList</h1>
                          </div>
                      )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    );
  }