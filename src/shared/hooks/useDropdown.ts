import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export function useDropdown() {
  const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);
  /**드롭다운 메뉴*/
  const dropDownRef = useRef<HTMLDivElement>(null);
  /**옵션 버튼 */
  const btnRef = useRef<HTMLButtonElement>(null);

  const closeDropdown = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as Node | null;
    if (dropDownRef.current && !dropDownRef.current.contains(target)) {
      setOpenedDropdownId(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const target = event.target as Node | null;
      if (btnRef.current?.contains(target)) return;
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        setOpenedDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback((feedId: string) => {
    setOpenedDropdownId((prevId) => (prevId === feedId ? null : feedId));
  }, []);

  return {
    openedDropdownId,
    dropDownRef,
    btnRef,
    toggleDropdown,
    closeDropdown,
  };
}

export function useFriendsBox() {
  const [openedBoxId, setOpenedBoxId] = useState<string | null>(null);
  /**친구 상세정보 컨테이너 */
  const friendsRef = useRef<HTMLDivElement>(null);
  /**친구 정보 컨테이너 */
  const fBtnRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    const target = event.target as Node | null;
    if (fBtnRef.current?.contains(target)) return;
    if (friendsRef.current && !friendsRef.current.contains(target)) {
      setOpenedBoxId(null);
    }
  }, []);

  const closeBox = useCallback(() => {
    setOpenedBoxId(null);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleBox = useCallback((boxId: string) => {
    setOpenedBoxId((prevId) => (prevId === boxId ? null : boxId));
  }, []);

  return { openedBoxId, friendsRef, fBtnRef, toggleBox, closeBox };
}

export function useDropdownWithNoId() {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback((event: globalThis.MouseEvent) => {
    const target = event.target as Node | null;
    if (btnRef.current?.contains(target)) return;
    if (ref.current && !ref.current.contains(target)) {
      setOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return { opened, ref, btnRef, toggleDropdown };
}
