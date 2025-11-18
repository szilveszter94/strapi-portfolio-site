import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["hu-HU", "en", "ro"],

  // Used when no locale matches
  defaultLocale: "hu-HU",

  localePrefix: "always",
})

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const {
  Link,
  redirect: _redirect,
  usePathname,
  useRouter,
} = createNavigation(routing)

// Help TypeScript detect unreachable code
// https://next-intl-docs.vercel.app/docs/routing/navigation#redirect
export const redirect = _redirect

export const getAppPublicUrl = () => {
  // Determine the base URL: use APP_PUBLIC_URL on the server or window.location.origin on the client
  const baseUrl =
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_WEBSITE : window.location.origin
  return baseUrl
}

export const isAppLink = (link) => {
  try {
    const baseUrl = getAppPublicUrl()
    if (!baseUrl) {
      throw new Error("Base URL is not defined.")
    }

    const url = new URL(link, baseUrl)
    return url.hostname === new URL(baseUrl).hostname
  } catch (error) {
    return false
  }
}

export const formatHref = (href) => {
  if (!href || href === "#") {
    return "#"
  }

  if (href.startsWith("http")) {
    return href
  }

  if (!isAppLink(href)) {
    return href
  }

  if (!href.startsWith("/")) {
    href = `/${href}`
  }

  return href
}