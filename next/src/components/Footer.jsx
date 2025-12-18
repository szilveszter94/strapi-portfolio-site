import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NoSSRWrapper from "./NoSSRWrapper";
import ContactLink from "./ContactLink";
import Image from "next/image";
import ScrollToTopButton from "./ScrollToTopButton";

const socialIcons = {
  LinkedIn: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  ),
  X: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
    </svg>
  ),
  Facebook: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M279.14 288l14.22-92.66h-88.91V127.41c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.2V288z" />
    </svg>
  ),
  Instagram: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9c14.9 0 26.9 12 26.9 26.9zM448 80v352c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V80c0-44.2 35.8-80 80-80h288c44.2 0 80 35.8 80 80z" />
    </svg>
  ),
  TikTok: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M448 209.9v125.1c-5.1.5-10.2.8-15.3.8-47.8 0-91.9-15.6-127.7-41.9v87.5c0 72.7-59 131.6-131.7 131.6S41.6 454.1 41.6 381.4 100.6 249.7 173.3 249.7c4.6 0 9.1.2 13.6.7v72.9c-4.4-1.3-9-2-13.6-2-32.6 0-59.1 26.4-59.1 59.1s26.4 59.1 59.1 59.1 59.1-26.4 59.1-59.1V0h71.7c4.8 45.9 42.8 81.7 89.8 81.7z" />
    </svg>
  ),
  YouTube: (
    <svg className="size-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M549.7 124.1c-6.3-23.7-24.8-42.2-48.5-48.5C458.1 64 288 64 288 64S117.9 64 74.8 75.6c-23.7 6.3-42.2 24.8-48.5 48.5C14.7 167.2 14.7 256 14.7 256s0 88.8 11.6 131.9c6.3 23.7 24.8 42.2 48.5 48.5C117.9 448 288 448 288 448s170.1 0 213.2-11.6c23.7-6.3 42.2-24.8 48.5-48.5C561.3 344.8 561.3 256 561.3 256s0-88.8-11.6-131.9zM232 336V176l142 80-142 80z" />
    </svg>
  ),
};

export default async function Footer({ data, siteRepresentation, locale, tLayout }) {
  if (!data || !siteRepresentation) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="bg-neutral-950">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">
            {tLayout("footerNotLoading")}
          </div>
        </div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { statement, copyright } = data;
  const { isOrganization, siteName, schedulingLink, socialChannels, businessHours, addressLocality, areaServed } =
    siteRepresentation;

  return (
    <footer>
      <h2 className="sr-only">{siteName} footer</h2>
      <div className="bg-neutral-950">
        <div className="flex justify-center pt-5">
          <ScrollToTopButton>{tLayout("backToTop")}</ScrollToTopButton>
        </div>
        <div className="mx-auto max-w-5xl px-4 py-24">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-5 mb-8">
            {/* Mission statement & social media */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">
                {tLayout("statement")}
              </h3>
              <p className="mt-4 mb-6 text-white/75 text-base text-center md:text-start">{statement}</p>
              {/* Badges */}
              <div className="flex justify-center md:justify-start gap-4">
                <Link
                  href="https://www.w3.org/WAI/WCAG2AA-Conformance"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Explanation of WCAG 2 Level AA conformance">
                  <Image
                    className="grayscale hover:grayscale-0 transition"
                    src="/wcag2AA-blue-v.svg"
                    height={28}
                    width={80}
                    alt="Level AA conformance, W3C WAI Web Content Accessibility Guidelines 2.0"
                  />
                </Link>
                <Link href={`/${locale}/privacy-policy/`} target="_blank" title="Read our privacy policy">
                  <Image
                    className="grayscale hover:grayscale-0 transition"
                    src="/gdpr-badge.svg"
                    height={28}
                    width={80}
                    alt="GDPR compliance badge"
                  />
                </Link>
              </div>
              {socialChannels.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">
                    {tLayout("followMe")}
                  </h3>
                  {socialChannels.length > 0 && (
                    <ul className="mt-5 flex justify-center gap-3 md:justify-start">
                      {socialChannels.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.url}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-white/75 transition hover:text-white block">
                            <span className="sr-only">{item.label}</span>
                            {socialIcons[item.channel] || <span className="text-red-500">Icon not found</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="mt-[6px] md:mt-0 col-span-1">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">{tLayout("navigation")}</h3>
              <ul className="mt-4 space-y-4">
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href={`/${locale}/`}>
                    {tLayout("home")}
                  </Link>
                </li>
                <li className="text-center md:text-start">
                  <Link
                    className="block md:inline text-base text-white/75 hover:underline"
                    href={`/${locale}/projects/`}>
                    {tLayout("projects")}
                  </Link>
                </li>
                <li className="text-center md:text-start">
                  <Link className="block md:inline text-base text-white/75 hover:underline" href={`/${locale}/blog/`}>
                    {tLayout("news")}
                  </Link>
                </li>
                <li className="text-center md:text-start">
                  <Link
                    className="block md:inline text-base text-white/75 hover:underline"
                    href={`/${locale}/contact/`}>
                    {tLayout("contact")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact & location */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">
                {tLayout("locationAndContact")}
              </h3>
              <h4 className="sr-only">{tLayout("locationInformation")}</h4>
              <ul className="mt-4 space-y-4">
                <li>
                  <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                    <MapPinIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                    <span className="truncate">
                      {tLayout("locationPrefix")}
                      {addressLocality}
                    </span>
                  </p>
                </li>
                {isOrganization && areaServed && (
                  <li>
                    <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                      <GlobeAltIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                      <span className="truncate">
                        {tLayout("serving")}
                        {areaServed}
                      </span>
                    </p>
                  </li>
                )}
              </ul>
              <div className="h-px w-1/4 bg-white/15 mx-auto md:mx-0 my-6"></div>
              <h4 className="sr-only">{tLayout("contactMethods")}</h4>
              <ul className="space-y-4">
                {process.env.NEXT_PUBLIC_EMAIL_ENCODED && (
                  <li>
                    <NoSSRWrapper>
                      <ContactLink
                        type="email"
                        className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75 hover:underline"
                        showIcon={true}
                      />
                    </NoSSRWrapper>
                  </li>
                )}
                {process.env.NEXT_PUBLIC_TELEPHONE_ENCODED && (
                  <li>
                    <NoSSRWrapper>
                      <ContactLink
                        type="telephone"
                        className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75 hover:underline"
                        showIcon={true}
                      />
                    </NoSSRWrapper>
                  </li>
                )}
                {schedulingLink && (
                  <li>
                    <Link
                      className="flex md:inline-flex items-center justify-center gap-1.5 group text-base text-white/75"
                      href={schedulingLink}
                      rel="noopener noreferrer"
                      target="_blank">
                      <CalendarDaysIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                      <span className="group-hover:underline">{tLayout("sheduleCall")}</span>
                    </Link>
                  </li>
                )}
              </ul>
              {isOrganization && businessHours && (
                <>
                  <div className="h-px w-1/4 bg-white/15 mx-auto md:mx-0 my-6"></div>
                  <h4 className="sr-only">Business hours</h4>
                  <p className="flex items-center justify-center gap-1.5 md:justify-start group text-base text-white/75">
                    <ClockIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                    <span className="truncate">{businessHours}</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-white/15 my-10"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:justify-between">
            <Link
              className="text-white/75 text-base transition hover:underline md:order-2 text-center mb-4 md:mb-0"
              href={`/${locale}/privacy-policy/`}>
              {tLayout("privacyPolicy")}
            </Link>
            <p className="text-white/75 text-base md:order-1 text-center">{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
