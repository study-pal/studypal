import React from "react";
import Button from "@/app/components/forms/Button";
import TextInput from "@/app/components/forms/TextInput";
import TextArea from "@/app/components/forms/TextArea";
import Select from "@/app/components/forms/Select";

function TutorDetails() {
  // add input that accepts files

  const tutorImage =
    //"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    "https://thenounproject.com/api/private/icons/1081856/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0";

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
    <form className="w-full max-w-screen-2xl flex flex-col h-fit border-solid rounded p-7 bg-white">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center px-8 gap-3">
          <img
            className="h-32 w-32 rounded-full max-w-full border border-neutral-400"
            src={tutorImage}
            alt="tutor-image"
          />
          <input type="file" />
        </div>
        <div className="flex flex-col gap-3 w-44">
          <Select options={genderOptions} label="Gender" />
          <Select options={ageGroups} label="Age Group" />

          <TextInput name="subject" placeholder="Type subject here" />
        </div>
      </div>

      <div className="my-5">
        <TextArea name="" id="" placeholder="Bio here"></TextArea>
      </div>
      <div className="flex justify-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default TutorDetails;
