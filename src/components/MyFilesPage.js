import React from 'react';
import MyStudiesList from "./my-studies-list/MyStudiesList";
import FileList from "./file-list/FileList";
import './MyFilesPage.css';

const MyFilesPage = () => {
  return (
    <div className="my-files-page">
      <div className="my-studies-column">
        <MyStudiesList/>
      </div>
      <div className="files-column">
        <FileList/>
      </div>
    </div>
  );
};

export default MyFilesPage
