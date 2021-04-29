import buildClient from "../api/buildClient";
import Header from "../components/header";
import "../styles/signup-styles.scss";
import "../styles/navbar-styles.scss";
import "../styles/use-request-styles.scss";
import "../styles/welcome-styles.scss";
import "../styles/createpost-styles.scss";
import "../styles/home-styles.scss";
import "../styles/post-styles.scss";
import "../styles/editpost-styles.scss";
import "../styles/comments-styles.scss";
import "../styles/profile-styles.scss";
import "../styles/editProfile-styles.scss";
import "../styles/postList-styles.scss";
import "../styles/groups-list-styles.scss";
import "../styles/groups-styles.scss";
import "../styles/overview-styles.scss";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      ></meta>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
