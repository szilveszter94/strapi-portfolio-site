"use client";

import React, { useState, useTransition, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/navigation";

// SVG flags
const FLAGS = {
  en: (
    <img
      src="https://flagcdn.com/gb.svg"
      alt="English"
      className="w-8 h-5 object-cover rounded-md"
    />
  ),
  "hu-HU": (
    <img
      src="https://flagcdn.com/hu.svg"
      alt="Magyar"
      className="w-8 h-5 object-cover rounded-md"
    />
  ),
  "ro": (
    <img
      src="https://flagcdn.com/ro.svg"
      alt="Română"
      className="w-8 h-5 object-cover rounded-md"
    />
  ),
};

const LOCALES = {
  en: { label: "English", flag: FLAGS.en },
  "hu-HU": { label: "Magyar", flag: FLAGS["hu-HU"] },
  "ro": { label: "Română", flag: FLAGS["ro"] },
};

export default function LocaleSwitcher({ locale }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef(null);

  const current = LOCALES[locale];

  const changeLocale = (newLocale) => {
    if (newLocale === locale) return;

    const queryParams = searchParams.toString();

    startTransition(() => {
      router.replace(
        queryParams ? `${pathname}?${queryParams}` : pathname,
        { locale: newLocale }
      );
    });

    setOpen(false);
  };

  // Click outside → close menu
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger button — styled like your header buttons */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex items-center justify-center gap-2
          w-20 h-10 rounded-full transition
          border border-primary-100
          bg-primary-50 text-primary-700
          hover:bg-primary-100 active:bg-primary-200
        "
      >
        {current.flag}
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-36
            bg-white
            border border-primary-100
            rounded-xl shadow-lg p-1 z-50 animate-fade
          "
        >
          {Object.entries(LOCALES).map(([key, data]) => (
            <button
              key={key}
              onClick={() => changeLocale(key)}
              className={`
                flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm
                hover:bg-primary-50 active:bg-primary-100 transition
                ${locale === key ? "font-semibold text-primary-700" : "text-gray-700"}
              `}
            >
              {data.flag}
              {data.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
