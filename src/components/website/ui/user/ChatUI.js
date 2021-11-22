import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import dynamic from "next/dynamic";
import ChatMessage from "../../ChatMessage";
import ChatUser from "../../ChatUser";
import { ToastContainer, toast } from "react-toastify";
import { sendMessage } from "../../../../lib/frontend/auth";
import { getConversations, getMessages } from "../../../../lib/frontend/share";
import Loader from "../../../loader";
import { __d } from "../../../../server";
import moment from "moment";
import Picker from "emoji-picker-react";

function ChatUI() {
  const messageBoxRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const [conversationId, setConversationId] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [profile, setProfile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isMsgLoading, setIsMsgLoading] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    document.forms.msgForm.message.value += emojiObject?.emoji;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        setIsMsgLoading(true);
        const res = await getMessages(conversationId);
        if (res?.status) {
          setIsMsgLoading(false);
          setMessages(res?.data);
          messageBoxRef.current &&
            messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          toast.error(res?.error || res?.message);
          setIsMsgLoading(false);
        }
      }
    };
    fetchMessages();

    return () => setMessages([]);
  }, [conversationId]);

  useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setProfile(u);
    }

    const fetchConversations = async () => {
      setIsLoading(true);
      const res = await getConversations();
      if (res?.status) {
        setIsLoading(false);
        setConversations(res?.data);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };
    fetchConversations();

    return () => setConversations([]);
  }, []);

  useEffect(() => {
    messageBoxRef.current &&
      messageBoxRef.current.scrollIntoView({ behavior: "smooth" });

    if (typeof Echo !== "undefined") {
      Echo.join("chat-screen")
        .joining((user) => {
          //
        })
        .leaving((user) => {
          //
        })
        .listen("MessageSentEvent", (e) => {
          console.log("Global >> ", e);
        });
    }

    return () => {
      if (typeof Echo !== "undefined") {
        Echo.leave("chat-screen");
      }
    };
  }, []);

  const typing = () => {
    if (typeof Echo !== "undefined") {
      Echo.private(`conversation.${conversationId}`).whisper("typing", {
        conversationId,
      });
    }
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleTyping = debounce(() => typing());

  const startChat = (conversation, user) => {
    setShowEmoji(false);
    if (conversation && user) {
      setSelectedUser(user);
      setConversationId(conversation?.id);
      if (typeof Echo !== "undefined") {
        if (
          Echo.connector.channels.hasOwnProperty(
            `private-conversation.${conversationId}`
          )
        ) {
          Echo.leave(`conversation.${conversationId}`);
        }
        Echo.private(`conversation.${conversation.id}`)
          .listen("MessageSentEvent", (e) => {
            setMessages((prev) => {
              if (
                Symbol.iterator in Object(prev[moment().format("YYYY-MM-DD")])
              ) {
                return {
                  ...prev,
                  [moment().format("YYYY-MM-DD")]: [
                    ...prev[moment().format("YYYY-MM-DD")],
                    e?.message,
                  ],
                };
              } else {
                return {
                  ...prev,
                  [moment().format("YYYY-MM-DD")]: [e?.message],
                };
              }
            });
            setConversations(
              conversations.map((c) =>
                c.id === e.message?.conversation_id
                  ? { ...c, last_message: e.message }
                  : c
              )
            );
            messageBoxRef.current &&
              messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
          })
          .listenForWhisper("typing", (user) => {
            console.log("Typing - ", user);
          });
      }
    }
  };

  const closeChat = () => {
    setShowEmoji(false);
    setSelectedUser(false);
    if (typeof Echo !== "undefined") {
      if (
        Echo.connector.channels.hasOwnProperty(
          `private-conversation.${conversationId}`
        )
      ) {
        Echo.leave(`conversation.${conversationId}`);
      }
    }
    setConversationId(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEmoji(false);
    const value = document.forms.msgForm.message.value;
    const message = {
      conversation_id: conversationId,
      message_type: "text",
      sender_id: profile?.id,
      receiver_id:
        selectedUser?.sender_id === profile?.id
          ? selectedUser?.receiver_id
          : selectedUser?.sender_id,
      message: value,
    };
    document.forms.msgForm.reset();
    const res = await sendMessage(message);
    if (res?.status) {
      messageBoxRef.current &&
        messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <div
        className="flex shadow-sm border-gray-300 bg-white"
        style={{
          borderWidth: "1px",
          height: "545px",
          fontFamily: "Opensans-regular",
        }}
      >
        {/**left side user list */}
        <div className="flex flex-col max-w-xs w-full">
          {/**search bar */}
          <div
            className="flex items-center border-gray-300"
            style={{ borderBottomWidth: "1px" }}
          >
            <input
              type="text"
              className="border-none max-w-xs w-full mr-3 focus:ring-0 text-sm text-gray-700"
              placeholder="Search Conversation"
            />
            <img
              src="/icons/user-dashboard/search-icon.png"
              className="filter brightness-0 mr-4 w-4 h-4 object-contain cursor-pointer"
              alt="search"
            />
          </div>
          {/**user list */}
          <div
            className="flex flex-col py-4 px-2 overflow-hidden overflow-y-auto"
            style={{ height: "calc(100% - 30px)" }}
          >
            {conversations?.length > 0 ? (
              conversations.map((user, i) => (
                <ChatUser
                  onClick={() =>
                    startChat(
                      user,
                      user?.sender_id === profile?.id
                        ? user?.receiver
                        : user?.sender
                    )
                  }
                  user={
                    user?.sender_id === profile?.id
                      ? user?.receiver
                      : user?.sender
                  }
                  message={user?.last_message}
                  key={i}
                  p={i}
                  selected={conversationId === user.id}
                />
              ))
            ) : (
              <p>No conversations found!</p>
            )}
          </div>
        </div>
        {/**right side chats */}
        <div
          className="border-gray-300 p-2 w-full bg-gray-50"
          style={{ borderLeftWidth: "1px" }}
        >
          {selectedUser ? (
            <>
              <div
                className="p-2 bg-white rounded-sm border-gray-200 flex items-center justify-between"
                style={{ borderWidth: "1px" }}
              >
                <div className="flex items-center">
                  <img
                    src={
                      selectedUser?.profile_pic ||
                      "/images/website/no_photo.png"
                    }
                    alt={selectedUser?.first}
                    className="w-8 h-8 object-contain rounded-full"
                    style={{ maxWidth: "32px" }}
                  />
                  <p className="ml-2 flex items-center">
                    <span>{`${selectedUser.first} ${selectedUser.last}`}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedUser.is_logged_in
                          ? "bg-green-400"
                          : "bg-gray-400"
                      } ml-2`}
                    ></span>
                  </p>
                </div>
                <span
                  onClick={closeChat}
                  className="p-1 bg-gray-300 cursor-pointer rounded-full text-white"
                >
                  <MdClose />
                </span>
              </div>
              {/**chatscreen */}
              <div
                className="flex flex-col leading-4 relative"
                style={{ fontFamily: "Opensans-regular" }}
              >
                {isMsgLoading && <p>Loading messages...</p>}
                {/**chats */}
                <div
                  className="py-2 overflow-hidden overflow-y-auto"
                  style={{ height: "calc(420px)" }}
                >
                  {Object.keys(messages).length > 0 &&
                    Object.keys(messages).map((key) => (
                      <>
                        <span
                          key={Math.random()}
                          className="block text-center text-gray-400 mb-4 uppercase text-2xs mt-2"
                        >
                          {moment(key).format("DD-MM-YYYY")}
                        </span>
                        {messages[key].length > 0 ? (
                          messages[key].map((m) => (
                            <>
                              {m?.sender_id !== profile?.id ? (
                                <ChatMessage
                                  key={m?.id}
                                  message={m}
                                  user={selectedUser}
                                />
                              ) : (
                                <ChatMessage
                                  reverse={true}
                                  key={m?.id}
                                  message={m}
                                  user={profile}
                                />
                              )}
                            </>
                          ))
                        ) : (
                          <p>No messages found!</p>
                        )}
                      </>
                    ))}

                  <div ref={messageBoxRef}></div>
                </div>
                {/**send box */}
                <form
                  onSubmit={handleSubmit}
                  name="msgForm"
                  className="relative block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-grow mr-5 p-1 bg-gray-200 rounded-sm pr-2">
                      <textarea
                        placeholder="Type your message here..."
                        autoFocus={true}
                        autoComplete="off"
                        name="message"
                        onChange={handleTyping}
                        className="border-none w-full bg-transparent focus:ring-0 text-sm text-gray-500"
                      ></textarea>
                      <img
                        src="/icons/user-dashboard/smile.png"
                        alt="emoji"
                        onClick={() => setShowEmoji(!showEmoji)}
                        className="ml-2 w-5 h-5 object-contain cursor-pointer"
                        style={{ maxWidth: "20px" }}
                      />
                      {showEmoji && (
                        <div className="absolute right-0 bottom-20">
                          <Picker onEmojiClick={onEmojiClick} />
                        </div>
                      )}
                      <img
                        src="/icons/user-dashboard/attachment.png"
                        alt="attachment"
                        className="ml-2 w-5 h-5 object-contain cursor-pointer"
                        style={{ maxWidth: "20px" }}
                      />
                    </div>
                    <button>
                      <img
                        src="/icons/user-dashboard/send.png"
                        className="mr-1 w-6 h-6 object-contain cursor-pointer"
                        style={{ maxWidth: "24px" }}
                        alt="send"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p
              className="flex justify-center text-gray-500"
              style={{
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Select a Conversation to start Chat.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(ChatUI), { ssr: false });
