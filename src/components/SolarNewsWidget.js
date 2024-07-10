import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Button, Spin } from 'antd';

const GDELT_API_URL = 'https://api.gdeltproject.org/api/v2/doc/doc?query=solar&mode=ArtList&format=json';

const SolarNewsWidget = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(GDELT_API_URL);
                const articles = response.data.articles || [];
                setNews(articles);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <Spin />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Solar News</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={news}
                    renderItem={(article) => (
                        <List.Item
                            key={article.url}
                            actions={[
                                <Button type="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read More
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>}
                                description={article.summary}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default SolarNewsWidget;





// import React, { useState, useEffect } from 'react';
// import { Card, List, Spin, Alert, Button } from 'antd';
// import axios from 'axios';

// const SolarNewsWidget = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleItems, setVisibleItems] = useState(5); // Show 3 items initially

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get('https://newsapi.org/v2/everything', {
//           params: {
//             q: 'solar energy', // query for solar energy news
//             apiKey: 'f3952991078f43789625b4edcbabf6a2',
//           },
//         });
//         setNews(response.data.articles);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   const loadMore = () => {
//     setVisibleItems((prev) => prev + 3); // Load 3 more items each time
//   };

//   if (loading) {
//     return <Spin tip="Loading news..." />;
//   }

//   if (error) {
//     return <Alert message="Error" description="Failed to fetch news." type="error" showIcon />;
//   }

//   return (
//     <Card title="Latest Solar News" bordered={false} style={{ width: '100%' }}>
//       <List
//         itemLayout="vertical"
//         dataSource={news.slice(0, visibleItems)}
//         renderItem={item => (
//           <List.Item key={item.url}>
//             <List.Item.Meta
//               title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
//               description={item.description}
//             />
//           </List.Item>
//         )}
//       />
//       {visibleItems < news.length && (
//         <div style={{ textAlign: 'center', marginTop: 16 }}>
//           <Button onClick={loadMore}>Load More</Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default SolarNewsWidget;
