import { createContext, useCallback, useEffect, useContext, useState } from 'react';
import { initialCards, initialDecks, initialInventory } from '../mockdata/CardData';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const cards = initialCards;
  const [applicationState, setApplicationState] = useState({
    decks: initialDecks,
    inventory: initialInventory,
  });

  const buyCardForPlayer = useCallback((cardId) => {
    if (applicationState.inventory[cardId] > 0) {
      const copyOfInventory = { ...applicationState.inventory };
      copyOfInventory[cardId]--;

      const card = cards.find((card) => card.id === cardId);
      const copyOfUsersDeck = { ...applicationState.decks[0] };
      copyOfUsersDeck.cards.push(card);

      setApplicationState({
        inventory: copyOfInventory,
        decks: [ copyOfUsersDeck, ...applicationState.decks.slice(1) ],
      });
    }
  }, [applicationState, cards]);

  useEffect(() => {
    console.log('INVENTORY CHANGED TO', applicationState.inventory);
  }, [applicationState.inventory]);

  useEffect(() => {
    console.log('DECKS CHANGED TO', applicationState.decks);
  }, [applicationState.decks]);

  return (
    <AppContext.Provider value={{ ...applicationState, cards, buyCard: buyCardForPlayer }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
