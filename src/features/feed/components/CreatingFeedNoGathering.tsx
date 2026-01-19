import { useEffect, useState } from "react";
import type * as lighty from "lighty-type";
import { useRouter } from "next/navigation";
import FeedForm from "./FeedForm";
import useUploadFeedImages from "./hooks/useUploadFeedImages";
import { useQueryClient } from "@tanstack/react-query";
import useMakeFriendsFeed from "./hooks/useMakeFriendsFeed";
import { useRecoilValue } from "recoil";
import { friendsToShareIdsSelector } from "@/features/feed/state/record";
import { lightyToast } from "@/shared/utils/toast";
import DotSpinner from "@/shared/components/Spinner/DotSpinner";
import { queryKeys } from "@/lib/queryKeys";

export default function CreatingFeedNoGathering() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const friendIdsToShare = useRecoilValue(friendsToShareIdsSelector);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [feedInfo, setFeedInfo] = useState<lighty.CreateFriendFeedRequest>({
    friendIds: friendIdsToShare,
    imageUrls: [],
    content: "",
  });

  useEffect(() => {
    setFeedInfo((prev) => ({
      ...prev,
      friendIds: friendIdsToShare,
    }));
  }, [friendIdsToShare]);

  const handleFeedSuccess = async () => {
    router.replace("/feed");
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.feed.mine(),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.feed.all(),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.detail(),
      }),
    ]);
  };

  const { mutate: makeFriendsFeed, isPending } = useMakeFriendsFeed({
    feedRequest: feedInfo,
    onSuccess: handleFeedSuccess,
    onError: (error) => {
      lightyToast.error(error.message);
    },
  });

  const { mutate: uploadImages, isPending: isUploading } = useUploadFeedImages({
    files: filesToUpload,
    gatheringId: "",
    onSuccess: (data: { imageUrls: string[]; message: string }) => {
      if (setFeedInfo) {
        setFeedInfo((prev) => ({
          ...(prev as lighty.CreateFriendFeedRequest),
          imageUrls: data.imageUrls,
        }));
      }
    },
    onError: (error) => lightyToast.error(error.message),
  });

  useEffect(() => {
    if (feedInfo.imageUrls.length > 0) {
      makeFriendsFeed();
    }
  }, [feedInfo.imageUrls]);

  return (
    <div className={styles.container}>
      <FeedForm
        uploadImages={uploadImages}
        feedInfo={feedInfo}
        setFeedInfo={setFeedInfo}
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
      />
      {(isPending || isUploading) && <DotSpinner />}
    </div>
  );
}

const styles = {
  container: "relative bg-base-white",
};
