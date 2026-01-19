import React, { useState } from "react";
import Flex from "../Flex";
import Spacing from "../Spacing";
import Image from "next/image";
import clsx from "clsx";
import {
  emoji_stickers,
  sparkle_stickers,
  // sparkle_stickers,
  // sweets_stickers,
  // vintage_stickers,
} from "@/shared/constants/photoCard";
import BottomSheetWrapper from "./shared/BottomSheetWrapper";
// import LockIcon from "../Icon/LockIcon";

export default function DecoStickerBottomSheet({
  open = true,
  onClose,
  handleSticker,
}: {
  open?: boolean;
  handleSticker: (path: string) => void;
  onClose: () => void;
}) {
  const [selectedKind, setSelectedKind] = useState("이모지");
  const decoKinds = ["이모지", "스파클"];
  // const decoKinds = ["이모지", "스파클", "파스텔", "스위츠", "빈티지"];
  const stickers = () => {
    if (selectedKind === "스파클") {
      return { stickers: sparkle_stickers, path: `deco_stickers/sparkle` };
    } else if (selectedKind === "이모지") {
      return { stickers: emoji_stickers, path: `deco_stickers/emoji` };
    } else return null;
    // } else if (selectedKind === "파스텔")
    //   return { stickers: sparkle_stickers, path: `deco_stickers/pastel` };
    // else if (selectedKind === "스위츠")
    //   return { stickers: sweets_stickers, path: `deco_stickers/sweets` };
    // else if (selectedKind === "빈티지")
    //   return { stickers: vintage_stickers, path: `deco_stickers/vintage` };
    // else return null;
  };
  const selectedStickers = stickers();

  return (
    <BottomSheetWrapper bar onClose={onClose} open={open} bright={true}>
      <Flex direction="column" className="p-6 pt-1" align="center">
        <div>
          <div role="tablist" aria-label="스티커 종류" className="flex">
            {decoKinds.map((kind) => (
              <button
                type="button"
                role="tab"
                aria-selected={selectedKind === kind}
                tabIndex={selectedKind === kind ? 0 : -1}
                className={clsx(
                  styles.stickerKind,
                  selectedKind === kind
                    ? "font-[600] text-grayscale-900"
                    : "text-grayscale-400"
                )}
                key={kind}
                onClick={() => setSelectedKind(kind)}
              >
                {kind}
              </button>
            ))}
          </div>
          <Spacing size={16} />
          <div className={styles.wrapper}>
            {!!selectedStickers
              ? selectedStickers.stickers.map((sticker, idx) => (
                  <Flex
                    key={`pastel_sticker_${idx}`}
                    justify="center"
                    align="center"
                    className={styles.box}
                  >
                    <button
                      type="button"
                      aria-label={`${selectedKind} 스티커 ${idx + 1} 선택`}
                      onClick={() =>
                        handleSticker(
                          `https://cdn.lighty.today/${selectedStickers.path}/${sticker}`
                        )
                      }
                      className="w-16 h-16 object-cover bg-transparent border-0 p-0"
                    >
                      <Image
                        src={`https://cdn.lighty.today/${selectedStickers.path}/${sticker}`}
                        loading={idx < 2 ? "eager" : "lazy"}
                        className={clsx(
                          "w-16 h-16 object-cover",
                          selectedKind === "이모지" ? "p-3" : ""
                        )}
                        alt={`sticker${idx}`}
                        width={64}
                        height={64}
                      />
                    </button>
                    {/* {(selectedKind === "스위츠" ||
                      selectedKind === "파스텔" ||
                      selectedKind === "빈티지") && (
                      <Flex
                        justify="center"
                        align="center"
                        className="absolute inset-0"
                      >
                        <div className={styles.blurWrapper}>
                          <LockIcon />
                          <span className="text-T5 text-base-white">
                            프리미엄 회원만 이용 가능해요.
                          </span>
                        </div>
                      </Flex>
                    )} */}
                  </Flex>
                ))
              : null}
          </div>
        </div>
      </Flex>
    </BottomSheetWrapper>
  );
}

const styles = {
  blurWrapper:
    "flex flex-col !bg-[#00000020] justify-center items-center p-6 rounded-2xl gap-3 opacity-50",
  stickerKind: "py-2 px-3 text-B2 cursor-pointer bg-transparent border-0",
  wrapper: "relative grid grid-cols-4 grid-rows-3 gap-5 w-fit",
  box: "bg-grayscale-50 rounded-xl w-16 h-16",
};
