"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContext } from "@/app/providers";
import Loader from "@/components/Loader";
import TutorDetailsForm from "@/components/TutorDetailsForm";
import { uploadImage } from "@/lib/firebase";
import { initialTutorValues, tutorSchema } from "@/schemas/tutor";

export default function PostAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema),
    defaultValues: initialTutorValues,
  });
  const { authStatus, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (authStatus !== "authorizing") {
        if (authStatus === "unauthorized") {
          router.replace("/");
        } else {
          const userId = user.id;
          const res = await fetch("/api/tutors/" + userId);
          const data = await res.json();
          if (data.status === "success") {
            router.replace("/");
          } else {
            setUserId(userId);
            setName(
              `${user.user_metadata.first_name} ${user.user_metadata.last_name}`,
            );
            setIsLoading(false);
          }
        }
      }
    })();
  }, [authStatus, user]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { image: imageList, ...otherData } = data;
    const postData = otherData;
    try {
      if (imageList?.length > 0) {
        const imageUrl = await uploadImage(user.id, imageList[0]);
        postData["image"] = imageUrl;
      }
      const res = await fetch("/api/tutors/new", {
        method: "POST",
        body: JSON.stringify({
          userId,
          name,
          ...postData,
        }),
      });
      const json = await res.json();
      if (json.status === "success") {
        router.replace("/settings/account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );

  return (
    <div className="flex lg:mx-44 md:mx-16 mx-6">
      <div className="w-full flex justify-center md:py-16 py-6">
        <div className="md:w-2/3 w-full flex flex-col py-6 px-8 border border-neutral-400 rounded-lg">
          <h1 className="text-3xl text-center font-bold">Hey, {name}! 👋</h1>
          <p className="text-center mb-5">
            Thanks for joining StudyPal! Let's setup your tutor profile!
          </p>
          <TutorDetailsForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
