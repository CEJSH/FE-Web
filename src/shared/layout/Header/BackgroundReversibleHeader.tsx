import { isIntersectingAtom } from "@/shared/state/scroll";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import Spacing from "@/shared/components/Spacing";
import LightyLetterLogo from "@/shared/components/Icon/LightyLetterLogo";
import Flex from "@/shared/components/Flex";
import MailIcon from "@/shared/components/Icon/MailIcon";
import { DotIcon } from "@/shared/components/Icon/DotIcon";
import NoticeIcon from "@/shared/components/Icon/NoticeIcon";

export default function BackgroundReversibleHeader() {
  const router = useRouter();
  const isIntersecting = useRecoilValue(isIntersectingAtom);

  return (
    <div
      style={{
        top: 0,
        zIndex: 12,
        position: "fixed",
        background: isIntersecting ? "transparent" : "#fff",
        transition: "background-color 0.5s ease",
      }}
      className={
        "min-w-[320px] max-w-[430px] w-full flex justify-between items-center h-12 bg-base-white fixed text-T4 px-5"
      }
    >
      <div className={styles.lightyIconContainer}>
        <LightyIcon color={isIntersecting ? "#fff" : "#0A0A0A"} />
      </div>
      <Spacing size={4} direction="horizontal" />
      <LightyLetterLogo
        color={isIntersecting ? "#fff" : "#0A0A0A"}
        pointer
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="flex-1" />
      <Flex align="center">
        <div
          style={{
            position: "relative",
          }}
          onMouseDown={() => {
            router.push("/invitation");
          }}
          className={styles.iconWrapperStyle}
        >
          <MailIcon
            width="24"
            height="24"
            color={isIntersecting ? "#fff" : "#0A0A0A"}
          />
          <DotIcon display={true} className="absolute top-0 right-[6px]" />
        </div>
        <Spacing size={4} direction="horizontal" />
        <div
          onMouseDown={() => {
            router.push("/notice");
          }}
          className={styles.iconWrapperStyle}
        >
          <NoticeIcon color={isIntersecting ? "#fff" : "#0A0A0A"} />
        </div>
      </Flex>
    </div>
  );
}

const styles = {
  arrowIconContainer:
    "w-10 h-10 py-[10px] pl-[17px] pr-[3px] cursor-pointer hover:animate-shrink-grow",
  iconWrapperStyle:
    "flex justify-center items-center w-10 h-10 p-2 cursor-pointer  hover:animate-shrink-grow-less",
  lightyIconContainer: "h-10 py-[10px]",
};
