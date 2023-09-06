import "../../styles/error/notFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-text">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
