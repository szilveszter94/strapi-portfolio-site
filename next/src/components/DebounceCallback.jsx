"use client";

import { useRef } from "react";

export default function useDebouncedCallback(callback, delay = 300) {
  const timeoutRef = useRef(null);

  return (...args) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}