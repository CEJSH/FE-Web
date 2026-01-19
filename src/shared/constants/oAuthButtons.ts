export type Providers = "kakao" | "google" | "apple";
export interface OAUTH {
  provider: Providers;
  color: string;
  label: string;
  icon: string;
}

const oAuthButtons: OAUTH[] = [
  {
    provider: "kakao",
    color: "#FAE300",
    label: "카카오로 계속하기",
    icon: "https://cdn.lighty.today/kakao.svg",
  },
  {
    provider: "google",
    color: "#fff",
    label: "Google로 계속하기",
    icon: "https://cdn.lighty.today/google.svg",
  },
  {
    provider: "apple",
    color: "#fff",
    label: "Apple로 계속하기",
    icon: "https://cdn.lighty.today/apple.svg",
  },
];

export default oAuthButtons;
