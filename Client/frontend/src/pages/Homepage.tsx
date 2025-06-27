import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { CodeIcon } from "../icons/CodeIcon";
import { Yt2 } from "../icons/Yt2";
import { Twitter2 } from "../icons/Twiiter2";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center text-2xl text-purple-600">
          <Logo />
          <span className="ml-2 font-semibold text-gray-800">Mind Archive</span>
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            text="Sign In"
            onClick={() => navigate("/signin")}
          />
          <Button
            variant="primary"
            text="Sign Up"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-2">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Store Your Online Mind in One Place
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          Mind Archive helps you save and organize content from across the web —
          all in one central place. Capture ideas, bookmark useful resources,
          and build your personal digital memory that evolves with you.
        </p>
        <Button
          variant="primary"
          text="Get Started"
          onClick={() => navigate("/signup")}
        />
      </div>

      {/* Features Section */}
      <div className="py-12 px-6 bg-white shadow-inner">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            {/* <img
              src="/icons/twitter.png"
              alt="Twitter"
              className="h-12 mx-auto mb-2"
            /> */}
            <div className="flex justify-center pt-3">
              <Twitter2 />
            </div>
            <h3 className="text-xl font-semibold mb-1 pt-1">Save Tweets</h3>
            <p className="text-gray-600 text-sm">
              Archive inspiring or informative tweets for future reference.
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <Yt2 />
            </div>
            <h3 className="text-xl font-semibold mb-1 pt-0.5">
              Rewatch YouTube
            </h3>
            <p className="text-gray-600 text-sm">
              Keep your favorite tutorials and talks in one place.
            </p>
          </div>
          <div>
            {/* <img
              src="/icons/github.png"
              alt="Gist"
              className="h-12 mx-auto mb-2"
            /> */}
            <div className="flex justify-center pt-2">
              <CodeIcon />
            </div>
            <h3 className="text-xl font-semibold mb-1 pt-3">
              Store Code Snippets
            </h3>
            <p className="text-gray-600 text-sm">
              Save code snippets you want to reference or reuse later.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-2 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Mind Archive. All rights reserved.
      </footer>
    </div>
  );
}
