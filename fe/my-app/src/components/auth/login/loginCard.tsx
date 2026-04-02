import React from "react";
import { CameraOutlined } from "@ant-design/icons";
import styles from "./loginCard.module.css";

function LoginCard() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoBox}>
          <div className={styles.logoIcon}>
            <CameraOutlined style={{ fontSize: 24 }} />
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            SavySnap
          </span>
        </div>
        <h2 className={styles.leftTitle}>
          Tiết kiệm thông minh qua từng khung hình.
        </h2>
        <p className={styles.leftSubtitle}>
          Bắt đầu hành trình quản lý tài chính trực quan ngay hôm nay.
        </p>
      </div>

      <div className={styles.trustGroup}>
        <div>
          {[1, 2, 3].map((i) => (
            <span key={i} className={styles.avatar}></span>
          ))}
        </div>
        <span>Hơn 10,000 người đã tin dùng</span>
      </div>

      <div className={styles.shapeTopRight}></div>
      <div className={styles.shapeBottomLeft}></div>
    </div>
  );
}

export default LoginCard;
