/* eslint-disable react/prop-types */
import { useCallback, useRef, useState, useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { blue, grayColor } from "../constants/Color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { GetSocket } from "../Socket";
import { useChatDetailsQuery } from "../redux/api/api";
import { useSocketEvents } from "../hooks/hook";
import { NEW_MESSAGE } from "../constants/events";

const user = {
  _id: "1",
  name: "John Smith",
};

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const socket = GetSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    console.log("New message received:", data);
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventHandler);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {messages.map((i) => (
          <MessageComponent message={i} key={i._id} user={user} />
        ))}
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{ position: "absolute", left: "1.5rem", rotate: "20deg" }}
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-20deg",
              bgcolor: "primary.main",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: blue,
                transform: "scale(1.05)",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
