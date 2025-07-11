import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockNews, mockEvents, mockGos, mockResources, mockLeaders } from './data';
import type { NewsArticle, Event, GovernmentOrder, Resource, Leader } from './types';

interface AppState {
  news: NewsArticle[];
  events: Event[];
  gos: GovernmentOrder[];
  resources: Resource[];
  leaders: Leader[];
}

interface AppContextProps {
  state: AppState;
  updateNews: (news: NewsArticle[]) => void;
  updateEvents: (events: Event[]) => void;
  updateGOs: (gos: GovernmentOrder[]) => void;
  updateResources: (resources: Resource[]) => void;
  updateLeaders: (leaders: Leader[]) => void;
}

const initialState: AppState = {
  news: mockNews,
  events: mockEvents,
  gos: mockGos,
  resources: mockResources,
  leaders: mockLeaders,
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateNews = (news: NewsArticle[]) => {
    setState(prevState => ({ ...prevState, news }));
  };

  const updateEvents = (events: Event[]) => {
    setState(prevState => ({ ...prevState, events }));
  };

  const updateGOs = (gos: GovernmentOrder[]) => {
    setState(prevState => ({ ...prevState, gos }));
  };

  const updateResources = (resources: Resource[]) => {
    setState(prevState => ({ ...prevState, resources }));
  };

  const updateLeaders = (leaders: Leader[]) => {
    setState(prevState => ({ ...prevState, leaders }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateNews,
        updateEvents,
        updateGOs,
        updateResources,
        updateLeaders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
