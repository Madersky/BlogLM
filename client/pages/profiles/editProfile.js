import { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const CreateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [school, setSchool] = useState("");
  const [profession, setProfession] = useState("");
  const [hometown, setHometown] = useState("");
  const [socialStatus, setSocialStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [interests, setInterests] = useState("");
  const [hobbys, setHobbys] = useState("");
  const [message, setMessage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { doRequest, errors } = useRequest({
    url: "https://blog.dev/api/profiles",
    method: "post",
    body: {
      firstName,
      lastName,
      age,
      birthDate,
      school,
      profession,
      hometown,
      socialStatus,
      phoneNumber,
      interests,
      hobbys,
      message,
      profilePhoto,
    },
    onSuccess: () => {
      Router.push("/content/home");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <body>
      <div className="edit-profile-container">
        <form onSubmit={onSubmit}>
          <h2 className="header-edit-profile">Edit Profile</h2>
          <div className="edit-profile-item1">
            <h2 className="header-edit-profile-item1">General</h2>
            <label>Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label>Surname</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label>Age</label>
            <input value={age} onChange={(e) => setAge(e.target.value)}></input>
            <label>Date of birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            ></input>
            <label>Social status</label>
            <input
              list="socialStatus"
              value={socialStatus}
              onChange={(e) => setSocialStatus(e.target.value)}
            />
            <datalist id="socialStatus">
              <option value="Single" />
              <option value="in Relationship" />
              <option value="Engaged" />
              <option value="Married" />
              <option value="Widow" />
              <option value="Widower" />
            </datalist>

            <label>Phone number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>

            <label>Profile photo</label>
            <input
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            ></input>
            <label>Hometown</label>
            <input
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
            ></input>
          </div>
          <div className="edit-profile-item2">
            <h2 className="header-edit-profile-item2">Hobby</h2>

            <label>Interests</label>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            ></input>

            <label>Hobbys</label>
            <input
              value={hobbys}
              onChange={(e) => setHobbys(e.target.value)}
            ></input>

            <label>School</label>
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            ></input>

            <label>Profession</label>
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            ></input>
          </div>
          <div className="edit-profile-item3">
            <h2 className="header-edit-profile-item3">About</h2>

            <label>About you</label>
            <textarea
              className="about-edit-post"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button className="bttn-create-profile">Edit</button>
          {errors}
        </form>
      </div>
    </body>
  );
};

export default CreateProfile;
