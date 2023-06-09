import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';

function LinkPreview() {
  // const [linkData, setLinkData] = useState(null);

  // console.log('linkData : ', linkData);

  // useEffect(() => {
  //   const fetchLinkData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://hanghae99.spartacodingclub.kr/?utm_source=google&utm_medium=bs&utm_campaign=%ED%95%AD%ED%95%B4&utm_content=%ED%95%AD%ED%95%B4_%EB%B8%8C%EB%9E%9C%EB%93%9C&utm_term=%ED%95%AD%ED%95%B499&gcl_keyword=%ED%95%AD%ED%95%B499&gcl_network=g&gclid=CjwKCAjwg-GjBhBnEiwAMUvNW2qlx_VHbqM5WraHeG2kHJSCsYZ7NE_P2m6VgB9wDx61n39sA3xfdBoCMKgQAvD_BwE'
  //       );
  //       const html = response.data;

  //       console.log('html : ', html);

  //       // HTML 파싱
  //       const $ = cheerio.load(html);

  //       // OG 태그 검색 및 정보 추출
  //       const ogTags = $('meta[property^="og:"]');

  //       // 필요한 OG 태그 가져오기
  //       const data = {};
  //       ogTags.each((_, element) => {
  //         const property = $(element).attr('property');
  //         const content = $(element).attr('content');
  //         if (property && content) {
  //           data[property] = content;
  //         }
  //       });

  //       setLinkData(data);
  //     } catch (error) {
  //       console.error('Error fetching link data:', error);
  //     }
  //   };

  //   fetchLinkData();
  // }, []);

  // if (!linkData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      {/* <h1>{linkData['og:title']}</h1>
      <p>{linkData['og:description']}</p>
      <img src={linkData['og:image']} alt="Thumbnail" /> */}
    </div>
  );
}

export default LinkPreview;
