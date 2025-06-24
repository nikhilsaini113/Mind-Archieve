import { useEffect, useState } from "react";
import { AddContentModal } from "../components/AddContentModal";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [contentModalOpen]);
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen  bg-gray-100 ">
        <AddContentModal
          open={contentModalOpen}
          onClose={() => {
            setContentModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setContentModalOpen(true);
            }}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          ></Button>
          <Button
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
          ></Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
          {/* <Card
            type="twitter"
            link="https://twitter.com/username/status/807811447862468608"
            title="tweet check"
          />
          <Card
            type="youtube"
            link="https://www.youtube.com/watch?v=XqIgIYmwP6E"
            title="yt check"
          />
          <Card
            type="gist"
            link="https://gist.github.com/vikas38/f824ffb7bafec535d0b6452179f2d790"
            title="gist check"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
