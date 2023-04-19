import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import UserReply from "./UserReply";

const RepliesSection = ({ thread }) => {
  const [responses, setResponses] = useState([]);

  const loadThreadReplies = () => {
    // A function to fetch the list of reviews that will be load anytime that list change
    fetch(`http://localhost:8080/replies/${thread.thread_id}`)
      .then((response) => response.json())
      .then((reviews) => {
        setResponses(reviews);
      });
  };

  const convertTime = (time) => {
    const createdAt = new Date(time);
    const createdDate = createdAt.toLocaleDateString("en-US");
    return createdDate;
  };

  const refreshReplies = () => {
    loadThreadReplies();
  };

  useEffect(() => {
    loadThreadReplies();
  }, []);

  return (
    <Accordion style={{ width: "600px", borderRadius: "20px", margin: "5px" }}>
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        <div>
          <Typography>{thread.title} </Typography>
          <Typography style={{ fontSize: "small", color: "gray" }}>
            (Posted: {convertTime(thread.created)})
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {responses.map((reply) => (
          <div className="Responses">
            <Typography style={{ color: "gray", fontSize: "small" }}>
              {reply.username}
            </Typography>
            <Typography>{reply.comment_text}</Typography>
          </div>
        ))}
      </AccordionDetails>
      <UserReply threadId={thread.thread_id} refresh={refreshReplies} />
    </Accordion>
  );
};

export default RepliesSection;
