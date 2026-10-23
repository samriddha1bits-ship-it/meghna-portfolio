"use client";

import { useState } from "react";
import { email } from "@/data/content";

export default function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [contactWebsite, setContactWebsite] = useState(""); // honeypot
  const [contactSending, setContactSending] = useState(false);

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSending(true);
    setContactStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          website: contactWebsite,
        }),
      });
      if (!response.ok) throw new Error("Message was not accepted.");
      setContactStatus("Thanks! Your message has been sent to Meghna.");

      window.setTimeout(() => {
        setContactStatus("");
      }, 4000);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      setContactStatus("Sorry, the message could not be sent. Please try emailing directly.");
    } finally {
      setContactSending(false);
    }
  }

  return (
    <section className="section contact-section reveal" id="contact">
      <div className="contact-panel">
        <div className="contact-orb" />
        <p className="eyebrow">LET&apos;S CONNECT</p>
        <h2>
          Have a story
          <br />
          to <span>share?</span>
        </h2>
        <p className="contact-description">
          For conversations about books, ideas, creative projects, or simply
          something interesting — my inbox is open.
        </p>
        <form className="contact-form" onSubmit={submitContact}>
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input
              id="contact-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={contactWebsite}
              onChange={(event) => setContactWebsite(event.target.value)}
            />
          </div>
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={contactName}
            onChange={(event) => setContactName(event.target.value)}
            required
            maxLength={100}
            placeholder="Name"
          />
          <label htmlFor="contact-email">Your email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            required
            maxLength={200}
            placeholder="you@example.com"
          />
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            value={contactMessage}
            onChange={(event) => setContactMessage(event.target.value)}
            required
            rows={5}
            maxLength={5000}
            placeholder="Write your message here..."
          />
          <button className="primary-button" type="submit" disabled={contactSending}>
            {contactSending ? "Sending…" : "Send message"} <span>↗</span>
          </button>
          {contactStatus && (
            <p className="contact-status" role="status">
              {contactStatus}
            </p>
          )}
        </form>
        <p className="email-display">
          Or email directly: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </section>
  );
}
