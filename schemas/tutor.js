import * as z from "zod";

export const genderOptions = [
  "Male",
  "Female",
  "Transgender",
  "Non-binary/non-conforming",
  "Prefer not to respond",
];

export const ageGroups = [
  "Preschool",
  "Kindergarten",
  "Elementary School",
  "Middle School",
  "High School",
  "Post-Secondary Education",
  "Adult Education",
];

export const tutorSchema = z
  .object({
    gender: z.enum([
      "Male",
      "Female",
      "Transgender",
      "Non-binary/non-conforming",
      "Prefer not to respond",
    ]),
    ageGroup: z.enum([
      "Preschool",
      "Kindergarten",
      "Elementary School",
      "Middle School",
      "High School",
      "Post-Secondary Education",
      "Adult Education",
    ]),
    subjects: z
      .array(z.object({ value: z.string() }))
      .min(1, { message: "At least 1 Subject is required." })
      .transform((data) => data.map((item) => item.value)),
    bio: z.string().min(1, { message: "Bio is required." }),
    bookingLink: z.string().min(1, { message: "Booking link is required." }),
  })
  .required();

export const initialTutorValues = {
  gender: "Male",
  ageGroup: "Preschool",
  subjects: [],
  bio: "",
  bookingLink: "",
};
