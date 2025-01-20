import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (error) setError(null);
  };

  const addNewTag = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setError("Tag cannot be empty!");
      return;
    }

    if (tags.includes(trimmedValue)) {
      setError("Tag already exists!");
      return;
    }

    setTags([...tags, trimmedValue]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 rounded"
            >
              # {tag}
              <button
                aria-label={`Remove tag ${tag}`}
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-inherit" />
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-xs pt-1" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default TagInput;
