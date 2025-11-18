"use client";

export default function ScrollToTopButton({ children, className }) {
  return (
    <button
      className={`
        group
        inline-flex
        justify-center
        items-center
        transition
        px-4
        h-11
        font-medium
        leading-none
        rounded-full
        text-white
        border border-primary-700
        hover:border-primary-600
        active:border-primary-500
        bg-primary-700
        hover:bg-primary-600
        active:bg-primary-500
        ${className}
      `}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      {children}
    </button>
  );
}
