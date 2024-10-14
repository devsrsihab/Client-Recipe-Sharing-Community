import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentuser } from "../services/AuthService";
import { IUser } from "../types/post.type";

// Define the context with a default value
const UserContext = createContext<IuserProviderValues>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

// type define
interface IuserProviderValues {
  user: IUser | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // handle user
  const handleUser = async () => {
    const user = await getCurrentuser();
    setUser({
      ...user,
    } as IUser);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
