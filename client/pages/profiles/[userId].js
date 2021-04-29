import React from "react";
import buildClient from "../../api/buildClient";

import { useRouter } from "next/router";
import Link from "next/link";

import PostsList from "../../components/postsList";

const ProfilePage = ({ currentUser, profile, posts, comments }) => {
  return (
    <body>
      <div className="profile-content">
        <div className="profile-item1">
          <div className="profile-icon"></div>

          <div className="profile-name">
            <Link
              href="/profiles/editProfile"
              as={`/profiles/${profile.userId}`}
            >
              <button className="button-edit-profile">Edit profile</button>
            </Link>
            {profile[0].firstName} {profile[0].lastName}
          </div>
        </div>

        <div className="profile-item2">
          <PostsList
            posts={posts}
            currentUser={currentUser}
            comments={comments}
          />
        </div>

        <div className="profile-item3">
          <div id="profile-info-general-container">
            <div className="firstname">
              Name:
              {profile[0].firstName}
            </div>
            <div className="lastname">
              Surname:
              {profile[0].lastName}
            </div>
            <div className="age">
              Age:
              {profile[0].age}
            </div>
            <div className="birthday">
              Date of birth:
              {profile[0].birthDate}
            </div>
            <div className="hometown">
              Hometown:
              {profile[0].hometown}
            </div>
            <div className="socialStatus">
              Social status:
              {profile[0].socialStatus}
            </div>
            <div className="telNumber">
              Phone number:
              {profile[0].phoneNumber}
            </div>
          </div>
          <div id="profile-info-hobby-container">
            <div className="hobbys">
              Hobbys:
              {profile[0].hobbys}
            </div>
            <div className="interests">
              Intrests:
              {profile[0].interests}
            </div>
          </div>
          <div id="profile-info-education-container">
            <div className="school">
              Schools:
              {profile[0].school}
            </div>
            <div className="profession">
              Professions:
              {profile[0].profession}
            </div>
          </div>
          <div id="profile-info-about-container">
            <div className="message">
              About:
              {profile[0].message}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

ProfilePage.getInitialProps = async (context, client, currentUser) => {
  const urls = [
    `api/profiles/id/${context.query.userId}`,
    `api/posts/id/${context.query.userId}`,
    "api/comments",
  ];
  const [profileRes, postsRes, commentsRes] = await Promise.all(
    urls.map((url) => client.get(url))
  );

  console.log(postsRes.data);
  return {
    ...profileRes.data,
    ...postsRes.data,
    ...commentsRes.data,
  };
};

export default ProfilePage;
