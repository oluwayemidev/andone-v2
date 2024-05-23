import React from 'react';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import './intro.css';

const Intro = () => {
    const buttons = [
        {
            id: 1,
            title: 'Explore Products',
            link: '/products',
            des: 'Our solar panels are designed for maximum efficiency and durability, while our inverters ensure seamless energy conversion.'
        },
        {
            id: 2,
            title: 'Learn More About Us',
            link: '/about',
            des: 'We specialize in high-quality solar panels and accessories.'
        },
        {
            id: 3,
            title: 'Contact Support',
            link: '/contact',
            des: 'If you have any technical questions or need assistance with installation, our support team is here to help. Feel free to ask!'
        },
    ];

    return (
        <div className="intro">
            {buttons.map(button => (
                <Tooltip key={button.id} title={button.des}>
                    <Link to={button.link}>
                        <Button type="primary" style={{ margin: '10px' }}>
                            {button.title}
                        </Button>
                    </Link>
                </Tooltip>
            ))}
        </div>
    );
};

export default Intro;
