"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialConnectTab from "@/components/layout/SocialConnectTab";
import ToastViewport from "@/components/ui/ToastViewport";
import { useCatalogStore } from "@/lib/stores/catalogStore";
import type { Announcement, Category } from "@/lib/types/catalog";

/**
 * The admin section renders its own shell (sidebar, top bar) via
 * app/admin/layout.tsx, so it skips the storefront chrome entirely rather
 * than nesting inside it.
 */
export default function SiteChrome({
  children,
  categories,
  announcement,
}: {
  children: ReactNode;
  categories: Category[];
  announcement: Announcement | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const initCatalog = useCatalogStore((state) => state.init);

  // Loads the full product/category catalog from the API once, so client
  // components that need synchronous lookups (cart) can read it directly.
  // The header nav gets its categories via SSR props above instead.
  useEffect(() => {
    void initCatalog();
  }, [initCatalog]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBar announcement={announcement} />
      <TopBar />
      <Header categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialConnectTab />
      <ToastViewport />
    </>
  );
}
