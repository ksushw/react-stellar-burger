import styles from "./orderPage.module.css";
import FeedDetails from "../../components/FeedDetails/feed-details";
import { useLocation, useNavigate } from "react-router-dom";
import { CLOSE_INFO_POPUP } from "../../services/actions/infoPopup";
import Modal from "../../components/Modal/modal";
import { useDispatch } from "react-redux";

export default function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const popup = location.state?.popup;
  console.log(popup);
  return (
    <>
      {popup ? (
        <Modal
          visible={true}
          setVisible={() => {
            navigate(-1);
          }}
        >
          <FeedDetails />
        </Modal>
      ) : (
        <div className={styles.page + " pt-30"}>
          <FeedDetails />
        </div>
      )}
    </>
  );
}
