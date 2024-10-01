import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrawerContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};

interface DrawerProviderProps {
    children: ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(true);

    return (
        <DrawerContext.Provider value={{ open, setOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};
