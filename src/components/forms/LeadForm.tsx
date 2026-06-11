"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { models } from "@/data/models";
import { waLink } from "@/lib/whatsapp";
import { btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export type LeadFormKind = "testDrive" | "quote" | "service";

type Values = Record<string, string>;

const inputCls =
  "w-full rounded-xl border border-ink/12 bg-ink/[0.04] px-4 py-3.5 text-sm text-ink placeholder:text-steel-400/70 outline-none transition-all duration-300 focus:border-accent-500/60 focus:bg-ink/[0.07] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]";

const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-steel-300";

/**
 * Shared lead-capture form (plan §19). Three variants share one engine:
 * client-side validation, animated success state, and a WhatsApp deep link
 * carrying the same details (plan §20 templates).
 */
export default function LeadForm({
  kind,
  locale,
  dict,
  defaultModel,
}: {
  kind: LeadFormKind;
  locale: Locale;
  dict: Dict;
  defaultModel?: string;
}) {
  const f = dict.forms;
  const [values, setValues] = useState<Values>({
    model: defaultModel && models.some((m) => m.slug === defaultModel) ? defaultModel : "",
    payment: "cash",
    serviceType: "maintenance",
  });
  const [errors, setErrors] = useState<Values>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validate = (): boolean => {
    const next: Values = {};
    if (!values.name?.trim()) next.name = f.required;
    if (!values.phone?.trim()) next.phone = f.required;
    else if (!/^\+?[\d\s-]{7,16}$/.test(values.phone.trim())) next.phone = f.invalidPhone;
    if ((kind === "testDrive" || kind === "quote") && !values.model) next.model = f.required;
    if (kind === "service" && !values.serviceType) next.serviceType = f.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const selectedModel = models.find((m) => m.slug === values.model);
  const templateByKind = {
    testDrive: dict.whatsapp.templates.testDrive,
    quote: dict.whatsapp.templates.price,
    service: dict.whatsapp.templates.service,
  } as const;
  const successByKind = {
    testDrive: f.successTestDrive,
    quote: f.successQuote,
    service: f.successService,
  } as const;
  const submitLabelByKind = {
    testDrive: f.submitTestDrive,
    quote: f.submitQuote,
    service: f.submitService,
  } as const;

  const whatsappHref = waLink(templateByKind[kind], {
    NAME: values.name || undefined,
    PHONE: values.phone || undefined,
    CITY: values.city || undefined,
    DATE: values.date || undefined,
    MODEL: selectedModel ? selectedModel.name[locale] : values.model || undefined,
  });

  return (
    <div className="card-line relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-44 w-[110%] -translate-x-1/2 rounded-[100%] bg-accent-500/8 blur-3xl"
        aria-hidden="true"
      />
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 230, damping: 14, delay: 0.15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-2 ring-emerald-500/40"
            >
              <CheckIcon className="h-10 w-10" />
            </motion.span>
            <p className="max-w-md text-lg font-semibold text-ink">{successByKind[kind]}</p>
            <p className="max-w-md text-sm text-steel-300">{f.successFollowup}</p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={btnWhatsapp}>
              <WhatsAppIcon className="h-5 w-5" />
              {f.sendWhatsapp}
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-sm font-semibold text-steel-400 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {f.newRequest}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            onSubmit={onSubmit}
            noValidate
            className="relative grid gap-5 sm:grid-cols-2"
          >
            {/* name */}
            <div>
              <label htmlFor={`${kind}-name`} className={labelCls}>
                {f.name} *
              </label>
              <input
                id={`${kind}-name`}
                type="text"
                autoComplete="name"
                value={values.name ?? ""}
                onChange={set("name")}
                className={cn(inputCls, errors.name && "border-accent-500/70")}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="mt-1.5 text-xs font-medium text-accent-600">{errors.name}</p>}
            </div>

            {/* phone */}
            <div>
              <label htmlFor={`${kind}-phone`} className={labelCls}>
                {f.phone} *
              </label>
              <input
                id={`${kind}-phone`}
                type="tel"
                dir="ltr"
                autoComplete="tel"
                placeholder="+967 7XX XXX XXX"
                value={values.phone ?? ""}
                onChange={set("phone")}
                className={cn(inputCls, "text-start", errors.phone && "border-accent-500/70")}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="mt-1.5 text-xs font-medium text-accent-600">{errors.phone}</p>}
            </div>

            {/* city */}
            <div>
              <label htmlFor={`${kind}-city`} className={labelCls}>
                {f.city}
              </label>
              <select id={`${kind}-city`} value={values.city ?? ""} onChange={set("city")} className={inputCls}>
                <option value="" className="bg-night-800">
                  {f.selectCity}
                </option>
                {f.cities.map((c) => (
                  <option key={c} value={c} className="bg-night-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* model */}
            <div>
              <label htmlFor={`${kind}-model`} className={labelCls}>
                {f.model} {kind !== "service" && "*"}
              </label>
              <select
                id={`${kind}-model`}
                value={values.model ?? ""}
                onChange={set("model")}
                className={cn(inputCls, errors.model && "border-accent-500/70")}
                aria-invalid={Boolean(errors.model)}
              >
                <option value="" className="bg-night-800">
                  {f.selectModel}
                </option>
                {models.map((m) => (
                  <option key={m.slug} value={m.slug} className="bg-night-800">
                    {m.name[locale]}
                  </option>
                ))}
              </select>
              {errors.model && <p className="mt-1.5 text-xs font-medium text-accent-600">{errors.model}</p>}
            </div>

            {/* kind-specific fields */}
            {kind === "testDrive" && (
              <>
                <div>
                  <label htmlFor="td-date" className={labelCls}>
                    {f.date}
                  </label>
                  <input id="td-date" type="date" min={todayIso} value={values.date ?? ""} onChange={set("date")} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="td-time" className={labelCls}>
                    {f.time}
                  </label>
                  <input id="td-time" type="time" value={values.time ?? ""} onChange={set("time")} className={inputCls} />
                </div>
              </>
            )}

            {kind === "quote" && (
              <div className="sm:col-span-2">
                <span className={labelCls}>{f.paymentType}</span>
                <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={f.paymentType}>
                  {(
                    [
                      ["cash", f.paymentCash],
                      ["installment", f.paymentInstallment],
                      ["unsure", f.paymentUnsure],
                    ] as const
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      role="radio"
                      aria-checked={values.payment === val}
                      onClick={() => setValues((v) => ({ ...v, payment: val }))}
                      className={cn(
                        "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                        values.payment === val
                          ? "border-accent-500 bg-accent-500/15 text-ink"
                          : "border-ink/12 text-steel-300 hover:border-ink/30",
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {kind === "service" && (
              <>
                <div>
                  <label htmlFor="sv-type" className={labelCls}>
                    {f.serviceType} *
                  </label>
                  <select id="sv-type" value={values.serviceType ?? ""} onChange={set("serviceType")} className={inputCls}>
                    <option value="maintenance" className="bg-night-800">
                      {f.serviceMaintenance}
                    </option>
                    <option value="repair" className="bg-night-800">
                      {f.serviceRepair}
                    </option>
                    <option value="parts" className="bg-night-800">
                      {f.serviceParts}
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="sv-plate" className={labelCls}>
                    {f.plate}
                  </label>
                  <input id="sv-plate" type="text" value={values.plate ?? ""} onChange={set("plate")} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="sv-date" className={labelCls}>
                    {f.date}
                  </label>
                  <input id="sv-date" type="date" min={todayIso} value={values.date ?? ""} onChange={set("date")} className={inputCls} />
                </div>
              </>
            )}

            {/* notes */}
            <div className="sm:col-span-2">
              <label htmlFor={`${kind}-notes`} className={labelCls}>
                {f.notes}
              </label>
              <textarea id={`${kind}-notes`} rows={3} value={values.notes ?? ""} onChange={set("notes")} className={cn(inputCls, "resize-none")} />
            </div>

            <div className="flex flex-col items-center gap-4 pt-2 sm:col-span-2">
              <button type="submit" className={cn(btnPrimary, "w-full sm:w-auto sm:min-w-72")}>
                {submitLabelByKind[kind]}
              </button>
              <span className="text-xs font-medium text-steel-400">{f.orWhatsapp}</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] transition-opacity hover:opacity-80"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {f.sendWhatsapp}
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
