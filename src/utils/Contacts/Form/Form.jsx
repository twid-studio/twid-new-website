import React, { useContext, useState } from "react";
import "./Form.scss";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import axios from "axios"; // Import axios
import Link from "next/link";
import { Logo } from "@/utils/Logo/Logo";
import Image from "next/image";
import { Button } from "@/utils/Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";

// Multilingual validation messages
const messages = {
  ua: {
    name: "Будь ласка, введіть ваше ім'я",
    email: "Будь ласка, введіть вашу електронну пошту",
    emailFormat: "Неправильний формат електронної пошти",
    phone: "Будь ласка, введіть ваш номер телефону",
    phoneFormat: "Неправильний формат номера телефону",
    success: "Повідомлення надіслано",
    error: "Помилка. Спробуйте знову.",
  },
  en: {
    name: "Please enter your name",
    email: "Please enter your email",
    emailFormat: "Incorrect email format",
    phone: "Please enter your phone number",
    phoneFormat: "Incorrect phone format",
    success: "Message sent successfully",
    error: "Error sending message. Please try again.",
  },
};

export const Form = ({ data }) => {
  const [succesMessage, setSuccesMessage] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null); // Track active input
  const { lang } = useContext(LocaleContext);
  const { form } = data;

  const errorMsg = messages[lang] || messages.en;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(errorMsg.name),
    email: Yup.string().email(errorMsg.emailFormat).required(errorMsg.email),
    phone: Yup.string().required(errorMsg.phone),
    message: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitStatus("loading");

    try {
      // Create form data
      const formData = new FormData();

      // Add action for WordPress to hook into
      formData.append("action", "add_new_letter");

      // Add form fields
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Add language
      formData.append("lang", lang);

      // Send the request using axios
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setSubmitStatus("success");
        setSuccesMessage(true);
        resetForm();
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", result.data);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setsuccesMessage(false);
    }
  };

  // Input focus/blur handlers
  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
  };
  
  const handleInputBlur = () => {
    setActiveField(null);
  };

  return (
    <Formik
      className="form-wrapper"
      initialValues={{
        name: "",
        email: "",
        phone: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, dirty, handleSubmit }) => (
        <>
          <AnimatePresence mode="wait">
            {submitStatus === "success" && succesMessage && (
              <motion.div {...anim(MenuAnim.wrapper)} className="success-message">
                <div className="top">
                  <Link href="/">
                    <Logo className="logo" />
                  </Link>
                  <div
                    className="cross"
                    onClick={(e) => {
                      e.preventDefault();
                      setSuccesMessage(!succesMessage)}}
                  >
                    <Image
                      src="/images/icons/cross-white.svg"
                      alt=""
                      width={40}
                      height={40}
                      className="cross__image"
                    />
                  </div>
                </div>
                <div className="text">
                  <p
                    className="super-text"
                    dangerouslySetInnerHTML={{ __html: form.success_text }}
                  />

                  <div className="bottom">
                    <Image
                      src="/images/icons/heart.svg"
                      width={132}
                      height={152}
                      alt=""
                      className="heart"
                    />
                    {form.success_button.active && (
                      <Button
                        text={form.success_button.text}
                        href="#"
                        onClick={() => setSuccesMessage(!succesMessage)}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            <form onSubmit={handleSubmit} className="form">
              <label className={classNames("input-wrapper", {
                "input-wrapper--active": activeField === "name"
              })}>
                <span className="input-bg"></span>
                <div
                  className={classNames("input-text-wrapper", {
                    "input-text-wrapper--error": errors.name && touched.name,
                  })}
                >
                  <p className="input-placeholder">{form.name} *</p>
                  <Field
                    type="text"
                    name="name"
                    className={classNames("input", {
                      "input--error": errors.name && touched.name,
                    })}
                    onFocus={() => handleInputFocus("name")}
                    onBlur={handleInputBlur}
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="input-error-msg small-text"
                />
              </label>
              <label className={classNames("input-wrapper", {
                "input-wrapper--active": activeField === "email"
              })}>
                <span className="input-bg"></span>
                <div
                  className={classNames("input-text-wrapper", {
                    "input-text-wrapper--error": errors.email && touched.email,
                  })}
                >
                  <p className="input-placeholder">{form.email} *</p>
                  <Field
                    type="email"
                    name="email"
                    className={classNames("input", {
                      "input--error": errors.email && touched.email,
                    })}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={handleInputBlur}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="input-error-msg small-text"
                />
              </label>
              <label className={classNames("input-wrapper", {
                "input-wrapper--active": activeField === "phone"
              })}>
                <span className="input-bg"></span>
                <div
                  className={classNames("input-text-wrapper", {
                    "input-text-wrapper--error": errors.phone && touched.phone,
                  })}
                >
                  <p className="input-placeholder">{form.phone} *</p>
                  <Field
                    type="tel"
                    name="phone"
                    className={classNames("input", {
                      "input--error": errors.phone && touched.phone,
                    })}
                    onFocus={() => handleInputFocus("phone")}
                    onBlur={handleInputBlur}
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="input-error-msg small-text"
                />
              </label>
              <label className={classNames("input-wrapper", {
                "input-wrapper--active": activeField === "message"
              })}>
                <span className="input-bg"></span>
                <div className="input-text-wrapper input-text-wrapper-textarea">
                  <p className="input-placeholder">{form.about}</p>
                  <Field
                    as="textarea"
                    name="message"
                    className="input textarea"
                    onFocus={() => handleInputFocus("message")}
                    onBlur={handleInputBlur}
                  />
                </div>
              </label>

              {submitStatus && (
                <div className={`form-status form-status--${submitStatus}`}>
                  {submitStatus === "error" && errorMsg.error}
                </div>
              )}

              <button
                type="submit"
                className={classNames("button button--transparent form__btn", {
                  "form__btn--disabled": !isValid || !dirty || succesMessage,
                  "form__btn--loading": succesMessage,
                })}
                disabled={!isValid || !dirty || succesMessage}
              >
                <div className="button__icon">
                  <span>
                    {submitStatus === "loading"
                      ? form.wait.split("")[0]
                      : form.send.split("")[0]}
                  </span>
                </div>
                {submitStatus === "loading" ? form.wait : form.send}
              </button>
            </form>
        </>
      )}
    </Formik>
  );
};
