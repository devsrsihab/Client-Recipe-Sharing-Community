"use client";

import { useGetCategories } from "@/src/hooks/categories.hook";
import { ICategory } from "@/src/types";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRotateRight } from "react-icons/fa6";

const Filtering = () => {

  // define next router
  const router = useRouter()
  // search params
  const searchParams = useSearchParams()

  const { data } = useGetCategories();
  const { data: categories } = data || [];

  // handle reset filter
  const handleResetFilter = (category: string) => {

    const params = new URLSearchParams(searchParams)
    const [key, value] = category.split('=')
    params.set(key, value)


    router.push(`/found-items?${params.toString()}`)
  }



  return (
    <div className="my-5 flex items-center justify-end">
      <div className="flex justify-center gap-1">
        {categories?.map(({ _id, name }: ICategory) => (
          <Button
            key={_id}
            size="sm"
            variant="ghost"
            onClick={() => handleResetFilter(`category=${name}`)}
          >
            {name}
          </Button>
        ))}
        <Button className="rounded-lg" size="sm" variant="ghost">
          <FaRotateRight   />
        </Button>
      </div>
    </div>
  );
};

export default Filtering;