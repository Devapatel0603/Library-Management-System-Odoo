import React from "react";
import SearchBook from "./SearchBook";
import Book from "./Book";

const GuestHome = () => {
  const bookDetail = {
    name: "Hello",
    author: "Author",
    year: "2022",
    description: "Description",
    imageLink:
      "http://books.google.com/books/content?id=yDB0tAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  };
  return (
    <div className="mt-4">
      <h2 className="text-center text-xl font-medium text-amber-600">
        Search the book available in library
      </h2>
      <SearchBook classes={"mx-auto w-full md:w-9/12"} />

      {/* books */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="w-10/12">
          <h2 className="text-xl font-semibold hidden sm:block md:my-4">
            New Arrivals
          </h2>
          <div className="flex flex-col gap-4">
            <Book bookDetail={bookDetail} />
            <Book bookDetail={bookDetail} />
          </div>
        </div>
        <div className="w-10/12 hidden sm:block">
          <h2 className="text-xl font-semibold md:my-4">Trending</h2>
          <div className="flex flex-col gap-4">
            <Book bookDetail={bookDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestHome;
