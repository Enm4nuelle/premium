import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import ToastProvider from "@/components/toastProvider";
import ScrollToTop from "@/components/scrollToTop";
import { ProductProvider } from "@/context/ProductContext";
import { PackageProvider } from '@/context/PackageContext';

export default function RootLayout({ children }) {
	return (
		<html
            lang="es"
            data-scroll-behavior="smooth"
        >
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
            </head>
			<body>
                <ProductProvider>
                <PackageProvider>
                    {children}
                    <ToastProvider />
                    <ScrollToTop />
                </PackageProvider>
                </ProductProvider>
            </body>
		</html>
	);
}
