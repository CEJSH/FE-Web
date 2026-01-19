import React from "react";

export default function NoticeIcon({ color }: { color?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icon">
        <path
          id="Icon"
          d="M8.66667 21.0404C9.41857 21.6371 10.4115 22 11.5 22C12.5885 22 13.5814 21.6371 14.3333 21.0404M3.53936 17.9697C3.0914 17.9697 2.8412 17.2705 3.11217 16.8821C3.74095 15.9807 4.34784 14.6588 4.34784 13.0668L4.37377 10.7601C4.37377 6.47431 7.56429 3 11.5 3C15.4937 3 18.7312 6.52549 18.7312 10.8744L18.7053 13.0668C18.7053 14.6697 19.2912 15.9989 19.8944 16.9006C20.1549 17.29 19.9041 17.9697 19.4617 17.9697H3.53936Z"
          stroke={color ?? "white"}
          style={{ strokeOpacity: 1, transition: "stroke 0.5s ease" }}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
