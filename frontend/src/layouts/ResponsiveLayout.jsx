import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import useResponsive from "../hooks/useResponsive";

export default function ResponsiveLayout({ children }) {
  const isMobile = useResponsive(768);
    
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
}
