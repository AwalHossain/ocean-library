import ReactQuill from "react-quill";

interface EditorComponentProps {
  handleProcedureContentChange: (content: string) => void;
  code: string;
}

const EditorComponent = ({
  code,
  handleProcedureContentChange,
}: EditorComponentProps) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    // "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    // "link",
    // "color",
    // "image",
    // "background",
    // "align",
    // "size",
    "font",
  ];

  //   const handleProcedureContentChange = (content) => {
  //     setCode(content);
  //     console.log(content, "content");

  //let has_attribues = delta.ops[1].attributes || "";
  //console.log(has_attribues);
  //const cursorPosition = e.quill.getSelection().index;
  // this.quill.insertText(cursorPosition, "★");
  //this.quill.setSelection(cursorPosition + 1);
  //   };

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
    </>
  );
};

export default EditorComponent;
