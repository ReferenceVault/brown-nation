"use client";

import { useState } from "react";

const COLLAPSED_CHAR_LIMIT = 260;

export default function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > COLLAPSED_CHAR_LIMIT;

  return (
    <div className="border-t border-brand-100 pt-5">
      <h2 className="font-serif text-lg font-semibold text-espresso">Description</h2>
      <p
        className={`mt-3 whitespace-pre-line text-sm text-espresso/70 leading-relaxed ${
          isLong && !expanded ? "line-clamp-5" : ""
        }`}
      >
        {description}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-brand-600 hover:underline cursor-pointer"
        >
          {expanded ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
}
