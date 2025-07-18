import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";
import { getIoInstance, getOnlineUsers } from "../socket.io/socket.js";

export const sendMessage_post = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // ✅ Emit message to the receiver if they are online
    const io = getIoInstance(); // Get io instance
    const onlineUsers = getOnlineUsers();

    const receiverSocketId = onlineUsers.get(receiverId);

    console.log("receiverSocketId", receiverSocketId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessageFromServer", {
        message: newMessage,
      });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in send message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessage_get = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, userToChatId] },
    }).populate("messages"); // this is for populating the messages array in the conversation model(getting messages from the message model)

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in get message controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
