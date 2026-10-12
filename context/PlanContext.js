"use client";

import { createContext, useContext, useState } from 'react';

const PlanContext = createContext(undefined);

export const PlanProvider = ({ children }) => {
    const [planInfo, setPlanInfo] = useState({ idPlan: null });

    return (
        <PlanContext.Provider value={{ planInfo, setPlanInfo }}>
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (context === undefined) {
        throw new Error('usePlan debe usarse dentro de un PlanProvider');
    }
    return context;
};