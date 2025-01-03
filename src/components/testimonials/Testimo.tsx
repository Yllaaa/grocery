/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import styles from "./testimo.module.css";
import testimonial from "@/../public/testimonials/testi.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import comment from "@/../public/testimonials/comment.svg";
export default function Testimo() {
  const t = useTranslations("testimo");

  const comments = [
    {
      name: "John Doe",
      pic: comment,
      comment: "Lorem ipsum dolor",
      stars: 3,
    },
    {
      name: "John Doe",
      pic: comment,
      comment: "Lorem ipsum dolor",
      stars: 4,
    },
    {
      name: "John Doe",
      pic: comment,
      comment: "Lorem ipsum dolor",
      stars: 5,
    },
    {
      name: "John Doe",
      pic: comment,
      comment: "Lorem ipsum dolor",
      stars: 4,
    },
    {
      name: "John Doe",
      pic: comment,
      comment: "Lorem ipsum dolor",
      stars: 4,
    },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,

    slides: { perView: 1 },
    

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={testimonial} alt="testimo" />
        </div>
        <div className={styles.content}>
          <h2>
            {t("title1")} <span>{t("title2")}</span> {t("title3")}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper
            dolor lacus, nec ornare velit cursus sed. Cras in consectetur arcu,
            et auctor mi. Sed purus orci, sodales non metus vel, cursus bibendum
            turpis. Nam sit amet congue orci. Sed a ligula in velit porttitor
            consequat. Duis massa est, elementum id lectus ac, viverra dictum
            turpis. Pellentesque mollis vestibulum neque vel molestie. Nullam
            quis lacinia ipsum. Fusce at sapien risus.
          </p>
          <div className={styles.sliderContainer}>
            <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
              {comments.map((item, idx) => (
                <div key={idx} className={`keen-slider__slide ${styles.item}`}>
                  <div>
                    <Image src={item.pic} alt="comment" />
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.comment}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "4px",
                      }}
                    >
                      {[...Array(item.stars)].map((_, index) => (
                        <span
                          key={index}
                          style={{
                            color: index < item.stars ? "#FFD700" : "#CCCCCC", // Gold for filled, Gray for empty
                            fontSize: "24px",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
              <div className={styles.arrows}>
                {loaded && instanceRef.current && (
                  <>
                    <Arrow
                      left
                      onClick={(e: any) =>
                        e.stopPropagation() || instanceRef.current?.prev()
                      }
                      disabled={currentSlide === 0}
                    />
                    <Arrow
                      onClick={(e: any) =>
                        e.stopPropagation() || instanceRef.current?.next()
                      }
                      disabled={
                        currentSlide ===
                        instanceRef.current.track.details.slides.length - 1
                      }
                    />
                  </>
                )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  // const disabled = props.disabled ? styles.arrowDisabled : "";
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${
        props.left ? styles.arrowLeft : styles.arrowRight
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 12C20 12.5523 19.5523 13 19 13L5 13C4.44771 13 4 12.5523 4 12C4 11.4477 4.44771 11 5 11L19 11C19.5523 11 20 11.4477 20 12Z"
            // fill="#EAF0F5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289C13.0976 4.68342 13.0976 5.31658 12.7071 5.70711L6.41421 12L12.7071 18.2929C13.0976 18.6834 13.0976 19.3166 12.7071 19.7071Z"
            // fill="#EAF0F5"
          />
        </>
      )}
      {!props.left && (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
            fill="#EAF0F5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L19.7071 11.2929C20.0976 11.6834 20.0976 12.3166 19.7071 12.7071L12.7071 19.7071C12.3166 20.0976 11.6834 20.0976 11.2929 19.7071C10.9024 19.3166 10.9024 18.68342 11.2929 18.2929L17.5858 12L11.2929 5.70711C10.9024 5.31658 10.9024 4.68342 11.2929 4.29289Z"
            fill="#EAF0F5"
          />
        </>
      )}
    </svg>
  );
}
