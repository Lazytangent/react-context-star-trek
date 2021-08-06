import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  initialDecks,
  initialCards,
  initialInventory,
} from "../mockdata/CardData";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const cards = initialCards;
  const [decks, setDecks] = useState(initialDecks);
  const [inventory, setInventory] = useState(initialInventory);

  const buyCardForPlayer = useCallback(
    (cardId) => {
      if (inventory[cardId] > 0) {
        const copyOfInventory = { ...inventory };
        copyOfInventory[cardId]--;
        setInventory(copyOfInventory);

        const card = cards.find((card) => card.id === cardId);
        const copyOfUsersDeck = { ...decks[0] };
        copyOfUsersDeck.cards.push(card);
        setDecks([copyOfUsersDeck, ...decks.slice(1)]);
      }
    },
    [inventory, decks, cards]
  );

  useEffect(() => {
    console.log("INVENTORY CHANGED TO", inventory);
  }, [inventory]);

  useEffect(() => {
    console.log("DECKS CHANGED TO", decks);
  }, [decks]);

  return (
    <AppContext.Provider
      value={{ decks, inventory, cards, buyCard: buyCardForPlayer }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
