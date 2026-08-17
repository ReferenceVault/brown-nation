"use client";

import ImageUploadTile from "./ImageUploadTile";
import type { UploadFolder } from "@/lib/api/admin/uploads";

export default function ImageUploadListInput({
  label,
  value,
  onChange,
  folder,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  folder: UploadFolder;
}) {
  const updateAt = (index: number, url: string) => {
    const next = [...value];
    next[index] = url;
    onChange(next);
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-espresso">{label}</label>
      <div className="flex flex-wrap gap-3">
        {value.map((url, index) => (
          <ImageUploadTile
            key={index}
            value={url}
            folder={folder}
            onChange={(next) => updateAt(index, next)}
            onRemove={() => removeAt(index)}
          />
        ))}
        <ImageUploadTile
          value=""
          folder={folder}
          onChange={(url) => onChange([...value, url])}
          onRemove={() => {}}
        />
      </div>
    </div>
  );
}
