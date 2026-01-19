import HeaderWithBtn from "@/shared/layout/Header/HeaderWithBtn";
import LightyIcon from "@/shared/components/Icon/LightyIcon";
import Spacing from "@/shared/components/Spacing";
import SignupForm from "@/features/auth/components/SignupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-6 bg-base-white h-full pt-safe-top">
      <HeaderWithBtn headerLabel="프로필 생성" bgColor="white" />
      <Spacing size={76} />
      <div className={styles.container}>
        <LightyIcon width="20" height="20" color={"#0A0A0A"} />
        <div className={styles.greeting}>
          <div>반가워요!</div>
          <div>프로필 계정을 만들어볼까요?</div>
        </div>
        <span className="text-B3 text-grayscale-500">
          프로필 사진과 계정 아이디를 필수로 등록해주세요.
        </span>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}

const styles = {
  container: "flex flex-col gap-4 px-6",
  greeting: "flex flex-col gap-[7px] text-T2",
};
