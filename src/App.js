import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import Detail1 from './components/Detail1';
import enquire from 'enquire.js';
import './css/home.css';
class App extends Component {
    render() {
        enquire.register("screen and (min-width:768px)", ()=> {
            // Load sidebar content in via AJAX.
            // Show sidebar
            window.notMobile =this.notMobile= true;
        });
        return (
            <Row className='container'>
                <Col className='contain' span={24}>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/a/:cityID' component={window.notMobile?Detail:Detail1}/>
                    </Switch>
                </Col>

            </Row>
        );
    }
}

export default App;
