import { IconColorType } from "@/lib/utils/IconColorType";

export default function CloseIcon({ color }: { color: IconColorType }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={color}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title></title>{" "}
        <g id="Complete">
          {" "}
          <g id="x-circle">
            {" "}
            <g>
              {" "}
              <circle
                cx="12"
                cy="12"
                data-name="--Circle"
                fill="none"
                id="_--Circle"
                r="10"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></circle>{" "}
              <line
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.5"
                x2="9.5"
                y1="9.5"
                y2="14.5"
              ></line>{" "}
              <line
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.5"
                x2="9.5"
                y1="14.5"
                y2="9.5"
              ></line>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
