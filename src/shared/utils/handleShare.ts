const isShareSupported = () => navigator.share ?? false;

type Data = {
  url: string;
  text: string;
  title: string;
  files?: File[];
};

const handleShare = async (data: Data) => {
  if (isShareSupported()) {
    try {
      await navigator.share(data);
      alert("Shared successfully!");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
};

export default handleShare;
