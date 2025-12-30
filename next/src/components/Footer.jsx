import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NoSSRWrapper from "./NoSSRWrapper";
import ContactLink from "./ContactLink";
import Image from "next/image";
import ScrollToTopButton from "./ScrollToTopButton";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { normalizeUrl } from "@/lib/utils";

const IconBox = ({ children }) => (
  <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition">
    {children}
  </div>
);

const socialIcons = {
  LinkedIn: (
    <IconBox>
      <FaLinkedinIn className="size-5" />
    </IconBox>
  ),
  X: (
    <IconBox>
      <FaXTwitter className="size-5" />
    </IconBox>
  ),
  Facebook: (
    <IconBox>
      <FaFacebookF className="size-5" />
    </IconBox>
  ),
  Instagram: (
    <IconBox>
      <FaInstagram className="size-5" />
    </IconBox>
  ),
  TikTok: (
    <IconBox>
      <FaTiktok className="size-5" />
    </IconBox>
  ),
  YouTube: (
    <IconBox>
      <FaYoutube className="size-5" />
    </IconBox>
  ),
};

export default async function Footer({ data, siteRepresentation, locale, tLayout }) {
  if (!data || !siteRepresentation) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="bg-neutral-950">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">{tLayout("footerNotLoading")}</div>
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
                            href={normalizeUrl(item.url)}
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
              <h3 className="text-white font-medium text-xl tracking-tight text-center md:text-start">
                {tLayout("navigation")}
              </h3>
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
