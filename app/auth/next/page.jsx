"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCurrentUser } from "@/actions/passageUser";
import Loader from "@/app/components/Loader";
import TutorDetailsForm from "@/app/components/TutorDetailsForm";
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

  useEffect(() => {
    (async () => {
      const { isAuthorized, userInfo } = await getCurrentUser();
      if (!isAuthorized) {
        router.push("/");
      } else {
        setUserId(userInfo.id);
        setName(userInfo.user_metadata.first_namr);
        setIsLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    const res = await fetch("/api/tutors/new", {
      method: "POST",
      body: JSON.stringify({
        userId,
        ...data,
      }),
    });
    const json = await res.json();
    if (json.status === "success") {
      router.replace("/");
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
          <p className="text-center">
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
