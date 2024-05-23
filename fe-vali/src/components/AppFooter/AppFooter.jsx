
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
          background-color: #00A86B; 
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
          color: #000; 
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
          color: #000; 
        }
        .icon-group {
          display: flex;
          align-items: center;
          margin: 5px 0;
        }
        .icon {
          margin-right: 8px;
          color: #fff; 
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
        <h4 className="footer-title">LugKy Shop</h4>
        <p>Chuyên cung cấp Vali cao cấp & Chính hãng</p>
        <div className="icon-group">
          <PhoneOutlined className="icon" />
          <span>HCM: 098 467 5474</span>
        </div>
        <div className="icon-group">
          <MailOutlined className="icon" />
          <span>lugKyshop@gmail.com</span>
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
            <FacebookFilled style={{ color: '#000', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <TwitterCircleFilled style={{ color: '#000', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YoutubeFilled style={{ color: '#000', fontSize: "24px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ color: '#000', fontSize: "24px" }} />
          </a>
        </div>
        
      </div>
    </Footer>
  </>
);

export default AppFooter;







