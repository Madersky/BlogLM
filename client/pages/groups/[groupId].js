import CreatePost from "../../components/createPost";
import PostsList from "../../components/postsList";
const GroupPage = ({ currentUser, group, posts, comments, groupId }) => {
  return (
    <div className="group-content">
      <div className="group-item1">
        <h1 className="group-name">{group[0].name} </h1>
      </div>
      <div className="group-item2">
        <CreatePost currentUser={currentUser} groupId={groupId} />
        <PostsList
          currentUser={currentUser}
          posts={posts}
          comments={comments}
        />
      </div>
      <div className="group-item3"> item 3</div>
      {/* <div className="group-item4">
        <h2 className="group-members">
          {" "}
          Group members: maciej 
        </h2>
      </div> */}
    </div>
  );
};

GroupPage.getInitialProps = async (context, client, currentUser) => {
  const urls = [
    // `api/profiles/id/${context.query.groupId}`,
    `api/posts/group-posts/${context.query.groupId}`,
    `api/comments`,
    `api/groups`,
  ];
  const [postsRes, commentsRes, groupsRes] = await Promise.all(
    urls.map((url) => client.get(url))
  );

  console.log(context.query);
  return {
    // ...profileRes.data,
    ...postsRes.data,
    ...commentsRes.data,
    ...groupsRes.data,
    ...context.query,
  };
};

export default GroupPage;
