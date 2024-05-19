// import React from "react";
// import { Layout } from "antd";
// import {
//   FacebookFilled,
//   TwitterCircleFilled,
//   YoutubeFilled,
//   InstagramOutlined,
// } from "@ant-design/icons";

// const { Footer } = Layout;
// const shippingImages = [
//   "https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=5125",
//   "https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=5125",
//   "https://www.dhl.com/content/dam/dhl/global/core/images/logos/glo-footer-logo.svg",
// ];
// const paymentImages = [
//   "https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5125",
//   "https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5125",
//   "https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5125",
//   "https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5125",
// ];

// const AppFooter = () => (
//   <>
//     <style>
//       {`
//         .footer-link {
//           color: black;
//           text-decoration: none;
//         }
//         .footer-link:hover {
//           color: rgb(24, 144, 255);
//         }
//         li {
//           padding-bottom: 8px; 
//         }
//         li:last-child {
//           margin-bottom: 0;
//         }
//         h4 {
//           margin-bottom: 15px; 
//         }
//         a {
//   color: black;
// }
//       `}
//     </style>
//     <Footer style={{ background: "#f0f2f5", padding: "40px 50px" }}>
//       <div
//         className="footer-grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(5, 1fr)",
//           gap: "30px",
//           alignItems: "start",
//         }}
//       >
//         <div style={{ textAlign: "left" }}>
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>VỀ GEAR SHOP</h4>
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <li>
//               <a href="#" className="footer-link">
//                 Giới thiệu
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Tuyển dụng
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div style={{ textAlign: "left" }}>
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>CHÍNH SÁCH</h4>
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <li>
//               <a href="#" className="footer-link">
//                 Chính sách bảo hành
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Chính sách thanh toán
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Chính sách giao hàng
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Chính sách bảo mật
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div style={{ textAlign: "left" }}>
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>THÔNG TIN</h4>
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <li>
//               <a href="#" className="footer-link">
//                 Hệ thống cửa hàng
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Hướng dẫn mua hàng
//               </a>
//             </li>
//             <li>
//               <a href="#" className="footer-link">
//                 Tra cứu địa chỉ bảo hành
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div style={{ textAlign: "left" }}>
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
//           <p>Mua hàng: .........</p>
//           <p>Bảo hành: .........</p>
//           <p>Email: cskh@.....com</p>
//         </div>
//         <div style={{ textAlign: "left" }}>
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>ĐƠN VỊ VẬN CHUYỂN</h4>
//           {shippingImages.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt="Shippings Methods"
//               style={{ maxWidth: "25%", margin: "5px" }}
//             />
//           ))}
//           <h4 style={{ color: "rgb(24, 144, 255)" }}>CÁCH THỨC THANH TOÁN</h4>
//           {paymentImages.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt="Payment Methods"
//               style={{ maxWidth: "20%", margin: "auto" }}
//             />
//           ))}
//         </div>
//       </div>
//       <hr
//         style={{
//           border: "none",
//           height: "1px",
//           backgroundColor: "#ddd",
//           marginBottom: "20px",
//         }}
//       />
//       <div style={{ textAlign: "center", marginTop: "40px" }}>
//         <h4 style={{ color: "rgb(24, 144, 255)" }}>KẾT NỐI VỚI CHÚNG TÔI</h4>
//         <div>
//           <a href="#" target="_blank" rel="noopener noreferrer">
//             <FacebookFilled style={{ fontSize: "24px", margin: "0 10px" }} />
//           </a>
//           <a href="#" target="_blank" rel="noopener noreferrer">
//             <TwitterCircleFilled
//               style={{ fontSize: "24px", margin: "0 10px" }}
//             />
//           </a>
//           <a href="#" target="_blank" rel="noopener noreferrer">
//             <YoutubeFilled style={{ fontSize: "24px", margin: "0 10px" }} />
//           </a>
//           <a href="#" target="_blank" rel="noopener noreferrer">
//             <InstagramOutlined
//               style={{ fontSize: "24px", margin: "0 10px, color: black" }}
//             />
//           </a>
//         </div>
//       </div>
//     </Footer>
//   </>
// );

// export default AppFooter;

// import React from "react";
// import { Layout } from "antd";
// import {
//   FacebookFilled,
//   TwitterCircleFilled,
//   YoutubeFilled,
//   InstagramOutlined,
//   PhoneOutlined,
//   MailOutlined,
// } from "@ant-design/icons";

// const { Footer } = Layout;

