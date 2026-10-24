import { useEffect, useId, useRef, useState } from "react";

const initialValues = {
  companyName: "",
  workEmail: "",
  teamSize: "",
  monthlyVideoVolume: "",
  primaryNeed: "",
};

const teamSizes = ["Just me", "2–5 people", "6–20 people", "21–50 people", "50+ people"];
const videoVolumes = ["Under 50 videos", "50–200 videos", "201–500 videos", "500+ videos"];
const primaryNeeds = [
  "Automating video production",
  "Consistent brand identity",
  "Team collaboration & review",
  "Something else",
];

export default function EnterpriseEarlyAccessDialog({ isOpen, onClose }) {
  const id = useId();
  const dialogRef = useRef(null);
  const companyRef = useRef(null);
  const emailRef = useRef(null);
  const confirmationRef = useRef(null);
  const closeTimer = useRef(null);
  const backdropPointerDown = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [previewComplete, setPreviewComplete] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const { scrollX, scrollY } = window;
    const body = document.body;
    const properties = ["position", "top", "left", "width", "overflow", "paddingRight"];
    const previousStyles = Object.fromEntries(properties.map((property) => [property, body.style[property]]));
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;

    // Fixed positioning also locks background scrolling on mobile Safari.
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
      overflow: "hidden",
      paddingRight: `${bodyPadding + scrollbarWidth}px`,
    });
    setIsClosing(false);
    setPreviewComplete(false);
    setErrors({});
    backdropPointerDown.current = false;
    dialog.showModal();

    return () => {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
      if (dialog.open) dialog.close();
      Object.assign(body.style, previousStyles);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (previewComplete) confirmationRef.current?.focus({ preventScroll: true });
    else companyRef.current?.focus({ preventScroll: true });
  }, [isOpen, previewComplete]);

  const requestClose = () => {
    if (closeTimer.current !== null) return;
    setIsClosing(true);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    closeTimer.current = window.setTimeout(onClose, duration);
  };

  const isOutsideDialog = (event) => {
    if (event.target !== dialogRef.current) return false;
    const bounds = dialogRef.current.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  const keepFocusInside = (event) => {
    if (event.key !== "Tab") return;
    const focusable = [...dialogRef.current.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]',
    )].filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === confirmationRef.current)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const previewRequest = (event) => {
    event.preventDefault();
    if (isClosing) return;
    const nextValues = {
      ...values,
      companyName: values.companyName.trim(),
      workEmail: values.workEmail.trim(),
    };
    const nextErrors = {};
    if (!nextValues.companyName) nextErrors.companyName = "Enter your company name.";
    if (!nextValues.workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.workEmail)
      || emailRef.current.validity.typeMismatch) {
      nextErrors.workEmail = "Enter a valid work email.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      (nextErrors.companyName ? companyRef : emailRef).current?.focus();
      return;
    }

    // UI preview only: keep the structured request in React state.
    // No network request, persistent storage, or registration happens here.
    setValues(nextValues);
    setPreviewComplete(true);
  };

  return (
    <dialog
      ref={dialogRef}
      className={`enterprise-dialog${isClosing ? " enterprise-dialog--closing" : ""}`}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onKeyDown={keepFocusInside}
      onPointerDown={(event) => { backdropPointerDown.current = isOutsideDialog(event); }}
      onClick={(event) => {
        if (backdropPointerDown.current && isOutsideDialog(event)) requestClose();
        backdropPointerDown.current = false;
      }}
    >
      <button className="enterprise-dialog__close" type="button" aria-label="Close early access dialog" onClick={requestClose}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
      </button>
      <span className="eyebrow">AUTOBROLL ENTERPRISE</span>

      {previewComplete ? (
        <div className="enterprise-dialog__confirmation">
          <h2 id={`${id}-title`} ref={confirmationRef} tabIndex={-1}>Preview complete</h2>
          <p id={`${id}-description`}>This form is not accepting submissions yet.</p>
          <button type="button" className="button button--primary" onClick={requestClose}>Close preview</button>
        </div>
      ) : (
        <>
          <h2 id={`${id}-title`}>Get early access.</h2>
          <p id={`${id}-description`}>Enterprise is coming. Tell us about your team and we'll reach out when early access becomes available.</p>

          <form className="enterprise-form" noValidate onSubmit={previewRequest}>
            <div className="enterprise-form__row">
              <div className="enterprise-field">
                <label htmlFor={`${id}-company`}>Company name <span aria-hidden="true">*</span></label>
                <input id={`${id}-company`} ref={companyRef} name="companyName" type="text" autoComplete="organization" placeholder="Your company" required value={values.companyName} onChange={updateValue} aria-invalid={Boolean(errors.companyName)} aria-describedby={errors.companyName ? `${id}-company-error` : undefined} />
                {errors.companyName && <span className="enterprise-field__error" id={`${id}-company-error`} role="alert">{errors.companyName}</span>}
              </div>
              <div className="enterprise-field">
                <label htmlFor={`${id}-email`}>Work email <span aria-hidden="true">*</span></label>
                <input id={`${id}-email`} ref={emailRef} name="workEmail" type="email" autoComplete="email" placeholder="you@company.com" required value={values.workEmail} onChange={updateValue} aria-invalid={Boolean(errors.workEmail)} aria-describedby={errors.workEmail ? `${id}-email-error` : undefined} />
                {errors.workEmail && <span className="enterprise-field__error" id={`${id}-email-error`} role="alert">{errors.workEmail}</span>}
              </div>
            </div>

            <div className="enterprise-form__row">
              <div className="enterprise-field">
                <label htmlFor={`${id}-team`}>Team size</label>
                <select id={`${id}-team`} name="teamSize" value={values.teamSize} onChange={updateValue}>
                  <option value="" disabled>Select team size</option>
                  {teamSizes.map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              <div className="enterprise-field">
                <label htmlFor={`${id}-volume`}>Monthly video production</label>
                <select id={`${id}-volume`} name="monthlyVideoVolume" value={values.monthlyVideoVolume} onChange={updateValue}>
                  <option value="" disabled>Select monthly volume</option>
                  {videoVolumes.map((volume) => <option key={volume} value={volume}>{volume}</option>)}
                </select>
              </div>
            </div>

            <fieldset className="enterprise-needs">
              <legend>What matters most to your team?</legend>
              <div className="enterprise-needs__options">
                {primaryNeeds.map((need) => (
                  <label className="enterprise-needs__option" key={need}>
                    <input type="radio" name="primaryNeed" value={need} checked={values.primaryNeed === need} onChange={updateValue} />
                    <span>{need}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="enterprise-form__actions">
              <p>Preview only — no request will be sent.</p>
              <button className="button button--primary" type="submit">Request Early Access</button>
            </div>
          </form>
        </>
      )}
    </dialog>
  );
}
