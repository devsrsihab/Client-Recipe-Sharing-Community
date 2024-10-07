import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { format } from "date-fns";
import Link from "next/link";
import { IRecipe } from "@/src/types";

const Card = ({ recipe }: { recipe: IRecipe }) => {
  const { title, category, image, createdAt, _id, createdBy } = recipe || {};

  return (
    <NextUiCard className="w-full max-w-sm mx-auto h-[400px] sm:h-[450px] transition-shadow hover:shadow-xl">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="px-2 py-1 capitalize rounded-full text-xs font-semibold uppercase bg-black/50 text-white">
          {category?.name}
        </p>
      </CardHeader>
      <CardBody className="p-0">
        <Image
          removeWrapper
          alt={`${title} image`}
          className="z-0 w-full  h-full object-cover"
          src={image}
        />
      </CardBody>
      <CardFooter className="absolute bottom-0 z-10 border-t-1 border-zinc-100/50 dark:border-zinc-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-md flex-col items-start p-4">
        <h4 className="text-xl capitalize font-bold text-black dark:text-white mb-2">
          {title}
        </h4>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-sm capitalize text-gray-700 dark:text-gray-300">
              {createdBy?.name?.firstName} {createdBy?.name?.lastName}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {format(new Date(createdAt), "dd MMMM, yyyy")}
            </p>
          </div>

          <Link
            className="bg-black px-4 py-2 text-tiny text-white"
            href={`/recipes/${_id}`}
          >
            Details
          </Link>
        </div>
      </CardFooter>
    </NextUiCard>
  );
};

export default Card;
