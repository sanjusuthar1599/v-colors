import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import InquiryForm from "../components/InquiryForm";
import SEO from "../components/SEO";
import SectionHeader from "../components/SectionHeader";
import { company } from "../data/companyData";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact V.Colors at Aastha Textile Tower, Ring Road, Surat for embroidery, net, velvet, jacquard and garment fabric requirements."
        path="/contact"
      />

      <section className="container grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Content */}
        <div className="space-y-8">
          <SectionHeader
            align="left"
            title="Send Your Product Requirement"
            text="Share fabric type, quantity, application and delivery location. V.Colors deals in jari net embroidery, embroidery fabrics, fancy fabrics, velvet fabrics, jacquard fabric and readymade laces."
          />

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <FiMapPin className="text-xl text-gold" />
              </div>

              <p className="text-base leading-7 text-slate-700">
                {company.address}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <FiPhone className="text-xl text-gold" />
              </div>

              <p className="text-base text-slate-700">
                {company.phone}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <FiMail className="text-xl text-gold" />
              </div>

              <p className="text-base text-slate-700">
                {company.email}
              </p>
            </div>

            <a
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#dd2a7b] hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
                <FaInstagram className="text-xl" />
              </div>
              <div>
                <p className="font-bold text-navy">Instagram</p>
                <p className="text-sm text-slate-600">@v_colors_ — fabrics, reels & updates</p>
              </div>
            </a>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-navy">
              Business Profile
            </h3>

            <div className="mt-5 space-y-3 text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">
                  Proprietor:
                </span>{" "}
                {company.proprietor}
              </p>

              <p>
                <span className="font-semibold text-slate-800">
                  GST:
                </span>{" "}
                {company.gst}
              </p>

              <p>
                <span className="font-semibold text-slate-800">
                  Legal Status:
                </span>{" "}
                {company.legalStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-0 min-[600px]:p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
          <InquiryForm type="contact" />
        </div>
      </section>

      <section className="container pb-20">
        <iframe
          title="V.Colors Surat map"
          className="h-[380px] w-full rounded-[32px] border-0 shadow-xl"
          loading="lazy"
          src="https://www.google.com/maps?q=Aastha%20Textile%20Tower%20Ring%20Road%20Surat%20Gujarat%20395002&output=embed"
        />
      </section>
    </>
  );
}