const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f4f4f4",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
};

const infoStyle = {
  margin: "10px",
  fontSize: "18px",
};

const imageStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
};

const UserOptions = ({ user }) => {
  return (
    <div style={containerStyle}>
      <div style={infoStyle}>
        <b>Name:</b> {user.name}
      </div>
      <div style={infoStyle}>
        <b>Email:</b> {user.email}
      </div>
      <div style={infoStyle}>
        <b>Role:</b> {user.role}
      </div>
      <div style={infoStyle}>
        <img style={imageStyle} src={user.avatar.url} alt="profile-pic" />
      </div>
    </div>
  );
};

export default UserOptions;
