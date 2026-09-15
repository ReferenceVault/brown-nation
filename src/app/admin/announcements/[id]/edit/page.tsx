"use client";

import { useParams } from "next/navigation";
import { Volume2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getAnnouncement, updateAnnouncement } from "@/lib/api/admin/announcements";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default function EditAnnouncementPage() {
  const params = useParams<{ id: string }>();
  const { data: announcement, error, loading } = useAsync(() => getAnnouncement(params.id), [params.id]);

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Announcement Bar", href: "/admin/announcements" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Announcement</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !announcement) && (
        <div className="mt-6">
          <EmptyState
            icon={Volume2}
            title="Announcement not found"
            description={error ?? "This announcement no longer exists."}
          />
        </div>
      )}

      {!loading && announcement && (
        <div className="mt-6">
          <AnnouncementForm
            initialValues={announcement}
            onSubmit={(data) => updateAnnouncement(announcement.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
