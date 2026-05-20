import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Mail, Trash2, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`/api/messages/${id}/read`);
      toast.success('Message marked as read');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`/api/messages/${id}`);
        toast.success('Message deleted successfully');
        fetchMessages();
        if (selectedMessage?._id === id) setSelectedMessage(null);
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>

      {messages.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-xl">
          <Mail size={48} className="mx-auto text-gray-500 mb-4" />
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-4 rounded-xl glass-effect cursor-pointer transition-all ${
                  selectedMessage?._id === message._id ? 'ring-2 ring-blue-500' : ''
                } ${!message.read ? 'bg-blue-600/10' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{message.name}</h3>
                    <p className="text-sm text-gray-400">{message.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {!message.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message._id);
                        }}
                        className="p-1 rounded-lg hover:bg-green-600/20 text-green-400"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message._id);
                      }}
                      className="p-1 rounded-lg hover:bg-red-600/20 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl glass-effect">
            {selectedMessage ? (
              <>
                <h3 className="text-lg font-semibold text-white mb-4">Message Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">From</label>
                    <p className="text-white">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Date</label>
                    <p className="text-white">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Message</label>
                    <p className="text-gray-300 mt-2 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="pt-4">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Mail size={16} />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Eye size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MessagesManager;