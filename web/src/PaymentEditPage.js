// Copyright 2022 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Button, Card, Col, Input, Row, Select, Switch} from 'antd';
import * as PaymentBackend from "./backend/PaymentBackend";
import * as OrganizationBackend from "./backend/OrganizationBackend";
import * as UserBackend from "./backend/UserBackend";
import * as Setting from "./Setting";
import i18next from "i18next";
import * as RoleBackend from "./backend/RoleBackend";

const { Option } = Select;

class PaymentEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      organizationName: props.organizationName !== undefined ? props.organizationName : props.match.params.organizationName,
      paymentName: props.match.params.paymentName,
      payment: null,
    };
  }

  UNSAFE_componentWillMount() {
    this.getPayment();
  }

  getPayment() {
    PaymentBackend.getPayment("admin", this.state.paymentName)
      .then((payment) => {
        this.setState({
          payment: payment,
        });
      });
  }

  parsePaymentField(key, value) {
    if ([""].includes(key)) {
      value = Setting.myParseInt(value);
    }
    return value;
  }

  updatePaymentField(key, value) {
    value = this.parsePaymentField(key, value);

    let payment = this.state.payment;
    payment[key] = value;
    this.setState({
      payment: payment,
    });
  }

  renderPayment() {
    return (
      <Card size="small" title={
        <div>
          {i18next.t("payment:Edit Payment")}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={() => this.submitPaymentEdit(false)}>{i18next.t("general:Save")}</Button>
          <Button style={{marginLeft: '20px'}} type="primary" onClick={() => this.submitPaymentEdit(true)}>{i18next.t("general:Save & Exit")}</Button>
        </div>
      } style={(Setting.isMobile())? {margin: '5px'}:{}} type="inner">
        <Row style={{marginTop: '10px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("general:Organization"), i18next.t("general:Organization - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.organization} onChange={e => {
              // this.updatePaymentField('organization', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("general:Name"), i18next.t("general:Name - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.name} onChange={e => {
              // this.updatePaymentField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("general:Display name"), i18next.t("general:Display name - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.displayName} onChange={e => {
              this.updatePaymentField('displayName', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("general:Name"), i18next.t("general:Name - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.name} onChange={e => {
              // this.updatePaymentField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("general:Provider"), i18next.t("general:Provider - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.provider} onChange={e => {
              // this.updatePaymentField('provider', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("provider:Type"), i18next.t("provider:Type - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.type} onChange={e => {
              // this.updatePaymentField('type', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("payment:Good"), i18next.t("payment:Good - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.good} onChange={e => {
              // this.updatePaymentField('good', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("payment:Amount"), i18next.t("payment:Amount - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.amount} onChange={e => {
              // this.updatePaymentField('amount', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={(Setting.isMobile()) ? 22 : 2}>
            {Setting.getLabel(i18next.t("payment:Currency"), i18next.t("payment:Currency - Tooltip"))} :
          </Col>
          <Col span={22} >
            <Input value={this.state.payment.currency} onChange={e => {
              // this.updatePaymentField('currency', e.target.value);
            }} />
          </Col>
        </Row>
      </Card>
    )
  }

  submitPaymentEdit(willExist) {
    let payment = Setting.deepCopy(this.state.payment);
    PaymentBackend.updatePayment(this.state.organizationName, this.state.paymentName, payment)
      .then((res) => {
        if (res.msg === "") {
          Setting.showMessage("success", `Successfully saved`);
          this.setState({
            paymentName: this.state.payment.name,
          });

          if (willExist) {
            this.props.history.push(`/payments`);
          } else {
            this.props.history.push(`/payments/${this.state.payment.name}`);
          }
        } else {
          Setting.showMessage("error", res.msg);
          this.updatePaymentField('name', this.state.paymentName);
        }
      })
      .catch(error => {
        Setting.showMessage("error", `Failed to connect to server: ${error}`);
      });
  }

  render() {
    return (
      <div>
        {
          this.state.payment !== null ? this.renderPayment() : null
        }
        <div style={{marginTop: '20px', marginLeft: '40px'}}>
          <Button size="large" onClick={() => this.submitPaymentEdit(false)}>{i18next.t("general:Save")}</Button>
          <Button style={{marginLeft: '20px'}} type="primary" size="large" onClick={() => this.submitPaymentEdit(true)}>{i18next.t("general:Save & Exit")}</Button>
        </div>
      </div>
    );
  }
}

export default PaymentEditPage;
