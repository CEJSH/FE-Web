import { apiClient } from "@/shared/api/api";
import { ReportRequestInterface } from "@/models/report";

/** 신고 생성 */
/**신고 타입에 맞는 데이터의 id. 회원 신고: userId, 그룹 신고: groupId, 피드 신고: feedId */
export async function postReport({
  report,
}: {
  report: ReportRequestInterface;
}) {
  await apiClient.post(`/reports`, report);
  return { message: "신고를 완료하였습니다." };
}
