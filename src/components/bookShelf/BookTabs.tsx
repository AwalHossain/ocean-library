import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetPreferenceQuery } from "@/redux/feature/book/bookApi";
import { IMyBooks } from "@/types";
import { useState } from "react";
import LoadingIcon from "../utils/LoadingIcon";
import CurrentyReading from "./CurrentyReading";
import ReadList from "./ReadList";

export function BookTabs() {
  const [selectedTab, setSelectedTab] = useState("read");
  const { isLoading, data, error } = useGetPreferenceQuery(undefined);
  console.log(data, "data", error, "error", isLoading, "loading");

  const userPreference = data?.data;

  console.log(userPreference, "userPreference");

  const userReadPreference = data?.data.filter(
    (item: IMyBooks) => item.status === "read"
  );
  const userReadingPreference = data?.data.filter(
    (item: IMyBooks) => item.status === "reading"
  );

  let content = null;

  if (isLoading) {
    content = <LoadingIcon />;
  }

  if (userPreference?.length === 0) {
    content = <div>No books found</div>;
  }

  if (selectedTab === "read" && userReadPreference?.length > 0) {
    content = userReadPreference.map((item: IMyBooks) => (
      <ReadList item={item} key={item.book._id} />
    ));
  }

  if (
    selectedTab === "currently-reading" &&
    userReadingPreference?.length > 0
  ) {
    content = userReadingPreference.map((item: IMyBooks) => (
      <CurrentyReading item={item} key={item.book._id} />
    ));
  }

  if (error) {
    content = <div>Something went wrong</div>;
  }

  // Update the selected tab when a tab is clicked
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Tabs defaultValue="read" className="w-auto mx-auto">
      <div className="w-auto md:w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 rounded-3xl">
          <TabsTrigger value="read" onClick={() => handleTabClick("read")}>
            Read
          </TabsTrigger>
          <TabsTrigger
            value="currently-reading"
            onClick={() => handleTabClick("currently-reading")}
          >
            Currently Reading
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="read">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          {content}
        </div>
      </TabsContent>
      <TabsContent value="currently-reading">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          {content}
        </div>
      </TabsContent>
    </Tabs>
  );
}
