"use client";

import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";

import TextInput from "@/app/components/forms/TextInput";
import Button from "@/app/components/forms/Button";
import Select from "@/app/components/forms/Select";
import TextArea from "@/app/components/forms/TextArea";
import { ageGroups, genderOptions } from "@/schemas/tutor";

export default function TutorDetailsForm({ control, onSubmit, errors }) {
  const [subject, setSubject] = useState("");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="flex flex-col gap-3"
    >
      <Controller
        control={control}
        name="displayName"
        render={({ field: { name, value } }) => (
          <TextInput
            name={name}
            value={value}
            placeholder="Display Name"
            disabled
          />
        )}
      />

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
        <Button onClick={onSubmit}>Save</Button>
      </div>
    </form>
  );
}
