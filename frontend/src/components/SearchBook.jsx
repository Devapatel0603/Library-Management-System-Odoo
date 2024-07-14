import React from "react";
import Input from "./Input";
import Button from "./Button";

const SearchBook = ({ classes }) => {
  return (
    <>
      <form action="" className={`flex items-center gap-2 ${classes}`}>
        <Input inputName="book_name" placeholder="Book Name" />
        <Button buttonText="Search" />
      </form>
    </>
  );
};

export default SearchBook;
