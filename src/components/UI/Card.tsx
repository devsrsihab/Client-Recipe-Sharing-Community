import { Card as NextUiCard, CardHeader, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { IPost } from "@/src/types";
import { format } from 'date-fns';
import Link from "next/link";

const Card = ({ post }: { post: IPost }) => {
  const { title, category, images, city, dateFound, _id } = post || {};

  return (
    <NextUiCard isFooterBlurred className="h-[300px] w-full">
      <CardHeader className="absolute top-1 z-10 flex-col items-start">
        <p className="absolute -top-0 right-1 rounded-full bg-black px-2 text-tiny uppercase text-white/90">
          {category?.name}
        </p>
        <h4 className="mt-2 rounded p-1 text-2xl font-medium dark:text-white text-black">
          {title}
        </h4>
      </CardHeader>

      <Image
        removeWrapper
        alt="Card example background"
        className="scale-120 z-0 h-full w-full -translate-y-6 object-cover"
        src={images[0]}
      />
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
        <div>
          <p className="text-tiny text-black">{city}</p>
          <p className="text-tiny text-black">
            {format(new Date(dateFound), "dd MMMM, yyyy")}
          </p>
        </div>

        <Link className="bg-black px-4 py-2  text-tiny text-white" href={`/recipes/${_id}`}>

         Details
        </Link>
      </CardFooter>
    </NextUiCard>
  );
};

export default Card;
