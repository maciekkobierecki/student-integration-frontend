import React from 'react';
import CreateGroupForm from "./create-group-form/CreateGroupForm";
import './GroupCreationPage.css';

const GroupCreationPage = () => {
  return (
    <div className="group-creation-page">
      <h4 className="mt-2 text-center">Utwórz grupę</h4>
      <CreateGroupForm/>
    </div>
  );
};

export default GroupCreationPage;
