import React from "react";
import Button from "@/app/components/forms/Button";
import Select from "@/app/components/forms/Select";

function TutorDetails() {
  const genderOptions = [
    { value: "Male" },
    { value: "Female" },
    { value: "Transgender" },
    { value: "Non-binary/non-conforming" },
    { value: "Prefer not to respond" },
  ];

  const ageGroups = [
    { value: "Preschool" },
    { value: "Kindergarten" },
    { value: "Elementary School" },
    { value: "Middle School" },
    { value: "High School" },
    { value: "Post-Secondary Education" },
    { value: "Adult Education" },
  ];

  return (
    <>
      <form
        action=""
        className="w-full max-w-screen-2xl flex flex-col h-3/4 border-solid rounded p-7 bg-green-100"
      >
        <div className="flex flex-col gap-3 w-44">
          <p className="font-semibold">Gender</p>
          <Select options={genderOptions} />

          <p className="font-semibold">Age Group</p>
          <Select options={ageGroups} />

          <input
            className="py-1 px-2 rounded text-m border-2 border-solid border-neutral-400 focus:border-dark"
            type="text"
            placeholder="Type subject here..."
          ></input>
        </div>
        <textarea
          className=" w-full flex rounded my-7 p-3 text-m outline-0 border-2 border-solid border-neutral-400 focus:border-dark"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Bio here"
        ></textarea>
        <div className="flex justify-end">
          <Button>Submit</Button>
        </div>
      </form>
    </>
  );
}

export default TutorDetails;
