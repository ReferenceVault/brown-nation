"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { uploadImage, type UploadFolder } from "@/lib/api/admin/uploads";
import { ApiError } from "@/lib/api/errors";
import Spinner from "@/components/ui/Spinner";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/avif";

export default function ImageUploadTile({
  value,
  onChange,
  onRemove,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  folder: UploadFolder;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);

    if (file.size > MAX_FILE_BYTES) {
      setError("Image must be under 5MB.");
      return;
    }

    setUploading(true);
    try {
      const { url } = await uploadImage(folder, file);
      onChange(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed. Try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-brand-200 bg-cream-100">
        {value ? (
          <>
            <Image src={value} alt="" fill sizes="112px" className="object-cover" unoptimized />
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove image"
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-espresso/70 text-white transition-colors duration-200 hover:bg-red-500 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-brand-300 text-brand-500 transition-colors duration-200 hover:bg-brand-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ImagePlus className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-[10px] font-semibold uppercase tracking-wide">Upload</span>
          </button>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Spinner size={24} />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
        />
      </div>
      {error && <span className="max-w-28 text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}
