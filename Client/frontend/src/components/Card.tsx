import { ShareIcon } from "../icons/ShareIcon";
import Gist from "react-gist";
interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "gist";
}
export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 max-w-80 min-h-48 min-w-72 ">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className=" text-gray-500 pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex  text-gray-500">
          <div className="pr-2">
            <a href={link} target="_blank">
              <ShareIcon />
            </a>
          </div>
          <div className="text-gray-500">
            <ShareIcon />
          </div>
        </div>
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
        {type === "gist" && (
          <div>
            <Gist id={link.split("/").pop() || ""} />
          </div>
        )}
      </div>
      {/* <iframe
        className="w-full pt-4"
        src="https://www.youtube.com/embed/XqIgIYmwP6E?si=eyzKGXUb-grOteIE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe> */}
      {/* <blockquote className="twitter-tweet">
        <a href="https://twitter.com/username/status/807811447862468608"></a>
      </blockquote>
      <div>
        <Gist id="f824ffb7bafec535d0b6452179f2d790" />
      </div> */}
    </div>
  );
}
