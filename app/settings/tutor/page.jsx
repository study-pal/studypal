"use client";

import { useContext, useEffect, useState } from "react";
import { Controller, set, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContext } from "@/app/providers";
import Loader from "@/components/Loader";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import Select from "@/components/forms/Select";
import { uploadImage } from "@/lib/firebase";
import {
  ageGroups,
  genderOptions,
  initialTutorValues,
  tutorSchema,
} from "@/schemas/tutor";

function TutorDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  );
  const { authStatus, user } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema),
    defaultValues: initialTutorValues,
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    (async () => {
      if (authStatus === "authorized") {
        const res = await fetch("/api/tutors/" + user.id);
        const { data } = await res.json();
        setPreviewImage(data.image);
        setValue("gender", data.gender);
        setValue("ageGroup", data.ageGroup);
        replace(data.subjects.map((subject) => ({ value: subject })));
        setValue("bookingLink", data.bookingLink);
        setValue("bio", data.bio);
        setIsLoading(false);
      }
    })();
  }, [authStatus, user]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { image: imageList, ...otherData } = data;
    const patchData = otherData;
    try {
      if (imageList?.length > 0) {
        const imageUrl = await uploadImage(user.id, imageList[0]);
        patchData["image"] = imageUrl;
      }
      await fetch(`/api/tutors/${user.id}/update`, {
        method: "PATCH",
        body: JSON.stringify(patchData),
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      className="w-full max-w-screen-2xl flex flex-col h-fit border-solid rounded p-7 bg-white"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col px-8 gap-3 mb-5">
          <img
            className="h-32 w-32 rounded-full max-w-full border border-neutral-400 object-cover"
            src={previewImage}
            alt="tutor-image"
          />
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange } }) => (
              <input
                type="file"
                onChange={({ target }) => {
                  if (target.files && target.files[0]) {
                    setPreviewImage(URL.createObjectURL(target.files[0]));
                    onChange(target.files);
                  }
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            name="gender"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <Select
                name={name}
                value={value}
                onChange={onChange}
                options={genderOptions.map((opt) => ({
                  value: opt,
                }))}
                error={error}
                label="Gender"
              />
            )}
          />

          <Controller
            control={control}
            name="ageGroup"
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <Select
                name={name}
                value={value}
                onChange={onChange}
                options={ageGroups.map((opt) => ({
                  value: opt,
                }))}
                error={error}
                label="Age Group"
              />
            )}
          />

          <TextInput
            name="subject"
            value={subject}
            onChange={({ target }) => setSubject(target.value)}
            onKeyUp={({ key }) => {
              if (key === "Enter") {
                if (subject.trim() === "") return;
                append({ value: subject });
                setSubject("");
              }
            }}
            placeholder="Subject"
            error={errors?.subjects}
          />

          <div className="inline-flex gap-1">
            {fields.map((field, index) => (
              <div
                key={index}
                className="text-xs py-1 px-2 bg-accent text-white rounded-xl cursor-pointer"
                onClick={() => remove(index)}
              >
                {field.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Controller
          control={control}
          name="bookingLink"
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <TextInput
              name={name}
              value={value}
              onChange={onChange}
              error={error}
              label="Booking Link"
              placeholder="https://calendly.com/username"
            />
          )}
        />
      </div>

      <div className="mb-5">
        <Controller
          control={control}
          name="bio"
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <TextArea
              name={name}
              value={value}
              onChange={onChange}
              error={error}
              label="Short Bio"
              placeholder="Write a short bio about yourself..."
            />
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default TutorDetails;
