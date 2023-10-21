import React from "react";

function TutorDetails() {
  return (
    <>
      <form
        action=""
        className="mt-10 w-full max-w-screen-2xl flex flex-col h-3/4 border-solid rounded  border-neutral-400 border-2 p-7"
      >
        <div className="flex flex-col gap-3 w-44">
          <select
            className="py-1 px-2 rounded text-m border-2 border-solid border-neutral-400"
            name=""
            id=""
          >
            <option value="">Gender</option>
          </select>
          <input
            className="py-1 px-2 rounded text-m border-2 border-solid border-neutral-400"
            type="text"
            placeholder="Type subject here..."
          ></input>
          <select
            className="py-1 px-2 rounded text-m border-2 border-solid border-neutral-400"
            name=""
            id=""
          >
            <option value="">Age Group</option>
          </select>
        </div>
        <textarea
          className=" w-full flex rounded my-5 p-3 text-m outline-0 border-2 border-solid border-neutral-400 focus:none"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Bio here"
        ></textarea>
        <div className="flex justify-end">
          <button className="px-5 py-1.5 text-m bg-green-400 rounded">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default TutorDetails;
