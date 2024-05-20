// src/components/AdminOverview.js
import React from "react";
import { Card, Col, Row, Statistic } from "antd";

const AdminOverview = () => {
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              valueStyle={{ color: '#3f8600' }}
              suffix="Users"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={93}
              valueStyle={{ color: '#3f8600' }}
              suffix="Items"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Pending Messages"
              value={27}
              valueStyle={{ color: '#cf1322' }}
              suffix="Messages"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminOverview;
