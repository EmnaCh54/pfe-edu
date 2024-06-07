import React, { useEffect, useState } from "react";
import "./style.scss";
import AIService from "../Services/AI";
import { Button, Spinner } from "react-bootstrap";
const FloatingButton = () => {
  const [prompt, setPrompt] = useState("");
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const startConversation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AIService.chat({ prompt: prompt });
      if (res.status === 200) {
        let c = [];
        c = conversation;
        c.push({ prompt: prompt, response: res.data.response });
        setConversation(c);
        setUpdate((prev) => prev + 1);
        setPrompt("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    console.log(conversation);
  };
  useEffect(() => {}, [update]);
  return (
    <>
      <form onSubmit={startConversation}>
        <div id="modalChatBot-write" class="modalChatBot">
          <a href="#" class="modalChatBot-close"></a>
          <div class="modalChatBot-content">
            <a href="#" class="modalChatBot-close"></a>
            <div class="modalChatBot-header">Nouvelle conversation</div>
            <div class="modalChatBot-body">
              {conversation &&
                conversation.length > 0 &&
                conversation.map((con) => (
                  <div>
                    <div
                      style={{
                        color: "white",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        backgroundColor: "rgb(230, 126, 34)",
                        padding: "20px",
                      }}
                    >
                      {" "}
                      <i class="fa-solid fa-user"></i> : {con.prompt}
                    </div>
                    <div
                      style={{
                        marginBottom: "20px",
                        color: "white",
                        borderRadius: "10px",
                        backgroundColor: "rgb(41, 128, 185)",
                        padding: "20px",
                      }}
                    >
                      <i class="fa-solid fa-robot"></i> : {con.response}
                    </div>
                  </div>
                ))}
              {loading ? (
                <Button variant="primary" className="mb-3" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {` `}
                  Generation ...
                </Button>
              ) : (
                <>
                  {" "}
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    name="body"
                    cols="30"
                    rows="10"
                    id="modalChatBot-write-body"
                    placeholder="What would you like to say?"
                    required
                  ></textarea>
                  <div class="modalChatBot-actions">
                    <button class="write" type="submit">
                      <i class="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div id="modalChatBot-archive" class="modalChatBot">
        <a href="#" class="modalChatBot-close"></a>
        <div class="modalChatBot-content">
          <a href="#" class="modalChatBot-close"></a>
          <div class="modalChatBot-header">Archive Post</div>
          <div class="modalChatBot-body">
            <p>Would you like to archive your post?</p>
            <div class="modalChatBot-actions">
              <a href="#">Cancel</a>
              <button class="archive">Archive</button>
            </div>
          </div>
        </div>
      </div> */}
        {/* <div id="modalChatBot-delete" class="modalChatBot">
        <a href="#" class="modalChatBot-close"></a>
        <div class="modalChatBot-content">
          <a href="#" class="modalChatBot-close"></a>
          <div class="modalChatBot-header">Delete Post</div>
          <div class="modalChatBot-body">
            <p>Are you sure you want to delete your post?</p>
            <p class="warning">
              <i class="far fa-exclamation-circle"></i>This cannot be undone.
            </p>
            <div class="modalChatBot-actions">
              <a href="#">Cancel</a>
              <button class="delete">Delete</button>
            </div>
          </div>
        </div>
      </div> */}
        <div id="mega-button">
          <div class="tooltip">
            <i class="fa-solid fa-robot"></i>
          </div>
          <a class="sub-button" id="buttons--write" href="#modalChatBot-write"></a>
          {/* <a class="sub-button" id="buttons--archive" href="#modalChatBot-archive"></a>
        <a class="sub-button" id="buttons--delete" href="#modalChatBot-delete"></a> */}
        </div>
      </form>
    </>
  );
};

export default FloatingButton;
