"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import "./Contacts.scss";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "../Button/Button";
import { Form } from "./Form/Form";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";
import Image from "next/image";

export default function Contacts({ allData }) {
  const { lang } = useContext(LocaleContext);
  const preparedData = useLanguageContent(allData, lang);
  const { contacts: data } = preparedData;

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  console.log("render contacts");

  // Use Intersection Observer instead of Framer Motion's scroll tracking
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on whether section is intersecting the viewport
        setIsSectionVisible(entry.isIntersecting);
      },
      { 
        // Adjust threshold as needed: 0 means any part visible, 0.1 means 10% visible, etc.
        threshold: 0.1,
        // Negative rootMargin means elements are considered intersecting
        // even when they're X pixels away from the viewport
        rootMargin: '100px 0px' 
      }
    );

    observer.observe(sectionRef.current);

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="contacts" id="contacts">
        <div className="info">
          <Link
            href={`tel:${data?.phone.replace(/[\s()\-]/g, "") || ""}`}
            className="info__link"
          >
            <h1>{data?.phone}</h1>
          </Link>
          <MailButton email={data?.email} />
          <Button
            text={data?.telegram.text}
            href={data?.telegram.link}
            iconImage="/images/icons/telegram-icon.svg"
          />
        </div>
        <Form data={preparedData} />
      </section>
      
      <Link href="#contacts" className={classNames("contacts-link", {
        "contacts-link--hidden": isSectionVisible,
      })}>
        <Image
          src="/images/icons/hand.svg"
          alt="arrow"
          width={25}
          height={34}
          className="contacts-link__icon"
        />
        
        <p>{preparedData?.form?.fixed_button}</p>
      </Link>
    </>
  );
}

// MailButton component remains unchanged
const MailButton = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    // Check if navigator and clipboard API are available
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      // Modern clipboard API approach
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          // Fallback to alternative method if permission denied
          fallbackCopyTextToClipboard(email);
        });
    } else {
      // Fallback for browsers without clipboard API
      fallbackCopyTextToClipboard(email);
    }
  };

  // Fallback copy method using document.execCommand
  const fallbackCopyTextToClipboard = (text) => {
    try {
      // Create temporary element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make it invisible but part of the document
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Execute copy command
      const successful = document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
    }
  };

  return (
    <div className="email-button__wrapper" onClick={handleCopyEmail}>
      <div
        className={classNames("email-button__copy-notification", {
          "email-button__copy-notification--active": copied,
        })}
      >
        Скопійовано
      </div>

      <div className="email-button__link">{email}</div>
    </div>
  );
};
