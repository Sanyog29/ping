"use client";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import Inputs from "@/app/components/inputs/Inputs";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type variant = "LOGIN" | "REGISTER";

const Authform = () => {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
      console.log("Authenticated");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (email === "LOGIN") {
      setEmail("REGISTER");
    } else {
      setEmail("LOGIN");
    }
  }, [email]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (email === "REGISTER") {
      axios.post('/api/register', data)
        .then(() => {
          signIn('credentials', data)
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (email === "LOGIN") {
      {
        signIn('credentials', {
          ...data,
          redirect: false,
        })
          .then((callback) => {
            if (callback?.error) {
              toast.error("Invalid credentials");
            }
            if (callback?.ok && !callback?.error) {
              toast.success("Logged in successfully");
              router.push("/users");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="space-y-3"
          onSubmit={handleSubmit((onSubmit))}
        >
          {email === "REGISTER" && (
            <Inputs id="name" label="Name" type="name" register={register} errors={errors} />
          )}
          <Inputs id="email" label="Email" type="email" register={register} errors={errors} />
          <Inputs id="password" label="Password" type="password" register={register} errors={errors} />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">{email === "LOGIN" ? "Sign In" : "Register"}</Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {email === "LOGIN" ? "New to Ping?" : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {email === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Authform;
