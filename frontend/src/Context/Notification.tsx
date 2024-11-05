import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUnreadMessagesAPI } from "../Services/MessageService";
import { UserAuth } from "../Context/UserAuth";

interface NotificationsContextType {
  unreadMessages: { [userId: string]: number };
  totalUnreadMessages: number;
  updateUnreadMessages: () => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unreadMessagesByUser, setUnreadMessagesByUser] = useState<{
    [userId: string]: number;
  }>({});
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0);
  const { user } = UserAuth();

  const updateUnreadMessages = async () => {
    if (user?.id) {
      const countByUser = await fetchUnreadMessagesAPI({ id: user?.id });
      setUnreadMessagesByUser(countByUser);
    }
  };

  useEffect(() => {
    const total = Object.values(unreadMessagesByUser).reduce(
      (acc, count) => acc + count,
      0
    );
    setTotalUnreadMessages(total);
  }, [unreadMessagesByUser]);

  useEffect(() => {
    updateUnreadMessages();
  }, [user]);

  return (
    <NotificationsContext.Provider
      value={{
        unreadMessages: unreadMessagesByUser,
        totalUnreadMessages,
        updateUnreadMessages
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};
