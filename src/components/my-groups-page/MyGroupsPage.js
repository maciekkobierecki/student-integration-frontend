import React from 'react';
import './MyGroupsPage.css';
import MyGroupsList from "./my-groups-list/MyGroupsList";

const MyGroupsPage = () => {
  return (
    <div className="my-groups-page">
      <h4 className="mt-2">Moje grupy</h4>
      <MyGroupsList/>
    </div>
  );
};

export default MyGroupsPage;
