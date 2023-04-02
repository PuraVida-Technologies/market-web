import { IPost } from "@/types/IPost";
import Image from "next/image";

const PostCard = ({
  post,
  onClick,
}: {
  post: IPost;
  onClick: VoidFunction;
}) => {
  return (
    <li
      className="rounded-lg shadow-md cursor-pointer flex flex-col hover:shadow-lg transition-shadow ease-in-out border border-gray-light"
      onClick={onClick}
    >
      <figure className="relative w-full h-[170px] border-b border-gray-light">
        <Image
          alt={post.name}
          src={post.mainImageUrl || "/assets/mapPin.svg"} //Todo Need default image
          fill
          className="object-cover origin-center rounded-t-lg"
        />
      </figure>
      <section className="py-3 px-4 flex gap-1 flex-col flex-grow-0 h-[79px]">
        <h3 className="capitalize">{post.name.slice(0, 20)}</h3>
        <p className="w-full flex-grow-0 font-medium text-gray-text text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {post.description.slice(0, 100)}
        </p>
      </section>
    </li>
  );
};

export default PostCard;