// const AppFooter = () => (
//   <>
//     <style>
//       {`
//         .footer-container {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: space-between;
//           background-color: #505050; // Dark background
//           padding: 20px 50px;
//           font-size: 14px;
//           color: #fff; // Light text color for contrast
//         }
//         .footer-section {
//           display: flex;
//           flex-direction: column;
//           margin: 10px;
//           min-width: 200px;
//         }
//         .footer-title {
//           color: rgb(24, 144, 255); // Blue color for titles
//           font-size: 16px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
//         .footer-link {
//           color: #fff; // Light text color for readability
//           text-decoration: none;
//           line-height: 1.6;
//         }
//         .footer-link:hover {
//           color: rgb(24, 144, 255); // Blue on hover
//         }
//         .icon-group {
//           display: flex;
//           align-items: center;
//           margin: 5px 0;
//         }
//         .icon {
//           margin-right: 8px;
//           color: rgb(24, 144, 255); // Blue color for icons
//         }
//         .social{}
//         .social-icons {
//           display: flex;
//           flex-direction: row;
//           align-items: center;
//           justify-content: center;
//         }
//         .social-icons a {
//           margin-right: 10px; // Space between icons
//         }
//       `}
//     </style>
//     <Footer className="footer-container">
//       <div className="footer-section">
//         <h4 className="footer-title">GEAR SHOP</h4>
//         <p>Chuyên cung cấp Laptop Gaming & PC cao cấp chính hãng.</p>
//         <div className="icon-group">
//           <PhoneOutlined className="icon" />
//           <span>HCM: 098 467 5474</span>
//         </div>
//         <div className="icon-group">
//           <MailOutlined className="icon" />
//           <span>gearshop@gmail.com</span>
//         </div>
//       </div>
//       <div className="footer-section">
//         <h4 className="footer-title">CHÍNH SÁCH</h4>
//         <a href="#" className="footer-link">Tìm kiếm</a>
//         <a href="#" className="footer-link">Liên hệ</a>
//         <a href="#" className="footer-link">Trung tâm bảo hành</a>
//       </div>
//       <div className="footer-section">
//         <h4 className="footer-title">HƯỚNG DẪN</h4>
//         <a href="#" className="footer-link">Hướng dẫn thanh toán</a>
//         <a href="#" className="footer-link">Hướng dẫn trả góp</a>
//         <a href="#" className="footer-link">Tra cứu bảo hành</a>
//       </div>
//       <div className="footer-section">
//         <h4 className="footer-title">TỔNG ĐÀI HỖ TRỢ</h4>
//         <p>Hotline: 028 7108 1881</p>
//       </div>
//       <div className="footer-section ">
//         <h4 className="footer-title">KẾT NỐI VỚI CHÚNG TÔI</h4>
//         <div className="social-icons">
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <FacebookFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
//         </a>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <TwitterCircleFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
//         </a>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <YoutubeFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
//         </a>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           <InstagramOutlined style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
//         </a>
//         </div>
//       </div>
//     </Footer>
//   </>
// );

// export default AppFooter;

import React from "react";
import { Layout } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  RightOutlined,  
} from "@ant-design/icons";

const { Footer } = Layout;

const paymentImages = [
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5125",
];

const AppFooter = () => (
  <>
    <style>
      {`
        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          background-color: #505050; 
          padding: 20px 50px;
          font-size: 14px;
          color: #fff; 
          margin-top: 20px
        }
        .footer-section {
          display: flex;
          flex-direction: column;
          margin: 10px;
          min-width: 200px;
        }
        .footer-title {
          color: rgb(24, 144, 255); 
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .footer-link {
          color: #fff; 
          text-decoration: none;
          line-height: 1.6;
          display: flex;
          align-items: center;
        }
        .footer-link:hover {
          color: rgb(24, 144, 255); 
        }
        .icon-group {
          display: flex;
          align-items: center;
          margin: 5px 0;
        }
        .icon {
          margin-right: 8px;
          color: rgb(24, 144, 255); 
        }
        .social-icons {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .social-icons a {
          margin-right: 10px; 
        }
        .arrow-icon {
          margin-left: 5px; 
        }
      `}
    </style>
    <Footer className="footer-container">
      <div className="footer-section">
        <h4 className="footer-title">GEAR SHOP</h4>
        <p>Chuyên cung cấp Laptop Gaming & PC cao cấp chính hãng.</p>
        <div className="icon-group">
          <PhoneOutlined className="icon" />
          <span>HCM: 098 467 5474</span>
        </div>
        <div className="icon-group">
          <MailOutlined className="icon" />
          <span>gearshop@gmail.com</span>
        </div>
      </div>
      <div className="footer-section">
        <h4 className="footer-title">CHÍNH SÁCH</h4>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}} />Tìm kiếm</a>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}}/>Liên hệ</a>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}}/>Trung tâm bảo hành</a>
      </div>
      <div className="footer-section">
        <h4 className="footer-title">HƯỚNG DẪN</h4>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}}/>Hướng dẫn thanh toán</a>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}}/>Hướng dẫn trả góp</a>
        <a href="#" className="footer-link"><RightOutlined className="arrow-icon" style={{marginRight: '4px'}}/>Tra cứu bảo hành</a>
      </div>

      <div className="footer-section ">
        <h4 className="footer-title">PHƯƠNG THỨC THANH TOÁN</h4>
        <div>{paymentImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Payment Methods"
              style={{ width: '50px', margin: "0 4px" }}
            />
          ))}
        </div>
      </div>
      <div className="footer-section ">
        <h4 className="footer-title">KẾT NỐI VỚI CHÚNG TÔI</h4>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FacebookFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <TwitterCircleFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YoutubeFilled style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ color: 'rgb(24, 144, 255)', fontSize: "24px" }} />
          </a>
        </div>
        
      </div>
    </Footer>
  </>
);

export default AppFooter;







