/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddToPrefernceMutation } from "@/redux/feature/book/bookApi";
import { setUserPrefernce } from "@/redux/feature/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";

interface DataProps {
  value: string;
  label: string;
}

export default function ModalContent() {
  const { user } = useAppSelector((state) => state.userState);
  const { userPreference } = useAppSelector((state) => state.userBookState);
  const dispatch = useAppDispatch();
  const dataObj = [
    {
      value: "read",
      label: "Read",
    },
    {
      value: "reading",
      label: "Currently Reading",
    },
  ];

  const [addToPrefernce, { isLoading, error, data }] =
    useAddToPrefernceMutation();
  const { id } = useParams();
  console.log(id, "bookId", data, "data", error, "error");

  const userData = data?.data?.userPreference;
  const result = userData?.find((item: any) => item.user === user?._id);

  console.log(result, "result");

  const handleClick = async (item: DataProps) => {
    console.log(item, "id", id);
    dispatch(setUserPrefernce(item.label));
    await addToPrefernce({ status: item.value, bookId: id });
  };

  return (
    <div>
      <ul>
        {dataObj.map((item) => (
          <li
            key={item.value}
            className="hover:bg-gray-200 w-full p-2 cursor-pointer border-2 m-2"
            onClick={() => handleClick(item)}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>
                {userPreference !== "want to read" ? (
                  userPreference === item.label ? (
                    <span className="text-green-500">
                      {" "}
                      <Pencil
                        size={16}
                        className="text-slate-400 inline-block"
                      />{" "}
                      {item.label}
                    </span>
                  ) : (
                    <span>{item.label} </span>
                  )
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
