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

import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function AddContentModal({ open, onClose }) {
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
                  <Input placeholder={"Title"} />
                  <Input placeholder={"Link"} />
                </div>
                <div>
                  <h1>Type</h1>
                  <div className="flex gap-1 justify-center pb-2"></div>
                </div>
                <div className="flex justify-center">
                  <Button variant="primary" text="Submit" />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
