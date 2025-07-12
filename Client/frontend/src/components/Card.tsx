import Gist from "react-gist";
import { TrashIcon } from "../icons/TrashIcon";
import { NewTabIcon } from "../icons/NewTabIcon";
interface CardProps {
  contentId?: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "gist" | "other";
  onDelete?: (id: string) => void;
}
export function Card({ contentId, title, link, type, onDelete }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 max-w-80 min-h-48 min-w-72 ">
      <div className="flex justify-between">
        <div className="flex items-center text-md pl-1">{title}</div>
        <div className="flex  text-gray-500">
          <div className="pr-2">
            <a href={link} target="_blank">
              {/* <ShareIcon /> */}
              <NewTabIcon />
            </a>
          </div>
          {onDelete && contentId && (
            <div
              className="text-gray-500 pl-1 cursor-pointer"
              onClick={() => onDelete(contentId)}
            >
              <TrashIcon />
            </div>
          )}
        </div>
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full"
            src={(link.startsWith("https://youtu.be/")
              ? link.replace(
                  "https://youtu.be/",
                  "https://www.youtube.com/watch?v="
                )
              : link
            )
              .replace("watch", "embed")
              .replace("?v=", "/")}
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
        {type === "other" && (
          <div className="pt-2 text-sm text-gray-700 break-words">
            <p className="font-medium">Link:</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {link}
            </a>
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
