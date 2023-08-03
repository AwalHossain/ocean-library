import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddBookMutation } from "../redux/feature/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import { IBook } from "../types";

export default function AddBook() {
    const [addBook, { isSuccess, isError /* isLoading */ }] =useAddBookMutation();
    const { user } = useAppSelector((state) => state.userState);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<IBook>();
  
    const onSubmit = (data: IBook) => {
      const payload = { ...data, addedBy: user?.email };
      console.log(payload);
      
      addBook(payload);
    //   reset();
    };
  
    useEffect(() => {
      if (isSuccess)
        toast.success("Successfully added the book 📘", { id: "addBook" });
      if (isError) toast.error("Failed to add the book 😔", { id: "error" });
    }, [isSuccess, isError]);
  
    return (
        <div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Paramoy Life"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Jhankar Mahbub"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("author", { required: "Author is required" })}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Genre
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  {...register("genre", { required: "Genre is required" })}
                >
                  <option defaultValue>Self-Help</option>
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
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Publication Year
                </label>
                <input
            type="number"
            placeholder="2023"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            {...register("publicationYear", {
              required: "Publication Year is required",
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
              <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Thumbnail (URL)
          </label>
          <input
            type="text"
            placeholder="https://example.com/book-thumbnail.jpg"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            {...register("thumbnail", { required: "Thumbnail URL is required" })}
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
          )}
        </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
  }