import { useEffect, useState } from "react";
import axios from "axios";

export const useLastSeenOfUser = (selectedConversation, onlineUsers) => {
  const [lastSeen, setLastSeen] = useState("");

  useEffect(() => {
    if (selectedConversation?._id) {
      axios
        .get(`api/users/lastseen/${selectedConversation._id}`)
        .then((res) => {
          const date = new Date(res.data.lastSeen);
          const currentYear = new Date().getFullYear();
          const lastSeenYear = date.getFullYear();

          let formattedTime = date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          let formattedDate;
          if (currentYear !== lastSeenYear) {
            formattedDate = date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
          } else {
            formattedDate = date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
            });
          }

          setLastSeen(`${formattedDate} at ${formattedTime}`);
        })
        .catch((err) => console.error("Error fetching last seen:", err));
    }
  }, [selectedConversation, onlineUsers]);

  return lastSeen;
};
