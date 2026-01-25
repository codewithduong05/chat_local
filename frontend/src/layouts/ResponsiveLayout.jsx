import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import useResponsive from "../hooks/useResponsive";
import useAuth from '@/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom'
export default function ResponsiveLayout({ children }) {
  const isMobile = useResponsive(768);
    
  const { isAuthenticated } = useAuth();
   if (!isAuthenticated) {
        return <Navigate to="/chat/login" replace />;
    }
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
