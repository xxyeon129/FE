import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PortfolioDetailsEdit() {
  return (
    <>
      <img src="" alt="" />
      <div>
        <label htmlFor="portfolioTitle">제목:</label>
        <input type="text" id="portfolioTitle" />
      </div>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="residence">거주지:</label>
        <input type="text" id="residence" />
      </div>
      <div>
        <label htmlFor="location">희망:</label>
        <input type="text" id="location" />
      </div>
      <div>
        <label htmlFor="email">이메일:</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="number">번호:</label>
        <input type="text" id="number" />
      </div>
    </>
  );
}

export default PortfolioDetailsEdit;
