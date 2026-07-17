import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: "Content is required" }}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={conf.tinyMceApiKey || "no-api-key"}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 420,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family: Inter, system-ui, sans-serif; font-size: 16px; line-height: 1.7; }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
