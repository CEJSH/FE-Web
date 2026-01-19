import type * as lighty from "lighty-type";
import { postReport } from "@/features/report/api/report";
import { useMutation } from "@tanstack/react-query";

export interface ReportContentTypes {
  reportedId: string;
  type: lighty.ReportTypes;
  reason: string;
}
export default function useReport({
  onSuccess,
  onError,
}: {
  onSuccess: (data: { message: string }) => void;
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: ["report"],
    mutationFn: (report: {
      reportedId: string;
      type: lighty.ReportTypes;
      reason: string;
    }) => postReport({ report: { ...report } }),
    onSuccess: (data: { message: string }) => onSuccess(data),
    onError: (error: Error) => onError(error),
  });
}
