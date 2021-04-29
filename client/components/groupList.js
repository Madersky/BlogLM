import React from "react";
import Link from "next/link";

const GroupsList = ({ groups }) => {
  return (
    <div className="container">
      {groups.map((group) => {
        return (
          <div className="groups-list">
            <li key={group.id}>
              <Link href="/groups/[groupId]" as={`/groups/${group.id}`}>
                <a>{group.name}</a>
              </Link>
              <hr className="hr-style" />
              <button className="join-group-bttn">Join</button>
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default GroupsList;
