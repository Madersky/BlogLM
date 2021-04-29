import React, { useState } from "react";
import Link from "next/link";
import GroupsList from "../../components/groupList";
import useRequest from "../../hooks/use-request";

const GroupOverview = ({ groups }) => {
  const [name, setName] = useState("");

  const { doRequest, errors } = useRequest({
    url: "https://blog.dev/api/groups",
    method: "post",
    body: {
      name,
    },
    onSuccess: () => {
      Router.reload();
      console.log("Group created");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };
  return (
    <div className="overview-content">
      <div className="group-box">
        Group-box
        <GroupsList groups={groups} />
      </div>
      <div className="groups-properties">
        Create your own group!
        <hr className="hr-style-groups-list" />
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <button className="create-group-button"> Create </button>
          {errors}
        </form>
      </div>
    </div>
  );
};

GroupOverview.getInitialProps = async (context, client) => {
  const urls = [`api/groups`];

  const [groupsRes] = await Promise.all(urls.map((url) => client.get(url)));

  console.log(groupsRes.data);

  return {
    ...groupsRes.data,
  };
};

export default GroupOverview;
