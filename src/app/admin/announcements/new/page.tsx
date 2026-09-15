"use client";

import { createAnnouncement } from "@/lib/api/admin/announcements";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewAnnouncementPage() {
  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Announcement Bar", href: "/admin/announcements" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Announcement</h1>

      <div className="mt-6">
        <AnnouncementForm onSubmit={createAnnouncement} submitLabel="Create Announcement" />
      </div>
    </div>
  );
}
