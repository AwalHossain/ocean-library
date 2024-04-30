import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { useAddReviewMutation } from "@/redux/feature/filter/filterApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import EditorComponent from "./EditorComponent";
import StarRating from "./StartRating";

export default function WriteModal() {
  const [addReview, {  error, isLoading }] = useAddReviewMutation();
  const { id } = useParams();
  // Catch Rating value
  const [code, setCode] = useState("hellllo");
  const [rating, setRating] = useState(0);

  const handleRatingChange = (rate: number) => {
    setRating(rate);
    // other logic
  };

  const handleProcedureContentChange = (content: string) => {
    setCode(content);
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
  };

  const hanldSubmit = async () => {
    console.log(code);
    const data = {
      rating: rating,
      description: code,
      bookId: id,
    };
    console.log(data, "review data");
    await addReview(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogDescription>
          <div className="flex flex-col space-y-2 items-center justify-center">
            <StarRating initialRating={0} onChange={handleRatingChange} />
            <p>Rate this Book</p>
          </div>
        </DialogDescription>
        <EditorComponent
          code={code}
          handleProcedureContentChange={handleProcedureContentChange}
        />
      </DialogHeader>
      <div className="grid gap-4 py-4"></div>
      <DialogFooter>
        <Button type="submit" onClick={hanldSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </DialogFooter>
    </>
  );
}
