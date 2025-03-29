"use client";
import OrganisationForm from "@/components/OrganisationForm";
import UserForm from "@/components/UserForm";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useOrganisationForm } from "@/features/Forms/organisationSlice";

const Page = () => {
  const formdata = useOrganisationForm();
  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-2 min-h-screen w-full ">
        <div className="h-full bg-white flex justify-center items-center p-10">
          <Tabs
            value={
              formdata?.status === "succeeded" ? "userinfo" : "organisation"
            }
            defaultValue="organisation"
            className="w-[450px]"
          >
            <TabsList>
              <TabsTrigger value="organisation">
                1-Create Organisation
              </TabsTrigger>
              <TabsTrigger value="userinfo">2-Personal info</TabsTrigger>
            </TabsList>
            <TabsContent value="organisation">
              <OrganisationForm />
            </TabsContent>
            <TabsContent value="userinfo">
              <UserForm />
            </TabsContent>
          </Tabs>
        </div>
        <div className=" h-full bg-[#F7F8FB] p-10 flex justify-center pt-44">
          <div className="w-[70%] h-60">
            <Image
              src="/illustrations/barchart.svg"
              alt="Picture of the author"
              width={500}
              height={500}
            />
            <ul className="list-disc pl-5 mt-5">
              <li> Easy to use</li>
              <li>Add your job posting</li>
              <li>See All your candidates</li>
              <li>track your job postings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
