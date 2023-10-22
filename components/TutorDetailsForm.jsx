"use client";

import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import Select from "@/components/forms/Select";
import TextArea from "@/components/forms/TextArea";
import { ageGroups, genderOptions } from "@/schemas/tutor";

export default function TutorDetailsForm({ control, onSubmit, errors }) {
  const [subject, setSubject] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col items-center gap-3">
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

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
