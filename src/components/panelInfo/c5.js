import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Chart,Legend,Axis,Tooltip,Geom,DataSet} from 'bizcharts';
import { Table } from 'antd';
class C5 extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let hasContent = false;
        for(let s in this.props.cityLifeIndex){
            if(s){
                hasContent = true;
            }
        }
        if(hasContent){
            var arr = [];
            for(let s in this.props.cityLifeIndex){
                arr.push(this.props.cityLifeIndex[s])
            }
            var lifeArr = arr[0];
            var columns = [{
                title: '',
                dataIndex: 'name'
            }, {
                title: '',
                dataIndex: 'status'
            }, {
                title: '',
                dataIndex: 'desc'
            }];
            var data = lifeArr.map((item,index)=>{
                item.key=index;
                return item;
            });
        }
        //@TODO: hover效果没去
        return(
            <Table style={{marginTop: '10px',fontSize: window.notMobile?'20px':'12px!important'}} columns={columns} pagination={{defaultCurrent:1, total:lifeArr.length,defaultPageSize:window.notMobile?4:2}}  dataSource={data} size="small" />
        );
    }
}
export default connect(({cityLifeIndex})=>{
    return {
        cityLifeIndex
    }
})(C5);