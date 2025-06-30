// import { CrossIcon } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";

// export function AddContentModal({ open, onClose }) {
//   return (
//     <div>
//       {open && (
//         <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
//           <div className="flex flex-col justify-center">
//             <span className="bg-white opacity-100 p-4 rounded">
//               <div className="flex justify-end">
//                 <div onClick={onClose} className="cursor-pointer">
//                   <CrossIcon />
//                 </div>
//               </div>
//               <div>
//                 <Input placeholder={"Title"} />
//                 <Input placeholder={"Link"} />
//               </div>
//               <div className="flex justify-center">
//                 <Button variant="primary" text="Submit" />
//               </div>
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Github = "github",
}

export function AddContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("");
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    if (!title || !link || !type) {
      alert("Please fill in all fields.");
      return;
    }
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    onClose();
  }
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded fixed">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input reference={titleRef} placeholder={"Title"} />
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>
                <div className="pt-2">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-800"
                  ></label>
                  <select
                    id="type"
                    name="type"
                    className="mt-1 block w-full rounded-md border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                    <option value="gist">Github Gist</option>
                    <option value="other">Others</option>
                  </select>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
