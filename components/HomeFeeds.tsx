import FeedCard from "./FeedCard";
import { FeedsOfBar } from "./FeedsOfBar";
import { PostOnHome } from "./PostOnHome";

export function HomeFeeds() {
  return (
    <>
      <div className=" w-6/12 border-x border-slate-200  dark:border-[#2f3336] h-screen overflow-scroll scrollbar-none">
        <FeedsOfBar />
        <PostOnHome />
        <div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </div>
    </>
  );
}
