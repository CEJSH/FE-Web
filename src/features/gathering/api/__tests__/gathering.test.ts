import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  deleteGathering,
  getGatheringDetail,
  getGatherings,
  getGatheringsEnded,
  getGatheringAll,
  getGatheringNoFeed,
  postGathering,
  postAcceptGatheringInvitation,
  postRejectGatheringInvitation,
} from "@/features/gathering/api/gathering";

const getMock = vi.fn();
const postMock = vi.fn();
const patchMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("@/shared/api/api", () => ({
  __esModule: true,
  apiClient: {
    get: (...args: unknown[]) => getMock(...args),
    post: (...args: unknown[]) => postMock(...args),
    patch: (...args: unknown[]) => patchMock(...args),
    delete: (...args: unknown[]) => deleteMock(...args),
  },
}));

describe("gathering api", () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
    patchMock.mockReset();
    deleteMock.mockReset();
  });

  it("serializes cursor params for getGatherings", async () => {
    getMock.mockResolvedValue({ data: "ok" });
    const cursor = { createdAt: "2024-01-01", id: "1" };

    await getGatherings({
      cursor,
      limit: 10,
      minDate: "2024-01-01",
      maxDate: "2024-12-31",
    });

    expect(getMock).toHaveBeenCalledWith("/gatherings", {
      params: {
        cursor: JSON.stringify(cursor),
        limit: 10,
        minDate: "2024-01-01",
        maxDate: "2024-12-31",
      },
    });
  });

  it("skips request when gatheringId is missing", async () => {
    const result = await getGatheringDetail({ gatheringId: "" });

    expect(result).toBeUndefined();
    expect(getMock).not.toHaveBeenCalled();
  });

  it("posts creation payload", async () => {
    postMock.mockResolvedValue({ data: {} });
    await postGathering({
      gathering: { title: "A", date: "2024", location: "here" } as any,
    });

    expect(postMock).toHaveBeenCalledWith("/gatherings", {
      title: "A",
      date: "2024",
      location: "here",
    });
  });

  it("deletes gathering", async () => {
    deleteMock.mockResolvedValue({ data: {} });
    const res = await deleteGathering({ gatheringId: "gid-1" });

    expect(deleteMock).toHaveBeenCalledWith("/gatherings/gid-1");
    expect(res.message).toMatch("삭제");
  });

  it("stringifies cursor for getGatheringNoFeed", async () => {
    getMock.mockResolvedValue({ data: "ok" });
    const cursor = { createdAt: "2024-01-01", id: "1" };

    await getGatheringNoFeed({ cursor, limit: 5 });

    expect(getMock).toHaveBeenCalledWith("/gatherings/no-feed", {
      params: {
        cursor: JSON.stringify(cursor),
        limit: 5,
      },
    });
  });

  it("requests ended gatherings with params", async () => {
    getMock.mockResolvedValue({ data: "ok" });
    const cursor = { createdAt: "2024-01-01", id: "1" };

    await getGatheringsEnded({
      cursor,
      limit: 20,
      minDate: "2024-01-01",
      maxDate: "2024-12-31",
    });

    expect(getMock).toHaveBeenCalledWith("/gatherings/ended", {
      params: {
        cursor: JSON.stringify(cursor),
        limit: 20,
        minDate: "2024-01-01",
        maxDate: "2024-12-31",
      },
    });
  });

  it("requests all gatherings with default limit", async () => {
    getMock.mockResolvedValue({ data: "ok" });
    await getGatheringAll({ cursor: null, minDate: "2024-01-01", maxDate: "2024-12-31" });

    expect(getMock).toHaveBeenCalledWith("/gatherings/all", {
      params: {
        cursor: JSON.stringify(null),
        limit: 365,
        minDate: "2024-01-01",
        maxDate: "2024-12-31",
      },
    });
  });

  it("accepts invitation with ids", async () => {
    postMock.mockResolvedValue({ data: {} });
    await postAcceptGatheringInvitation({
      invitationId: "inv-1",
      gatheringId: "gid-1",
    });

    expect(postMock).toHaveBeenCalledWith("/gatherings/accept", {
      invitationId: "inv-1",
      gatheringId: "gid-1",
    });
  });

  it("rejects invitation with id", async () => {
    postMock.mockResolvedValue({ data: {} });
    await postRejectGatheringInvitation({ invitationId: "inv-2" });

    expect(postMock).toHaveBeenCalledWith("/gatherings/reject", { invitationId: "inv-2" });
  });
});
