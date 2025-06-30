import { GithubIcon } from "../icons/GithubIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export function Sidebar({
  selectedType,
  onSelectType,
  overrideUser,
  hideLogout = false,
}: {
  selectedType: string | null;
  onSelectType: (type: string) => void;
  overrideUser?: string;
  hideLogout?: boolean;
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6 flex flex-col justify-between">
      <div>
        <div className="flex text-2xl pt-8 items-center">
          <div className="pr-2 text-purple-600">
            <Logo />
          </div>
          Mind Archive
        </div>
        <div className="pt-8 pl-4 space-y-2">
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon />}
            active={selectedType === "twitter"}
            onClick={() => onSelectType("twitter")}
          />
          <SidebarItem
            text="Youtube"
            icon={<YoutubeIcon />}
            active={selectedType === "youtube"}
            onClick={() => onSelectType("youtube")}
          />
          <SidebarItem
            text="Github Gists"
            icon={<GithubIcon />}
            active={selectedType === "gist"}
            onClick={() => onSelectType("gist")}
          />
          <SidebarItem
            text="Other Links"
            icon={<LinkIcon />}
            active={selectedType === "other"}
            onClick={() => onSelectType("other")}
          />
        </div>
      </div>
      <div className="text-sm text-gray-600 pl-4 pb-6">
        {overrideUser ? (
          <p className="mb-1">{overrideUser}</p>
        ) : isLoggedIn ? (
          <>
            <p className="mb-1">
              Signed in as <span className="font-semibold">{username}</span>
            </p>
            {!hideLogout && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline focus:outline-none"
              >
                Log out
              </button>
            )}
          </>
        ) : (
          <>
            <p className="mb-1">You're not signed in</p>
            <button
              onClick={handleSignIn}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
