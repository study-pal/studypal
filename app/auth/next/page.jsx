"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "@/app/hooks/useAuth";
import Loader from "@/app/components/Loader";
import TutorDetailsForm from "@/app/components/TutorDetailsForm";
import { initialTutorValues, tutorSchema } from "@/schemas/tutor";

export default function PostAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [displayName, setDisplayName] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema),
    defaultValues: initialTutorValues,
  });
  const {
    auth: { user },
  } = useAuth();

  useEffect(() => {
    if (user) {
      user.userInfo().then((info) => {
        const { first_name, last_name } = info.user_metadata;
        setDisplayName(`${first_name} ${last_name}`);
        setUserId(info.id);
        // TODO: uncomment this when the API is ready
        // fetch(`/api/tutors/${info.id}`).then((res) => {
        //   res.json().then((data) => {
        //     if (data.status === "success") {
        //       router.replace("/");
        //     }
        //     setIsLoading(false);
        //   });
        // });
        setIsLoading(false);
      });
    }
  }, [user]);

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
          <h1 className="text-3xl text-center font-bold">Tutor Onboarding</h1>
          <TutorDetailsForm
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            displayName={displayName}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
