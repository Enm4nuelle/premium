"use client";

import { createContext, useContext, useState } from 'react';

const PackageContext = createContext(undefined);

export const PackageProvider = ({ children }) => {
    const [packageInfo, setPackageInfo] = useState({ idPackage: null });

    return (
        <PackageContext.Provider value={{ packageInfo, setPackageInfo }}>
            {children}
        </PackageContext.Provider>
    );
};

export const usePackage = () => {
    const context = useContext(PackageContext);
    if (context === undefined) {
        throw new Error('usePackage debe usarse dentro de un PackageProvider');
    }
    return context;
};