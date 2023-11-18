import styles from "./orderPage.module.css";
import FeedDetails from "../../components/FeedDetails/feed-details";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/modal";

export default function OrderPage({ orders }) {
  const navigate = useNavigate();
  const location = useLocation();
  const popup = location.state?.popup;
  // console.log(orders);
  return (
    <>
      {popup ? (
        <Modal
          visible={true}
          setVisible={() => {
            navigate(-1);
          }}
        >
          <FeedDetails orders={orders} />
        </Modal>
      ) : (
        <div className={styles.page + " pt-30"}>
          <FeedDetails orders={orders} />
        </div>
      )}
    </>
  );
}
