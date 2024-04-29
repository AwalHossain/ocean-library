import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BookTabs() {
  return (
    <Tabs defaultValue="read" className="w-auto mx-auto">
      <div className="w-auto md:w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 rounded-3xl">
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="currently-reading">Currently Reading</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="read">
        {/* <div className="grid grid-cols-5 items-center gap-5 mb-5 bg-[#e8e0c6] ">
          <div className="col-span-2">
            <h4 className="text-xl text-center">Title and Authr</h4>
          </div>
          <div>
            <h4 className="text-xl text-center">Rating</h4>
          </div>
          <div>
            <h4 className="text-xl text-center">Date</h4>
          </div>
          <div>
            <h4 className="text-xl text-center">Action</h4>
          </div>
        </div> */}
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full items-center bg-[#e8e0c6] p-5">
              <div className="w-[100px] h-[120px] md:w-[180px] md:h-[200px] sm:mx-auto">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1503658901i/36121086.jpg"
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <div className="mx-auto hidden md:block">
                <h2 className="text-xl font-semibold">Saving Noad</h2>
                <p className="text-sm font-semibold">Lucinda Berry</p>
              </div>
              <div className=" justify-center items-center space-x-1 hidden lg:flex">
                {Array.from({ length: 3 }, (_, index) => (
                  <svg
                    key={index}
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="mx-auto hidden lg:block">
                <span className="tex-xl font-semibold">23Feb 2023</span>
              </div>
              <div className="ml-auto sm:mx-auto">
                <button>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="currently-reading">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="current">Current password</label>
              <input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <label htmlFor="new">New password</label>
              <input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
