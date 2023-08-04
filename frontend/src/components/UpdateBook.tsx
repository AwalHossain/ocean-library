import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEditBookMutation, useGetSingleBookQuery } from '../redux/feature/filter/filterApi';
import { IBook } from '../types';

function 
UpdateBook() {
    const {bookId} = useParams();
    const { data: book } = useGetSingleBookQuery(bookId)
    const [editBook,{isLoading, isSuccess, isError}] = useEditBookMutation()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<IBook>();

      const onSubmit =  (data: IBook) => {
        const payload = { ...data, bookId:bookId };
        console.log(data,'check');
        
        editBook(payload)
        setTimeout(() => {
          navigate("/books");
        }, 1500);
      };

      useEffect(() => {
        if (isSuccess)
          toast.success(`Successfully updated book: ${book?.title}`);
        if (isError)
          toast.error(`Failed to updated book: ${book?.title}`);
      }, [isSuccess, isError]);
  return (
    <div>
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              defaultValue={book?.title}
              placeholder="A Life to Remember"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              defaultValue={book?.author}
              placeholder="Awal Hossain"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-1">
              Genre
            </label>
            <select
            defaultValue={book?.genre}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              {...register("genre")}
            >
              <option selected>Self-Help</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Religion</option>
              <option>Novel</option>
              <option>Academic</option>
              <option>Classic</option>
              <option>Sci-Fi</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-1">
             Publication Year
            </label>
            <input
            defaultValue={book?.publicationYear}
        type="number"
        placeholder="2023"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        {...register("publicationYear", {
          min: {
            value: 1000,
            message: "Invalid Year",
          },
          max: {
            value: new Date().getFullYear(),
            message: "Invalid Year",
          },
        })}
      />
            {errors.publicationYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publicationYear.message}
              </p>
            )}
          </div>
          <div className="form-control">
      <label className="block text-gray-700 font-semibold mb-1">
        Thumbnail
      </label>
      <input
        type="text"
        defaultValue={book?.thumbnail}
        placeholder="https://example.com/book-thumbnail.jpg"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        {...register("thumbnail")}
      />
      {errors.thumbnail && (
        <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
      )}
    </div>
          <div className="mt-6">
            {
              isLoading ? (
                <button
                disabled
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Loading
            </button> 
              ) : (
                <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Book
            </button>)
            }
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UpdateBook