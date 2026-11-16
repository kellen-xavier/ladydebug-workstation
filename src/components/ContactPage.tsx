import { type FormEvent, useState } from "react";
import { type ContactIntent, contactContent } from "../content/contato";
import { PageHead } from "./PageHead";
import { PageLayout } from "./PageLayout";

type SendState = "idle" | "sending" | "sent" | "error";

function emailFallback(intent: ContactIntent | null) {
  const key = intent ?? "geral";
  const subject = encodeURIComponent(contactContent.fallbackSubjects[key]);
  const body = encodeURIComponent(contactContent.fallbackBodies[key]);
  return `mailto:${contactContent.recipient}?subject=${subject}&body=${body}`;
}

export function ContactPage() {
  const [intent, setIntent] = useState<ContactIntent | null>(null);
  const [sendState, setSendState] = useState<SendState>("idle");
  const choice = contactContent.choices.find((item) => item.id === intent);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!choice || sendState === "sending") return;

    setSendState("sending");
    const data = new FormData(event.currentTarget);
    data.set("servico", choice.title);
    data.set("_subject", choice.subject);
    data.set("_captcha", "false");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactContent.recipient}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result: { success?: boolean | string } = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("Contact submission was not accepted");
      }
      setSendState("sent");
    } catch {
      setSendState("error");
    }
  }

  return (
    <PageLayout current="contato">
      <div className="contact-page">
        <PageHead
          eyebrow={contactContent.eyebrow}
          title={contactContent.title}
          intro={contactContent.intro}
        />

        <section className="contact-choices" aria-labelledby="contact-choice-title">
          <h2 id="contact-choice-title">{contactContent.choiceTitle}</h2>
          <div className="contact-choice-grid">
            {contactContent.choices.map((item) => (
              <button
                key={item.id}
                type="button"
                className="contact-choice"
                aria-pressed={intent === item.id}
                onClick={() => {
                  setIntent(item.id);
                  setSendState("idle");
                }}
              >
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>
        </section>

        {choice && (
          <section className="contact-request" aria-labelledby="contact-request-title">
            <h2 id="contact-request-title">{choice.formTitle}</h2>
            {sendState === "sent" ? (
              <p className="contact-feedback" role="status">
                {contactContent.successMessage}
              </p>
            ) : (
              <form key={intent} onSubmit={sendRequest}>
                <label className="contact-honey" aria-hidden="true">
                  Deixe este campo vazio
                  <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="contact-field-row">
                  <label>
                    {contactContent.nameLabel}
                    <input name="name" type="text" autoComplete="name" required />
                  </label>
                  <label>
                    {contactContent.emailLabel}
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                </div>

                {intent === "consultoria" ? (
                  <div className="contact-field-row">
                    <label>
                      {contactContent.supportLabel}
                      <select name="tipo" defaultValue="" required>
                        <option value="" disabled>
                          {contactContent.selectPrompt}
                        </option>
                        {contactContent.supportTypes.map((type) => (
                          <option value={type.value} key={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {contactContent.topicLabel}
                      <input name="assunto" type="text" required />
                    </label>
                  </div>
                ) : (
                  <div className="contact-field-row">
                    <label>
                      {contactContent.serviceNameLabel}
                      <input name="nome_do_servico" type="text" required />
                    </label>
                    <label>
                      {contactContent.presentationLabel}
                      <input name="apresentacao" type="url" aria-describedby="presentation-hint" />
                      <small id="presentation-hint">{contactContent.presentationHint}</small>
                    </label>
                  </div>
                )}

                <label>
                  {intent === "consultoria"
                    ? contactContent.consultingMessageLabel
                    : contactContent.publicationMessageLabel}
                  <textarea name="mensagem" rows={5} required />
                </label>

                <p className="contact-privacy">{contactContent.privacyNote}</p>
                <button
                  className="button contact-send"
                  type="submit"
                  disabled={sendState === "sending"}
                >
                  {sendState === "sending" ? contactContent.sendingLabel : contactContent.sendLabel}
                </button>
                {sendState === "error" && (
                  <p className="contact-feedback contact-feedback--error" role="alert">
                    {contactContent.errorMessage}
                  </p>
                )}
              </form>
            )}
          </section>
        )}

        <p className="contact-fallback">
          {contactContent.fallbackBefore}
          <a href={emailFallback(intent)}>{contactContent.fallbackLink}</a>
          {contactContent.fallbackAfter}
        </p>
      </div>
    </PageLayout>
  );
}
