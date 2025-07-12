import { useEffect, useState } from "react";
import { AddContentModal } from "../components/AddContentModal";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
function Dashboard() {
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { contents, refresh } = useContent();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    refresh();
  }, [contentModalOpen]);

  const handleSelectType = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  const filteredContents = contents
    .filter((content: any) =>
      selectedType ? content.type === selectedType : true
    )
    .filter((content: any) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  async function shareBrain() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const hash = response.data.hash;
      const shareUrl = `http://localhost:5173/share/${hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Your brain link has been copied to the clipboard!");
      alert("Open it in new tab to view!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sharing your brain.");
    }
  }

  async function handleDeleteContent(contentId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          contentId,
        },
      });
      refresh();
    } catch (err) {
      alert("Failed to delete content");
      console.error(err);
    }
  }

  return (
    <div>
      <Sidebar selectedType={selectedType} onSelectType={handleSelectType} />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <AddContentModal
          open={contentModalOpen}
          onClose={() => {
            setContentModalOpen(false);
          }}
        />

        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 w-150  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-4">
            <Button
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
              onClick={shareBrain}
            />
            <Button
              onClick={() => setContentModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          {filteredContents.map(({ _id, type, link, title }) => (
            <Card
              key={_id}
              contentId={_id}
              type={type}
              link={link}
              title={title}
              onDelete={handleDeleteContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
