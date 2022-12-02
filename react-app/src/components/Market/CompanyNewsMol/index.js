import React, { useEffect, useState } from 'react';

import "./CompanyNewsMol.css"

async function fetchCompanyNews(symbol) {
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate() - 1);
  todayDate = todayDate.toISOString().split('T')[0];
  const response = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${todayDate}&to=${todayDate}&token=ce514fqad3i685aus8h0ce514fqad3i685aus8hg`);
  return response.json();
}

const CompanyNewsMol = ({ symbol }) => {
  const [allNews, setAllNews] = useState();

  useEffect(() => {
    const getComapanyNews = async () => {
      try {
        const companynews = await fetchCompanyNews(symbol);
        // console.log('=====================', companynews)
        setAllNews(companynews);
      } catch {
        setAllNews([]);
      }
    };

    getComapanyNews();
  }, [symbol]);

  return (
    <>
    <div className='Company-News-top-title'>News</div>
      {allNews?.slice(0,6).map((news) => (
        <a href={news.url} target="_blank">
          <div className="company-news-container">

            <div className="company-news-right">
              <div className="news-title">From {news.source} News</div>
              <div className="news-headline">{news.headline}</div>
            </div>

            <div className="company-news-left">
              {news.image && <img className='company-news-image' src={news.image} alt="Picture Unavailable" />}
            </div >

          </div>
        </a>
      ))}
        <div className='space'></div>
    </>
  );
};

export default CompanyNewsMol;
