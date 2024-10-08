"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { adminLinks, userLinks } from "./constants";
import { useUser } from "@/src/context/user.provider";
import { SidebarOptions } from "./SidebarOptions";
import { Image } from "@nextui-org/image";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md overflow-hidden">
          <Image
            isZoomed
            className="max-w-full max-h-full object-cover"
            alt="profile-img"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">
            {user?.name.firstName} {user?.name.lastName}
          </h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href={"/profile/create-post"}
        >
          Create a post
        </Button>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={user?.role === "USER" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
