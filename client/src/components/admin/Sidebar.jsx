import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { useSelector } from "react-redux";
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  ExpandMore as ExpandMoreIcon,
  ImportExport as ImportExportIcon,
  ListAlt as ListAltIcon,
  People as PeopleIcon,
  PostAdd as PostAddIcon,
  RateReview as RateReviewIcon,
} from "@material-ui/icons";

import "../../styles/admin/sidebar.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <Link to="/account">
        <img src={user.avatar.url} alt="Dinner Dash" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Restaurants">
            <Link to="/admin/restaurants">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/restaurant">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/categories">
        <p>
          <ListAltIcon /> Categories
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
