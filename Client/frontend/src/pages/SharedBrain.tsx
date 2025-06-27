import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function SharedBrain() {
  const { hash } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedContent() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        if (!response.data.content || !response.data.username) {
          navigate("*");
          return;
        }
        setContent(response.data.content);
        setUsername(response.data.username);
      } catch (err) {
        navigate("*");
      }
    }
    fetchSharedContent();
  }, [hash, navigate]);

  const filteredContent = selectedType
    ? content.filter((item: any) => item.type === selectedType)
    : content;

  const handleSelectType = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  return (
    <div>
      <Sidebar
        selectedType={selectedType}
        onSelectType={handleSelectType}
        overrideUser={`You're viewing brain of User "${username}"`}
        hideLogout
      />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <div className="flex gap-4 flex-wrap mt-4">
          {filteredContent.map(({ type, link, title }, idx) => (
            <Card
              key={`${type}-${idx}`}
              type={type}
              link={link}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
