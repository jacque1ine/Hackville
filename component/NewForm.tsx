/**rThis Component is an old form for the form which is all on one page.
 */

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Badge } from "react-bootstrap";
import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import { useRouter } from "next/router";

type FormValues = {
  from_name: string;
  message: string;
  to_email: string;
  reply_to: string;
};

registerCoreBlocks();
const NewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let router = useRouter();

  function redirect() {
    router.push("/success");
  }

  function sendEmail(data: any) {
    console.log("send email called");
    const contactParams: any = {
      subject: `New email from ${data.answers.from_name.value}`,
      from_name: data.answers.from_name.value,
      message: localStorage.getItem("parsedText"),
      to_email: data.answers.to_email.value,
      reply_to: data.answers.reply_to.value,
    };
    localStorage.setItem("to_email", data.answers.to_email.value);

    console.log("this is contact params");
    console.log(contactParams);

    emailjs
      .send(
        "service_1128xjn",
        "template_dwbvoyh",
        contactParams,
        "RTKXEoUG3NUwuirJi"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  return (
    <>
      <style type="text/css">
        {`   .renderer-core-html-parser {
          p{
            color: #ECE9EA;
         }
         `}
      </style>

      <div style={{ width: "100%", height: "80vh" }}>
        <Form
          formId="1"
          formObj={{
            blocks: [
              {
                name: "short-text",
                id: "from_name",
                attributes: {
                  required: true,
                  label: "Hi! What is your name?",
                },
              },
              {
                name: "email",
                id: "to_email",
                attributes: {
                  required: true,
                  label:
                    "Thanks {{field:from_name}}! Now enter the <b>RECIPIENT'S</b> email address:",
                },
              },
              {
                name: "email",
                id: "reply_to",
                attributes: {
                  required: true,
                  label:
                    "Thanks {{field:from_name}}! Finally, please enter <b>YOUR</b> email address!",
                },
              },
            ],
            settings: {
              animationDirection: "vertical",
              disableWheelSwiping: false,
              disableNavigationArrows: false,
              disableProgressBar: true,
            },
            messages: {
              "block.email.placeholder": "Type the email here",
            },
            theme: {
              font: "Lato",
              buttonsBgColor: "#a0cce3",
              buttonsFontColor: "#272B27",
              logo: {
                src: "",
              },
              questionsColor: "#272B27",
              answersColor: "#272B27",
              buttonsBorderRadius: 12,
              errorsFontColor: "#ECE9EA",
              errorsBgColor: "#f8d7da",
              progressBarFillColor: "#272B27",
              progressBarBgColor: "#ccc",
              backgroundColor: "#ECE9EA",
            },
          }}
          onSubmit={(data: any, { completeForm, setIsSubmitting }) => {
            setTimeout(() => {
              sendEmail(data);
              setIsSubmitting(false);
              redirect();
            }, 500);
          }}
        />
      </div>
    </>
  );
};

export default NewForm;
