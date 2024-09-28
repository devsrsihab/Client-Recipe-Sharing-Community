import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Link from "next/link";
import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div>
      <LightGallery
        elementClassNames={` mt-2 gap-2 grid place-items-center 
         ${images?.length === 1 ? "grid-cols-1" : "grid-cols-2"} `}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images?.map((image, index) => (
          <Link
            className={`w-full ${
              images?.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
            }`}
            href={image}
          >
            <Image
              alt={`image-${index}`}
              width={300}
              height={300}
              key={image}
              src={image}
              className="h-[400px] w-full object-cover"
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
