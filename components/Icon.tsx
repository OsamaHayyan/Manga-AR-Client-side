import React from "react";
type iconNames =
  | "person"
  | "password"
  | "google"
  | "facebook"
  | "eyeSlash"
  | "eyeBold"
  | "eye"
  | "downArrow"
  | "addPhoto"
  | "filledStar"
  | "halfFilledStar"
  | "star"
  | "caretRight"
  | "heart"
  | "file"
  | "search";

type Props = {
  name: iconNames;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export default function Icon({
  name,
  size = 40,
  color = "white",
  className,
  style,
  onClick,
}: Props) {
  const sizeString = `${size}px`;
  switch (name) {
    case "person":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.625 16C31.6267 13.3989 30.9789 10.8385 29.7406 8.55104C28.5022 6.26361 26.7123 4.32153 24.5334 2.90096C22.3544 1.48039 19.8553 0.626264 17.2627 0.416065C14.67 0.205867 12.066 0.646243 9.68661 1.69725C7.30726 2.74826 5.22794 4.37664 3.63725 6.4347C2.04656 8.49276 0.994834 10.9154 0.577461 13.4828C0.160088 16.0502 0.390278 18.6812 1.24715 21.1372C2.10402 23.5931 3.56047 25.7963 5.48437 27.5469C5.5239 27.5961 5.57144 27.6384 5.625 27.6719C8.4839 30.2186 12.1791 31.6258 16.0078 31.6258C19.8365 31.6258 23.5317 30.2186 26.3906 27.6719L26.5156 27.5469C28.1268 26.0861 29.414 24.3038 30.294 22.3149C31.174 20.3261 31.6275 18.1748 31.625 16ZM1.625 16C1.62481 13.6373 2.20698 11.311 3.32 9.22698C4.43303 7.1429 6.04258 5.3653 8.00624 4.05145C9.96991 2.7376 12.2271 1.92802 14.5782 1.69434C16.9293 1.46066 19.3017 1.81008 21.4856 2.71169C23.6695 3.6133 25.5974 5.0393 27.0989 6.86351C28.6004 8.68772 29.6291 10.8539 30.094 13.1704C30.5589 15.4868 30.4456 17.8822 29.7642 20.1445C29.0829 22.4068 27.8544 24.4662 26.1875 26.1406C24.6359 23.5412 22.1478 21.6347 19.2344 20.8125C20.5874 20.0911 21.6605 18.9382 22.283 17.5369C22.9054 16.1356 23.0416 14.5665 22.6699 13.0789C22.2981 11.5913 21.4397 10.2707 20.2312 9.32708C19.0226 8.38341 17.5333 7.87083 16 7.87083C14.4667 7.87083 12.9774 8.38341 11.7688 9.32708C10.5603 10.2707 9.70191 11.5913 9.33014 13.0789C8.95837 14.5665 9.09456 16.1356 9.71704 17.5369C10.3395 18.9382 11.4126 20.0911 12.7656 20.8125C9.85216 21.6347 7.3641 23.5412 5.8125 26.1406C3.13237 23.446 1.62701 19.8005 1.625 16ZM16 20.375C14.8875 20.375 13.7999 20.0451 12.8749 19.427C11.9499 18.8089 11.2289 17.9304 10.8032 16.9026C10.3774 15.8748 10.266 14.7438 10.4831 13.6526C10.7001 12.5615 11.2359 11.5592 12.0225 10.7725C12.8092 9.98585 13.8115 9.45012 14.9026 9.23308C15.9938 9.01604 17.1248 9.12743 18.1526 9.55318C19.1804 9.97892 20.0589 10.6999 20.677 11.6249C21.2951 12.5499 21.625 13.6375 21.625 14.75C21.625 16.2418 21.0324 17.6726 19.9775 18.7275C18.9226 19.7824 17.4918 20.375 16 20.375ZM6.76562 27C7.69364 25.3693 9.03694 24.0134 10.6589 23.0702C12.2809 22.127 14.1237 21.6302 16 21.6302C17.8763 21.6302 19.7191 22.127 21.3411 23.0702C22.9631 24.0134 24.3064 25.3693 25.2344 27C22.6503 29.1781 19.3796 30.3727 16 30.3727C12.6204 30.3727 9.34967 29.1781 6.76562 27Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "password":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="30"
            height="34"
            viewBox="0 0 30 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18.0666C14.4048 18.069 13.8268 18.2667 13.3549 18.6295C12.8829 18.9923 12.5432 19.5001 12.388 20.0747C12.2327 20.6493 12.2705 21.2591 12.4955 21.8102C12.7205 22.3613 13.1203 22.8232 13.6334 23.125V27H16.4V23.125C16.806 22.8848 17.1429 22.5438 17.378 22.1349C17.6131 21.726 17.7384 21.2633 17.7417 20.7916C17.7417 20.4324 17.6707 20.0767 17.5327 19.745C17.3947 19.4133 17.1925 19.1121 16.9377 18.8589C16.6829 18.6056 16.3805 18.4052 16.048 18.2693C15.7154 18.1333 15.3593 18.0644 15 18.0666Z"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.2416 11.8083H4.7499C2.76168 11.8083 1.1499 13.4201 1.1499 15.4083V29.65C1.1499 31.6382 2.76168 33.25 4.7499 33.25H25.2416C27.2298 33.25 28.8416 31.6382 28.8416 29.65V15.4083C28.8416 13.4201 27.2298 11.8083 25.2416 11.8083Z"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.125 11.8083V9.63333C6.125 7.27733 7.06092 5.01782 8.72687 3.35187C10.3928 1.68592 12.6523 0.75 15.0083 0.75C17.3643 0.75 19.6238 1.68592 21.2898 3.35187C22.9557 5.01782 23.8917 7.27733 23.8917 9.63333V11.8083"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    case "google":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.3424 16.7358H34.9999V16.6666H19.9999V23.3333H29.4191C28.0449 27.2141 24.3524 30 19.9999 30C14.4774 30 9.99992 25.5225 9.99992 20C9.99992 14.4775 14.4774 9.99998 19.9999 9.99998C22.5491 9.99998 24.8683 10.9616 26.6341 12.5325L31.3483 7.81831C28.3716 5.04415 24.3899 3.33331 19.9999 3.33331C10.7958 3.33331 3.33325 10.7958 3.33325 20C3.33325 29.2041 10.7958 36.6666 19.9999 36.6666C29.2041 36.6666 36.6666 29.2041 36.6666 20C36.6666 18.8825 36.5516 17.7916 36.3424 16.7358Z"
              fill="#FFC107"
            />
            <path
              d="M5.25488 12.2425L10.7307 16.2583C12.2124 12.59 15.8007 9.99998 19.9999 9.99998C22.5491 9.99998 24.8682 10.9616 26.6341 12.5325L31.3482 7.81831C28.3716 5.04415 24.3899 3.33331 19.9999 3.33331C13.5982 3.33331 8.04655 6.94748 5.25488 12.2425Z"
              fill="#FF3D00"
            />
            <path
              d="M20.0001 36.6667C24.3051 36.6667 28.2168 35.0192 31.1743 32.34L26.0159 27.975C24.3426 29.2425 22.2626 30 20.0001 30C15.6651 30 11.9843 27.2359 10.5976 23.3784L5.1626 27.5659C7.92093 32.9634 13.5226 36.6667 20.0001 36.6667Z"
              fill="#4CAF50"
            />
            <path
              d="M36.3425 16.7359H35V16.6667H20V23.3334H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9759L26.0158 27.9742L31.1742 32.3392C30.8092 32.6709 36.6667 28.3334 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7359Z"
              fill="#1976D2"
            />
          </svg>
        </span>
      );
    case "facebook":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35 33.3333C35 34.2542 34.2542 35 33.3333 35H6.66667C5.74583 35 5 34.2542 5 33.3333V6.66667C5 5.74583 5.74583 5 6.66667 5H33.3333C34.2542 5 35 5.74583 35 6.66667V33.3333Z"
              fill="url(#paint0_linear_54_45)"
            />
            <path
              opacity="0.05"
              d="M20.8333 31.6666V22.5H17.5V17.5H20.8333V15.7183C20.8333 11.5166 23.055 9.20331 27.0875 9.20331C28.75 9.20331 29.6517 9.31997 30.0858 9.37664L30.8008 9.46914L30.8333 10.1866V14.1666H27.8042C26.8642 14.1666 26.6667 15.315 26.6667 16.2791V17.5H30.6025L29.8292 22.5H26.6667V31.6666H20.8333Z"
              fill="black"
            />
            <path
              opacity="0.07"
              d="M21.2501 31.25V22.0833H17.9167V17.9167H21.2501V15.7183C21.2501 11.7283 23.2684 9.62 27.0876 9.62C28.7301 9.62 29.6126 9.735 30.0376 9.79L30.4009 9.8375L30.4176 10.2058V13.75H27.8051C26.4526 13.75 26.2509 15.3342 26.2509 16.2792V17.9167H30.1176L29.4734 22.0833H26.2501V31.25H21.2501Z"
              fill="black"
            />
            <path
              d="M27.8041 13.3333H29.9999V10.205C29.5899 10.1517 28.7241 10.0358 27.0874 10.0358C23.6699 10.0358 21.6666 11.7692 21.6666 15.7183V18.3333H18.3333V21.6667H21.6666V30.8333H25.8333V21.6667H29.1149L29.6299 18.3333H25.8333V16.2792C25.8333 14.7175 26.3433 13.3333 27.8041 13.3333Z"
              fill={color}
            />
            <defs>
              <linearGradient
                id="paint0_linear_54_45"
                x1="5.19"
                y1="4.08"
                x2="35.0642"
                y2="36.1933"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0D61A9" />
                <stop offset="1" stopColor="#16528C" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      );
    case "eyeSlash":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.37491 0.662617C5.2854 0.563161 5.16004 0.503336 5.02642 0.496303C4.89281 0.489271 4.76186 0.535607 4.66241 0.625117C4.56295 0.714628 4.50313 0.839981 4.49609 0.973601C4.48906 1.10722 4.5354 1.23816 4.62491 1.33762L7.44991 4.43762C2.66241 7.11262 0.624908 11.6001 0.537408 11.8001C0.487205 11.9287 0.487205 12.0715 0.537408 12.2001C0.587408 12.3001 1.61241 14.5626 3.89991 16.8501C6.18741 19.1376 9.66241 21.5001 14.9999 21.5001C17.2941 21.5164 19.5625 21.0166 21.6374 20.0376L24.6249 23.3376C24.7155 23.4352 24.8406 23.4937 24.9736 23.5007C25.1066 23.5077 25.2371 23.4627 25.3374 23.3751C25.4323 23.2829 25.4888 23.1583 25.4958 23.0262C25.5027 22.8941 25.4596 22.7643 25.3749 22.6626L5.37491 0.662617ZM17.6374 15.6501C16.7402 16.3014 15.6342 16.5986 14.5313 16.4847C13.4285 16.3708 12.4066 15.8537 11.6615 15.0327C10.9164 14.2117 10.5006 13.1446 10.4939 12.0359C10.4871 10.9273 10.8899 9.85512 11.6249 9.02512L17.6374 15.6501ZM14.9999 20.5001C10.9999 20.5001 7.51241 19.0376 4.62491 16.1751C3.39642 14.9455 2.35983 13.5381 1.54991 12.0001C2.01241 11.1001 4.06241 7.40012 8.13741 5.20012L10.9499 8.28762C10.2244 9.0724 9.74389 10.0519 9.56731 11.106C9.39073 12.16 9.52579 13.2427 9.9559 14.2211C10.386 15.1995 11.0925 16.0309 11.9885 16.6134C12.8845 17.1959 13.9312 17.5041 14.9999 17.5001C16.1963 17.5029 17.3603 17.112 18.3124 16.3876L20.9249 19.2626C19.0608 20.0932 17.0406 20.5151 14.9999 20.5001ZM29.4624 12.2001C28.4626 14.2124 27.088 16.0155 25.4124 17.5126C25.32 17.5958 25.1992 17.6405 25.0749 17.6376C24.9334 17.6349 24.7986 17.5765 24.6999 17.4751C24.6152 17.3735 24.5721 17.2436 24.579 17.1115C24.586 16.9794 24.6425 16.8548 24.7374 16.7626C26.2484 15.4086 27.5056 13.7959 28.4499 12.0001C27.6431 10.4602 26.6062 9.05239 25.3749 7.82512C22.4874 4.95012 18.9999 3.50012 14.9999 3.50012C14.1624 3.49635 13.3261 3.56325 12.4999 3.70012C12.4349 3.71262 12.368 3.71174 12.3033 3.69753C12.2386 3.68333 12.1775 3.65609 12.1237 3.61749C12.0699 3.57889 12.0245 3.52974 11.9904 3.47302C11.9562 3.41631 11.9339 3.35322 11.9249 3.28762C11.9142 3.22277 11.9164 3.15645 11.9313 3.09244C11.9462 3.02843 11.9736 2.968 12.0119 2.91459C12.0503 2.86119 12.0987 2.81586 12.1546 2.7812C12.2104 2.74654 12.2725 2.72324 12.3374 2.71262C13.2179 2.5716 14.1082 2.50055 14.9999 2.50012C20.3374 2.50012 23.9874 5.02512 26.0999 7.15012C28.2124 9.27512 29.4124 11.7001 29.4624 11.8001C29.5126 11.9287 29.5126 12.0715 29.4624 12.2001ZM15.8499 7.57512C15.7212 7.55077 15.6072 7.47689 15.5324 7.36936C15.4576 7.26184 15.428 7.12925 15.4499 7.00012C15.4619 6.93512 15.4867 6.87315 15.5228 6.81778C15.5589 6.76241 15.6056 6.71475 15.6602 6.67755C15.7148 6.64036 15.7763 6.61436 15.8411 6.60107C15.9058 6.58778 15.9725 6.58745 16.0374 6.60012C17.2055 6.82676 18.2688 7.42525 19.0687 8.30618C19.8685 9.1871 20.3618 10.3032 20.4749 11.4876C20.4818 11.5527 20.4755 11.6184 20.4564 11.681C20.4374 11.7436 20.4059 11.8017 20.3639 11.8518C20.3219 11.902 20.2703 11.9431 20.212 11.9729C20.1538 12.0027 20.0902 12.0204 20.0249 12.0251H19.9749C19.8505 12.0257 19.7304 11.98 19.6379 11.8968C19.5455 11.8136 19.4873 11.6989 19.4749 11.5751C19.3826 10.6067 18.9797 9.69411 18.3265 8.97329C17.6733 8.25247 16.8046 7.76205 15.8499 7.57512Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "eyeBold":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="23"
            height="18"
            viewBox="0 0 23 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9C1.5 9 4.5 2 11.5 2C18.5 2 21.5 9 21.5 9C21.5 9 18.5 16 11.5 16C4.5 16 1.5 9 1.5 9Z"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.5 12C13.1569 12 14.5 10.6569 14.5 9C14.5 7.34315 13.1569 6 11.5 6C9.84315 6 8.5 7.34315 8.5 9C8.5 10.6569 9.84315 12 11.5 12Z"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    case "eye":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="70"
            height="50"
            viewBox="0 0 70 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66699 24.9998C1.66699 24.9998 11.667 1.6665 35.0003 1.6665C58.3337 1.6665 68.3337 24.9998 68.3337 24.9998C68.3337 24.9998 58.3337 48.3332 35.0003 48.3332C11.667 48.3332 1.66699 24.9998 1.66699 24.9998Z"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 35C40.5228 35 45 30.5228 45 25C45 19.4772 40.5228 15 35 15C29.4772 15 25 19.4772 25 25C25 30.5228 29.4772 35 35 35Z"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    case "downArrow":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5534 0.413363C14.43 0.289758 14.2835 0.191695 14.1222 0.124786C13.9609 0.0578778 13.788 0.0234375 13.6134 0.0234375C13.4388 0.0234375 13.2659 0.0578778 13.1046 0.124786C12.9433 0.191695 12.7967 0.289758 12.6734 0.413363L7.50005 5.5867L2.32672 0.413363C2.07741 0.16406 1.73929 0.0240021 1.38672 0.0240021C1.03415 0.0240021 0.696021 0.16406 0.446717 0.413363C0.197413 0.662667 0.0573587 1.00079 0.0573587 1.35336C0.0573587 1.70593 0.197413 2.04406 0.446717 2.29336L6.56672 8.41336C6.69007 8.53697 6.83659 8.63503 6.99789 8.70194C7.15918 8.76885 7.33209 8.80329 7.50672 8.80329C7.68134 8.80329 7.85425 8.76885 8.01555 8.70194C8.17685 8.63503 8.32337 8.53697 8.44672 8.41336L14.5667 2.29336C15.0734 1.7867 15.0734 0.933363 14.5534 0.413363Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "addPhoto":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="75"
            height="64"
            viewBox="0 0 75 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.5 31.2701C62.5033 26.0678 61.2079 20.947 58.7311 16.3722C56.2544 11.7973 52.6747 7.91315 48.3168 5.072C43.9589 2.23085 38.9606 0.522608 33.7753 0.102211C28.5901 -0.318186 23.3819 0.562567 18.6232 2.66458C13.8645 4.7666 9.70588 8.02337 6.5245 12.1395C3.34313 16.2556 1.23967 21.1008 0.404922 26.2357C-0.429824 31.3706 0.0305553 36.6326 1.7443 41.5445C3.45804 46.4564 6.37093 50.8627 10.2187 54.3638C10.2978 54.4624 10.3929 54.5469 10.5 54.6138C16.2178 59.7073 23.6082 62.5217 31.2656 62.5217C38.9231 62.5217 46.3135 59.7073 52.0312 54.6138L52.2813 54.3638C55.5037 51.4422 58.0779 47.8776 59.838 43.8999C61.5981 39.9222 62.5049 35.6198 62.5 31.2701ZM2.5 31.2701C2.49962 26.5448 3.66397 21.8922 5.89001 17.724C8.11605 13.5559 11.3352 10.0007 15.2625 7.37298C19.1898 4.74529 23.7043 3.12612 28.4064 2.65876C33.1086 2.1914 37.8535 2.89024 42.2212 4.69346C46.5889 6.49668 50.4449 9.34868 53.4478 12.9971C56.4508 16.6455 58.5082 20.9779 59.438 25.6108C60.3677 30.2438 60.1412 35.0345 58.7785 39.559C57.4157 44.0836 54.9588 48.2025 51.625 51.5513C48.5218 46.3526 43.5457 42.5394 37.7187 40.8951C40.4248 39.4524 42.5709 37.1464 43.8159 34.3439C45.0609 31.5413 45.3333 28.403 44.5897 25.4279C43.8462 22.4528 42.1294 19.8116 39.7123 17.9242C37.2953 16.0369 34.3166 15.0117 31.25 15.0117C28.1834 15.0117 25.2047 16.0369 22.7877 17.9242C20.3706 19.8116 18.6538 22.4528 17.9103 25.4279C17.1667 28.403 17.4391 31.5413 18.6841 34.3439C19.9291 37.1464 22.0752 39.4524 24.7812 40.8951C18.9543 42.5394 13.9782 46.3526 10.875 51.5513C5.51473 46.1621 2.50401 38.8712 2.5 31.2701ZM31.25 40.0201C29.025 40.0201 26.8499 39.3603 24.9998 38.1241C23.1498 36.8879 21.7078 35.1309 20.8564 33.0753C20.0049 31.0196 19.7821 28.7576 20.2162 26.5753C20.6502 24.393 21.7217 22.3885 23.295 20.8151C24.8684 19.2418 26.8729 18.1703 29.0552 17.7362C31.2375 17.3022 33.4995 17.5249 35.5552 18.3764C37.6109 19.2279 39.3679 20.6699 40.604 22.5199C41.8402 24.37 42.5 26.545 42.5 28.7701C42.5 31.7538 41.3147 34.6152 39.2049 36.725C37.0952 38.8348 34.2337 40.0201 31.25 40.0201ZM12.7812 53.2701C14.6373 50.0087 17.3239 47.2969 20.5678 45.4105C23.8118 43.5242 27.4974 42.5304 31.25 42.5304C35.0026 42.5304 38.6882 43.5242 41.9322 45.4105C45.1761 47.2969 47.8627 50.0087 49.7188 53.2701C44.5507 57.6263 38.0091 60.0155 31.25 60.0155C24.4909 60.0155 17.9493 57.6263 12.7812 53.2701Z"
              fill={color}
            />
            <path
              d="M74.9331 56.65H68.1291V63.634H63.3771V56.65H56.5731V52.258H63.3771V45.274H68.1291V52.258H74.9331V56.65Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "filledStar":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="68"
            height="64"
            viewBox="0 0 68 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.0003 51.5665L54.6003 63.9998L49.1337 40.5665L67.3337 24.7998L43.367 22.7665L34.0003 0.666504L24.6337 22.7665L0.666992 24.7998L18.867 40.5665L13.4003 63.9998L34.0003 51.5665Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "halfFilledStar":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="68"
            height="64"
            viewBox="0 0 68 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M67.3337 24.7998L43.367 22.7332L34.0003 0.666504L24.6337 22.7665L0.666992 24.7998L18.867 40.5665L13.4003 63.9998L34.0003 51.5665L54.6003 63.9998L49.167 40.5665L67.3337 24.7998ZM34.0003 45.3332V14.3332L39.7003 27.7998L54.3003 29.0665L43.2337 38.6665L46.567 52.9332L34.0003 45.3332Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "star":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="68"
            height="64"
            viewBox="0 0 68 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M67.3337 24.7998L43.367 22.7332L34.0003 0.666504L24.6337 22.7665L0.666992 24.7998L18.867 40.5665L13.4003 63.9998L34.0003 51.5665L54.6003 63.9998L49.167 40.5665L67.3337 24.7998ZM34.0003 45.3332L21.467 52.8998L24.8003 38.6332L13.7337 29.0332L28.3337 27.7665L34.0003 14.3332L39.7003 27.7998L54.3003 29.0665L43.2337 38.6665L46.567 52.9332L34.0003 45.3332Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "caretRight":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.355291 0.31571C0.242666 0.415135 0.153312 0.533234 0.0923468 0.663246C0.0313812 0.793257 0 0.932628 0 1.07338C0 1.21414 0.0313812 1.35351 0.0923468 1.48352C0.153312 1.61353 0.242666 1.73163 0.355291 1.83105L5.06911 6.00094L0.355291 10.1708C0.128132 10.3718 0.000514428 10.6443 0.000514428 10.9285C0.000514428 11.2127 0.128132 11.4852 0.355291 11.6862C0.582451 11.8871 0.890546 12 1.2118 12C1.53305 12 1.84114 11.8871 2.0683 11.6862L7.64471 6.75323C7.75734 6.65381 7.84669 6.53571 7.90765 6.4057C7.96862 6.27569 8 6.13632 8 5.99556C8 5.85481 7.96862 5.71544 7.90765 5.58543C7.84669 5.45542 7.75734 5.33732 7.64471 5.23789L2.0683 0.304963C1.60664 -0.103428 0.829104 -0.103428 0.355291 0.31571Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "heart":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="68"
            height="60"
            viewBox="0 0 68 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5003 58.0002L23.7503 52.7502C17.8614 47.3613 12.5414 42.0135 7.79033 36.7068C3.03922 31.4002 0.664772 25.5535 0.666994 19.1668C0.666994 13.9446 2.41699 9.5835 5.91699 6.0835C9.41699 2.5835 13.7781 0.833502 19.0003 0.833502C21.9448 0.833502 24.7225 1.45795 27.3337 2.70683C29.9448 3.95572 32.167 5.66461 34.0003 7.8335C35.8337 5.66683 38.0559 3.95795 40.667 2.70683C43.2781 1.45572 46.0559 0.83128 49.0003 0.833502C54.2225 0.833502 58.5837 2.5835 62.0837 6.0835C65.5837 9.5835 67.3337 13.9446 67.3337 19.1668C67.3337 25.5557 64.9725 31.4168 60.2503 36.7502C55.5281 42.0835 50.167 47.4446 44.167 52.8335L38.5003 58.0002C37.2225 59.2224 35.7225 59.8335 34.0003 59.8335C32.2781 59.8335 30.7781 59.2224 29.5003 58.0002ZM30.8337 14.5002C29.2225 12.2224 27.5003 10.4857 25.667 9.29017C23.8337 8.09461 21.6114 7.49795 19.0003 7.50017C15.667 7.50017 12.8892 8.61128 10.667 10.8335C8.44477 13.0557 7.33366 15.8335 7.33366 19.1668C7.33366 22.0557 8.36144 25.1257 10.417 28.3768C12.4725 31.6279 14.9314 34.7802 17.7937 37.8335C20.6537 40.8891 23.5981 43.7502 26.627 46.4168C29.6559 49.0835 32.1137 51.2779 34.0003 53.0002C35.8892 51.2779 38.3481 49.0835 41.377 46.4168C44.4059 43.7502 47.3503 40.8891 50.2103 37.8335C53.0703 34.7779 55.5281 31.6257 57.5837 28.3768C59.6392 25.1279 60.667 22.0579 60.667 19.1668C60.667 15.8335 59.5559 13.0557 57.3337 10.8335C55.1114 8.61128 52.3337 7.50017 49.0003 7.50017C46.3892 7.50017 44.167 8.09683 42.3337 9.29017C40.5003 10.4835 38.7781 12.2202 37.167 14.5002C36.7781 15.0557 36.3059 15.4724 35.7503 15.7502C35.1948 16.0279 34.6114 16.1668 34.0003 16.1668C33.3892 16.1668 32.8059 16.0279 32.2503 15.7502C31.6948 15.4724 31.2225 15.0557 30.8337 14.5002Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "file":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="54"
            height="64"
            viewBox="0 0 54 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.875 18.6251L35.375 1.12509C35.2654 1.00242 35.1303 0.905265 34.9791 0.840474C34.8279 0.775683 34.6644 0.744829 34.5 0.750087H4.5C3.50544 0.750087 2.55161 1.14517 1.84835 1.84844C1.14509 2.5517 0.75 3.50552 0.75 4.50009V59.5001C0.75 60.4947 1.14509 61.4485 1.84835 62.1517C2.55161 62.855 3.50544 63.2501 4.5 63.2501H49.5C50.4946 63.2501 51.4484 62.855 52.1516 62.1517C52.8549 61.4485 53.25 60.4947 53.25 59.5001V19.5001C53.2553 19.3357 53.2244 19.1721 53.1596 19.021C53.0948 18.8698 52.9977 18.7347 52.875 18.6251ZM35.75 5.03134L48.9688 18.2501H35.75V5.03134ZM49.5 60.7501H4.5C4.16848 60.7501 3.85054 60.6184 3.61612 60.384C3.3817 60.1496 3.25 59.8316 3.25 59.5001V4.50009C3.25 4.16857 3.3817 3.85062 3.61612 3.6162C3.85054 3.38178 4.16848 3.25009 4.5 3.25009H33.25V19.5001C33.25 19.8316 33.3817 20.1495 33.6161 20.384C33.8505 20.6184 34.1685 20.7501 34.5 20.7501H50.75V59.5001C50.75 59.8316 50.6183 60.1496 50.3839 60.384C50.1495 60.6184 49.8315 60.7501 49.5 60.7501ZM38.25 34.5001C38.25 34.8316 38.1183 35.1496 37.8839 35.384C37.6495 35.6184 37.3315 35.7501 37 35.7501H17C16.6685 35.7501 16.3505 35.6184 16.1161 35.384C15.8817 35.1496 15.75 34.8316 15.75 34.5001C15.75 34.1686 15.8817 33.8506 16.1161 33.6162C16.3505 33.3818 16.6685 33.2501 17 33.2501H37C37.3315 33.2501 37.6495 33.3818 37.8839 33.6162C38.1183 33.8506 38.25 34.1686 38.25 34.5001ZM38.25 44.5001C38.25 44.8316 38.1183 45.1496 37.8839 45.384C37.6495 45.6184 37.3315 45.7501 37 45.7501H17C16.6685 45.7501 16.3505 45.6184 16.1161 45.384C15.8817 45.1496 15.75 44.8316 15.75 44.5001C15.75 44.1686 15.8817 43.8506 16.1161 43.6162C16.3505 43.3818 16.6685 43.2501 17 43.2501H37C37.3315 43.2501 37.6495 43.3818 37.8839 43.6162C38.1183 43.8506 38.25 44.1686 38.25 44.5001Z"
              fill={color}
            />
          </svg>
        </span>
      );
    case "search":
      return (
        <span
          style={{
            width: sizeString,
            height: sizeString,
            display: "inline-block",
            ...style,
          }}
          onClick={onClick}
          className={className}
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.0167 27.15L24.35 21.5C26.1783 19.1708 27.1704 16.2944 27.1667 13.3333C27.1667 10.6963 26.3847 8.11839 24.9196 5.92574C23.4545 3.73308 21.3721 2.02411 18.9358 1.01495C16.4994 0.00577708 13.8185 -0.258267 11.2321 0.256202C8.64572 0.770672 6.26995 2.04055 4.40525 3.90525C2.54055 5.76995 1.27067 8.14572 0.756202 10.7321C0.241733 13.3185 0.505777 15.9994 1.51495 18.4358C2.52411 20.8721 4.23308 22.9545 6.42574 24.4196C8.61839 25.8847 11.1963 26.6667 13.8333 26.6667C16.7944 26.6704 19.6708 25.6783 22 23.85L27.65 29.5167C27.8049 29.6729 27.9893 29.7969 28.1924 29.8815C28.3955 29.9661 28.6133 30.0097 28.8333 30.0097C29.0534 30.0097 29.2712 29.9661 29.4743 29.8815C29.6774 29.7969 29.8617 29.6729 30.0167 29.5167C30.1729 29.3617 30.2969 29.1774 30.3815 28.9743C30.4661 28.7712 30.5097 28.5534 30.5097 28.3333C30.5097 28.1133 30.4661 27.8955 30.3815 27.6924C30.2969 27.4893 30.1729 27.3049 30.0167 27.15ZM3.83334 13.3333C3.83334 11.3555 4.41983 9.42213 5.51864 7.77764C6.61746 6.13315 8.17924 4.85142 10.0065 4.09454C11.8338 3.33767 13.8444 3.13963 15.7842 3.52549C17.7241 3.91134 19.5059 4.86375 20.9044 6.26227C22.3029 7.6608 23.2553 9.44263 23.6412 11.3824C24.027 13.3222 23.829 15.3329 23.0721 17.1602C22.3153 18.9874 21.0335 20.5492 19.389 21.648C17.7446 22.7468 15.8112 23.3333 13.8333 23.3333C11.1812 23.3333 8.63764 22.2798 6.76227 20.4044C4.88691 18.529 3.83334 15.9855 3.83334 13.3333Z"
              fill={color}
            />
          </svg>
        </span>
      );
  }
}
