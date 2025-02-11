
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MessageSquare, Send } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  trip_id: string | null;
  is_read: boolean;
};

type Conversation = {
  user_id: string;
  full_name: string | null;
  last_message: string;
  last_message_time: string;
  unread_count: number;
};

const Inbox = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const { data: conversations, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          is_read,
          profiles!messages_sender_id_fkey(full_name)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation
      const conversationsMap = new Map<string, Conversation>();
      
      messages.forEach((message) => {
        const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        const existingConversation = conversationsMap.get(otherUserId);
        
        if (!existingConversation) {
          conversationsMap.set(otherUserId, {
            user_id: otherUserId,
            full_name: message.profiles?.full_name || "Unknown User",
            last_message: message.content,
            last_message_time: message.created_at,
            unread_count: message.is_read ? 0 : 1
          });
        } else if (!message.is_read && message.sender_id !== user.id) {
          existingConversation.unread_count += 1;
        }
      });

      return Array.from(conversationsMap.values());
    },
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedConversation],
    enabled: !!selectedConversation,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${selectedConversation},receiver_id.eq.${(await supabase.auth.getUser()).data.user?.id}),and(sender_id.eq.${(await supabase.auth.getUser()).data.user?.id},receiver_id.eq.${selectedConversation})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
  });

  const sendMessage = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        content: newMessage.trim(),
        sender_id: user.id,
        receiver_id: selectedConversation,
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
      return;
    }

    setNewMessage("");
  };

  // Subscribe to new messages
  useEffect(() => {
    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          // Refresh queries when new message arrives
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50/50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-primary mb-8">Inbox</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {conversationsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-12 bg-gray-200 rounded" />
                        </div>
                      ))}
                    </div>
                  ) : conversations?.length ? (
                    <div className="space-y-2">
                      {conversations.map((conversation) => (
                        <button
                          key={conversation.user_id}
                          onClick={() => setSelectedConversation(conversation.user_id)}
                          className={`w-full p-3 text-left rounded-lg transition-colors ${
                            selectedConversation === conversation.user_id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{conversation.full_name}</span>
                            {conversation.unread_count > 0 && (
                              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                                {conversation.unread_count}
                              </span>
                            )}
                          </div>
                          <p className="text-sm truncate opacity-70">
                            {conversation.last_message}
                          </p>
                          <span className="text-xs opacity-50">
                            {format(new Date(conversation.last_message_time), 'PPp')}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="mx-auto h-12 w-12 opacity-50 mb-2" />
                      <p>No conversations yet</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedConversation 
                    ? conversations?.find(c => c.user_id === selectedConversation)?.full_name || "Chat"
                    : "Select a conversation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] mb-4">
                  {selectedConversation ? (
                    messagesLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-16 bg-gray-200 rounded" />
                          </div>
                        ))}
                      </div>
                    ) : messages?.length ? (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender_id === selectedConversation ? 'justify-start' : 'justify-end'
                            }`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.sender_id === selectedConversation
                                  ? 'bg-muted'
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              <p>{message.content}</p>
                              <span className="text-xs opacity-50 mt-1 block">
                                {format(new Date(message.created_at), 'PPp')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="mx-auto h-12 w-12 opacity-50 mb-2" />
                        <p>No messages yet</p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="mx-auto h-12 w-12 opacity-50 mb-2" />
                      <p>Select a conversation to view messages</p>
                    </div>
                  )}
                </ScrollArea>

                {selectedConversation && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </AuthGuard>
  );
};

export default Inbox;
