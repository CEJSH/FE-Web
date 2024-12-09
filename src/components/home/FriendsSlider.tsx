import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import FriendItem, { AddFriendItem, SeeMoreItem } from "./FriendItem";

export default function FriendsSlider() {
  return (
    <div className="w-full">
      <Spacing size={16} />
      <Flex style={{ overflowX: "scroll", scrollbarWidth: "none" }}>
        <Spacing size={16} direction="horizontal" />
        <AddFriendItem
          onClick={() => {
            console.log("친구를 추가하라");
          }}
        />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <SeeMoreItem
          onClick={() => {
            console.log("친구를 추가하라");
          }}
        />
      </Flex>
    </div>
  );
}
